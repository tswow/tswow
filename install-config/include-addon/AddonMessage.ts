import { BinReader } from "./BinReader"

export enum TSFragmentHeader {
    MAGIC = 0,
    MESSAGE_ID = 2,
    CHANNEL = 3,
    FRAGMENT_ID = 4,
    TOTAL_FRAGMENTS = 6,
    END = 8,
}

const MESSAGE_MAGIC = 17688;
const ENCODED_HEADER_SIZE = Math.ceil(TSFragmentHeader.END/3)*4;

export class BufferedMessage {
   fragmentCtr = 0; 
   messageId = 0;
   channel: number;
   fragments: string[] = []

   constructor(channel: number, totalFragments: number) {
       this.channel = channel;
       this.fragmentCtr = totalFragments;
       for(let i=0;i<totalFragments;++i) {
           this.fragments.push("");
       }
   }

   receiveFragment(fragmentId: number, fragment: string) {
       if(fragmentId<0||fragmentId>=this.fragments.length) {
           return "OUT_OF_BOUNDS";
       }

       if(this.fragments[fragmentId].length != 0) {
           return "DUPLICATE_FRAGMENT";
       }

       this.fragments[fragmentId] = fragment;
       --this.fragmentCtr;
       return this.fragmentCtr == 0 ? 'FINISHED' : 'SUCCESS';
   }

   build() {
       return this.fragments.join('')
   }
}

export class MessageBuffer {
    messages: {[key: number]: BufferedMessage} = {}
    maxFragmentSize: number;
    messageId: number = 0;
    incomingPrefixLength: number = 0;

    constructor(maxFragmentSize: number, incomingPrefixLength: number) {
        this.maxFragmentSize = 
              // largest decoded message that fits in an encoded chunk this large
              Math.floor(3*((maxFragmentSize)/4)) - 2
              // these bytes are not usable for the message
            - ENCODED_HEADER_SIZE
            - incomingPrefixLength
        if(this.maxFragmentSize<1) {
            throw new Error(`Too small maximum: can't fit a single character!`)
        }
        this.incomingPrefixLength = incomingPrefixLength;
    }

    receiveFragment(fragment: string) {
        if(fragment.length < ENCODED_HEADER_SIZE) {
            // it's too short to be a message
            return;
        }

        fragment = fragment.substring(this.incomingPrefixLength);

        let str = base64_decode(fragment);
        if(str.length < TSFragmentHeader.END) {
            return;
        }
        let reader = new BinReader(str);
        if(reader.ReadU16(TSFragmentHeader.MAGIC) != MESSAGE_MAGIC) {
            // not a message in this channel
            return;
        }

        let messageId = reader.ReadU8(TSFragmentHeader.MESSAGE_ID);
        let channelId = reader.ReadU8(TSFragmentHeader.CHANNEL);
        let fragmentId = reader.ReadU16(TSFragmentHeader.FRAGMENT_ID);
        let totalFragments = reader.ReadU16(TSFragmentHeader.TOTAL_FRAGMENTS);

        if(!this.messages[messageId]) {
            this.messages[messageId] = new BufferedMessage(channelId,totalFragments);
        }

        let msg = this.messages[messageId];

        if(msg.receiveFragment(fragmentId,str.substring(TSFragmentHeader.END)) == 'FINISHED'){
            this.onFinished(msg.channel, msg.build());
            this.messages[messageId] = undefined;
        }
    }

    private handlers: ((channel: number, message: string)=>void)[] = []

    RegisterListener(handler: (channel: number,message: string)=>void) {
        this.handlers.push(handler);
    }

    sendFragment(str: string): void
    {
        SendAddonMessage('',str,'WHISPER',GetUnitName('player',false));
    }

    onFinished(channel: number, str: string): void {
        this.handlers.forEach(x=>x(channel, str));
    }

    sendMessage(channel: number, message: string) {
        let fragCount = Math.ceil(message.length/this.maxFragmentSize);
        let messageId = (this.messageId++)%255;
        let offset = 0;

        for(let i=0;i<fragCount;++i) {
            let fragmentSize = Math.min(this.maxFragmentSize,message.length-offset);
            let bin = new BinReader(TSFragmentHeader.END);
            bin.WriteU16(TSFragmentHeader.MAGIC,MESSAGE_MAGIC);
            bin.WriteU8(TSFragmentHeader.CHANNEL,channel);
            bin.WriteU8(TSFragmentHeader.MESSAGE_ID,messageId);
            bin.WriteU16(TSFragmentHeader.FRAGMENT_ID,i)
            bin.WriteU16(TSFragmentHeader.TOTAL_FRAGMENTS,fragCount);
            let msgFragment = bin.str+message.substring(offset,offset+fragmentSize);
            this.sendFragment(base64_encode(msgFragment))
            offset+=fragmentSize;
        }
    }
}

export const Messages = new MessageBuffer(250,0);

function buildMessage(value: any) {
    let bin = new BinReader(value.GetSize()+6);
    bin.WriteU32(0,1007688);
    bin.WriteU16(4,value.GetID());
    value.Write(bin,6);
    return base64_encode(bin.str)
}

export function SendCompiledServerMessage(message: any) {
    SendAddonMessage('',buildMessage(message),'WHISPER',GetUnitName('player',false)); 
}

export function SendLongServerMessage(channel: number, message: string) {
    Messages.sendMessage(channel, message);
}
import { Gossip } from "./Gossip";
import { GossipOption } from "./GossipOption";

const gossipLabels : {[key: string] : Gossip<any,any,any>} = {}

function makeLabel(mod: string, label: string) {
    return `${mod}:${label}`;
}

export function addGossipLabel(mod: string, label: string, gossip: Gossip<any,any,any>) {
    gossipLabels[makeLabel(mod,label)] = gossip;
}

export function getGossipLabel(mod: string, label: string) {
    return gossipLabels[makeLabel(mod,label)];
}
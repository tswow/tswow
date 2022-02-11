import { Gossip } from "./Gossip";

const gossipLabels : {[key: string] : Gossip} = {}

function makeLabel(mod: string, label: string) {
    return `${mod}:${label}`;
}

export function addGossipLabel(mod: string, label: string, gossip: Gossip) {
    gossipLabels[makeLabel(mod,label)] = gossip;
}

export function getGossipLabel(mod: string, label: string) {
    return gossipLabels[makeLabel(mod,label)];
}
/*
 * This file is part of tswow (https://github.com/tswow)
 *
 * Copyright (C) 2020 tswow <https://github.com/tswow/>
 * This program is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */
import { MaskCell } from "wotlkdata/cell/systems/Mask";
import { CreatureTemplate } from "./CreatureTemplate";

export class NPCFlags extends MaskCell<CreatureTemplate> {
    get Gossip() { return this.bit(0); }
    get QuestGiver() { return this.bit(1); }
    get Trainer() { return this.bit(4); }
    get ClassTrainer() { return this.bit(5); }
    get ProfessionTrainer() { return this.bit(6); }
    get Vendor() { return this.bit(7); }
    get VendorAmmo() { return this.bit(8); }
    get VendorFood() { return this.bit(9); }
    get VendorPoison() { return this.bit(10); }
    get VendorReagent() { return this.bit(11); }
    get Repairer() { return this.bit(12); }
    get FlightMaster() { return this.bit(13); }
    get SpiritHealer() { return this.bit(14); }
    get SpiritGuide() { return this.bit(15); }
    get Innkeeper() { return this.bit(16); }
    get Banker() { return this.bit(17); }
    get Petitioner() { return this.bit(18); }
    get TabardDesigner() { return this.bit(19); }
    get Battlemaster() { return this.bit(20); }
    get Auctioneer() { return this.bit(21); }
    get StableMaster() { return this.bit(22); }
    get GuildBanker() { return this.bit(23); }
    get Spellclick() { return this.bit(24); }
    get Mailbox() { return this.bit(26); }
}
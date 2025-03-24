/*
 * Copyright (C) 2024 tswow <https://github.com/tswow/>
 * and Duskhaven <https://github.com/orgs/Duskhaven-Reforged>
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

/* tslint:disable */
import { float, int, uint } from '../../data/primitives'
import { Relation } from '../../data/query/Relations'
import { PrimaryKey } from '../../data/table/PrimaryKey'
import { DBCKeyCell, DBCUIntCell } from '../../data/dbc/DBCCell'
import { CDBCFile } from './CDBCFile'
import { DBCRow } from '../../data/dbc/DBCRow'

/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export class ZoneLightPointRow extends DBCRow<ZoneLightPointCreator,ZoneLightPointQuery> {
    /**
     * Primary Key
     *
     * Id
     */
    @PrimaryKey()
    get ID() { return new DBCKeyCell(this,this.buffer,this.offset+0) }

    /**
     * Map ID, from ZoneLight.cdbc
     */
    get ZoneLightID() { return new DBCUIntCell(this,this.buffer,this.offset+4) }

    /**
     * Position x, client coordinates
     */
    get PositionX() { return new DBCUIntCell(this,this.buffer,this.offset+8) }

    /**
     * Position y, client coordinates
     */
    get PositionY() { return new DBCUIntCell(this,this.buffer,this.offset+12) }

    /**
     * Order of vertex used to calculate shape
     */
    get PointOrder() { return new DBCUIntCell(this,this.buffer,this.offset+16) }

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : ZoneLightPointCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type ZoneLightPointCreator = {
    ZoneLightID?: uint
    PositionX?: float
    PositionY?: float
    PointOrder?: uint
}

/**
 * Used for queries (Don't comment these)
 */
export type ZoneLightPointQuery = {
    ID? : Relation<int>
    ZoneLightID? : Relation<uint>
    PositionX? : Relation<float>
    PositionY? : Relation<float>
    PointOrder? : Relation<uint>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class ZoneLightPointCDBCFile extends CDBCFile<
    ZoneLightPointCreator,
    ZoneLightPointQuery,
    ZoneLightPointRow> {
    protected defaultRow = [1, 1, 0.0, 0.0, 1];

    constructor() {
        super('ZoneLightPoint',(t,b,o)=> new ZoneLightPointRow(t,b,o))
    }
    /** Loads a new SpellAdditionalCostData.dbc from a file. */
    static read(path: string): ZoneLightPointCDBCFile {
        return new ZoneLightPointCDBCFile().read(path)
    }
    add(ID : int, c? : ZoneLightPointCreator) : ZoneLightPointRow {
        return this.makeRow(0).clone(ID,c)
    }
    findByID(id : number) {
        return this.fastSearch(id);
    }

    // Aleist3r: Duskhaven doesn't need Northrend
    /*override fileWork(): void {
        const defaultZoneLightPoints: Record<number, {ZoneLightID: number, PositionX: number, PositionY: number, PointOrder: number}> = {
            // Aleist3r: this is long but cba
            1: { ZoneLightID: 1, PositionX: 13797.4014, PositionY: 12850.792, PointOrder: 1 },
            2: { ZoneLightID: 1, PositionX: 12869.2627, PositionY: 12795.3809, PointOrder: 2 },
            3: { ZoneLightID: 1, PositionX: 12804.6162, PositionY: 12703.0293, PointOrder: 3 },
            4: { ZoneLightID: 1, PositionX: 12802.3076, PositionY: 12481.3838, PointOrder: 4 },
            5: { ZoneLightID: 1, PositionX: 12449.0605, PositionY: 12504.4717, PointOrder: 5 },
            6: { ZoneLightID: 1, PositionX: 12432.8994, PositionY: 12543.7217, PointOrder: 6 },
            7: { ZoneLightID: 1, PositionX: 12391.3408, PositionY: 12546.03, PointOrder: 7 },
            8: { ZoneLightID: 1, PositionX: 12356.709, PositionY: 12504.4717, PointOrder: 8 },
            9: { ZoneLightID: 1, PositionX: 12130.4463, PositionY: 12499.8545, PointOrder: 9 },
            10: { ZoneLightID: 1, PositionX: 12125.8291, PositionY: 12444.4434, PointOrder: 10 },
            11: { ZoneLightID: 1, PositionX: 11567.0986, PositionY: 12435.208, PointOrder: 11 },
            12: { ZoneLightID: 1, PositionX: 11387.0117, PositionY: 12338.2383, PointOrder: 12 },
            13: { ZoneLightID: 1, PositionX: 11109.9561, PositionY: 12338.2383, PointOrder: 13 },
            14: { ZoneLightID: 1, PositionX: 11054.5439, PositionY: 12384.4141, PointOrder: 14 },
            15: { ZoneLightID: 1, PositionX: 10578.9316, PositionY: 12393.6494, PointOrder: 15 },
            16: { ZoneLightID: 1, PositionX: 8076.189, PositionY: 10985.28, PointOrder: 16 },
            17: { ZoneLightID: 1, PositionX: 7475.901, PositionY: 14023.6631, PointOrder: 17 },
            18: { ZoneLightID: 1, PositionX: 8819.624, PositionY: 16240.1133, PointOrder: 18 },
            19: { ZoneLightID: 1, PositionX: 11617.8926, PositionY: 16932.7539, PointOrder: 19 },
            20: { ZoneLightID: 1, PositionX: 13793.8242, PositionY: 16109.5273, PointOrder: 20 },
            21: { ZoneLightID: 1, PositionX: 13824.11, PositionY: 14685.1348, PointOrder: 21 },
            22: { ZoneLightID: 1, PositionX: 13871.4229, PositionY: 13949.3857, PointOrder: 22 },
            23: { ZoneLightID: 1, PositionX: 13802.8848, PositionY: 13774.6016, PointOrder: 23 },
            24: { ZoneLightID: 1, PositionX: 13944.5869, PositionY: 13456.2764, PointOrder: 24 },
            25: { ZoneLightID: 1, PositionX: 13955.5537, PositionY: 13320.6338, PointOrder: 25 },
            26: { ZoneLightID: 1, PositionX: 13868.1982, PositionY: 13254.2793, PointOrder: 26 },
            27: { ZoneLightID: 1, PositionX: 13871.1426, PositionY: 12967.9814, PointOrder: 27 },
            28: { ZoneLightID: 2, PositionX: 18027.127, PositionY: 12232.0332, PointOrder: 1 },
            29: { ZoneLightID: 2, PositionX: 17500.7188, PositionY: 12218.1807, PointOrder: 2 },
            30: { ZoneLightID: 2, PositionX: 17286.002, PositionY: 12047.3291, PointOrder: 3 },
            31: { ZoneLightID: 2, PositionX: 16988.166, PositionY: 11876.4775, PointOrder: 4 },
            32: { ZoneLightID: 2, PositionX: 16607.2129, PositionY: 11858.0078, PointOrder: 5 },
            33: { ZoneLightID: 2, PositionX: 16526.4063, PositionY: 11991.918, PointOrder: 6 },
            34: { ZoneLightID: 2, PositionX: 16304.7607, PositionY: 11991.918, PointOrder: 7 },
            35: { ZoneLightID: 2, PositionX: 16133.9092, PositionY: 11920.3457, PointOrder: 8 },
            36: { ZoneLightID: 2, PositionX: 15986.1455, PositionY: 11701.0088, PointOrder: 9 },
            37: { ZoneLightID: 2, PositionX: 15900.72, PositionY: 11710.2441, PointOrder: 10 },
            38: { ZoneLightID: 2, PositionX: 15826.8379, PositionY: 11825.6846, PointOrder: 11 },
            39: { ZoneLightID: 2, PositionX: 15589.0322, PositionY: 11927.2715, PointOrder: 12 },
            40: { ZoneLightID: 2, PositionX: 15565.9434, PositionY: 12021.9326, PointOrder: 13 },
            41: { ZoneLightID: 2, PositionX: 15432.0332, PositionY: 12137.373, PointOrder: 14 },
            42: { ZoneLightID: 2, PositionX: 15415.8721, PositionY: 12234.3428, PointOrder: 15 },
            43: { ZoneLightID: 2, PositionX: 15277.3438, PositionY: 12234.3418, PointOrder: 16 },
            44: { ZoneLightID: 2, PositionX: 15270.417, PositionY: 12458.2959, PointOrder: 17 },
            45: { ZoneLightID: 2, PositionX: 15335.0635, PositionY: 12518.3252, PointOrder: 18 },
            46: { ZoneLightID: 2, PositionX: 15335.0635, PositionY: 12795.3809, PointOrder: 19 },
            47: { ZoneLightID: 2, PositionX: 15275.0342, PositionY: 12860.0273, PointOrder: 20 },
            48: { ZoneLightID: 2, PositionX: 15030.3018, PositionY: 12892.3506, PointOrder: 21 },
            49: { ZoneLightID: 2, PositionX: 15021.0664, PositionY: 12836.9395, PointOrder: 22 },
            50: { ZoneLightID: 2, PositionX: 14910.2441, PositionY: 12804.6162, PointOrder: 23 },
            51: { ZoneLightID: 2, PositionX: 14767.0986, PositionY: 12804.6162, PointOrder: 24 },
            52: { ZoneLightID: 2, PositionX: 14614.7168, PositionY: 12961.6152, PointOrder: 25 },
            53: { ZoneLightID: 2, PositionX: 14476.1885, PositionY: 12966.2324, PointOrder: 26 },
            54: { ZoneLightID: 2, PositionX: 14460.0273, PositionY: 13023.9521, PointOrder: 27 },
            55: { ZoneLightID: 2, PositionX: 14169.1182, PositionY: 13017.0264, PointOrder: 28 },
            56: { ZoneLightID: 2, PositionX: 13977.4873, PositionY: 12998.5557, PointOrder: 29 },
            57: { ZoneLightID: 2, PositionX: 13866.665, PositionY: 12975.4678, PointOrder: 30 },
            58: { ZoneLightID: 2, PositionX: 13867.8193, PositionY: 13253.6787, PointOrder: 31 },
            59: { ZoneLightID: 2, PositionX: 13958.44, PositionY: 13321.2109, PointOrder: 32 },
            60: { ZoneLightID: 2, PositionX: 13947.4736, PositionY: 13460.3164, PointOrder: 33 },
            61: { ZoneLightID: 2, PositionX: 13855.6982, PositionY: 13652.5244, PointOrder: 34 },
            62: { ZoneLightID: 2, PositionX: 13805.4824, PositionY: 13773.1582, PointOrder: 35 },
            63: { ZoneLightID: 2, PositionX: 13870.7061, PositionY: 13949.2051, PointOrder: 36 },
            64: { ZoneLightID: 2, PositionX: 13822.3057, PositionY: 14659.71, PointOrder: 37 },
            65: { ZoneLightID: 2, PositionX: 13797.5371, PositionY: 16126.1553, PointOrder: 38 },
            66: { ZoneLightID: 2, PositionX: 18053, PositionY: 16590.3711, PointOrder: 39 },
            67: { ZoneLightID: 2, PositionX: 18651.5273, PositionY: 15350.3018, PointOrder: 40 },
            68: { ZoneLightID: 2, PositionX: 18668.9727, PositionY: 14194.5156, PointOrder: 41 },
            69: { ZoneLightID: 2, PositionX: 18686.6523, PositionY: 13840.9521, PointOrder: 42 },
            70: { ZoneLightID: 2, PositionX: 18727.09, PositionY: 13693.9414, PointOrder: 43 },
            71: { ZoneLightID: 2, PositionX: 18673.4961, PositionY: 13143.4619, PointOrder: 44 },
            72: { ZoneLightID: 2, PositionX: 18572.0039, PositionY: 13017.0264, PointOrder: 45 },
            73: { ZoneLightID: 2, PositionX: 18572.0039, PositionY: 12873.8809, PointOrder: 46 },
            74: { ZoneLightID: 2, PositionX: 18664.3555, PositionY: 12721.499, PointOrder: 47 },
            75: { ZoneLightID: 2, PositionX: 18641.5957, PositionY: 12644.9131, PointOrder: 48 },
            76: { ZoneLightID: 2, PositionX: 18791.4082, PositionY: 12518.5566, PointOrder: 49 },
            77: { ZoneLightID: 2, PositionX: 18914.1035, PositionY: 12388.6025, PointOrder: 50 },
            78: { ZoneLightID: 2, PositionX: 18715.5449, PositionY: 12363.9971, PointOrder: 51 },
            79: { ZoneLightID: 2, PositionX: 18681.5371, PositionY: 12295.5254, PointOrder: 52 },
            80: { ZoneLightID: 2, PositionX: 18536.9688, PositionY: 12380.7451, PointOrder: 53 },
            81: { ZoneLightID: 2, PositionX: 18437.9414, PositionY: 12409.7207, PointOrder: 54 },
            82: { ZoneLightID: 2, PositionX: 18405.0449, PositionY: 12331.1709, PointOrder: 55 },
            83: { ZoneLightID: 2, PositionX: 18512.8633, PositionY: 12205.2158, PointOrder: 56 },
            84: { ZoneLightID: 2, PositionX: 18456.5645, PositionY: 12033.4766, PointOrder: 57 },
            85: { ZoneLightID: 2, PositionX: 18165.6543, PositionY: 12028.8584, PointOrder: 58 },
            86: { ZoneLightID: 3, PositionX: 21892.06, PositionY: 11539.3926, PointOrder: 1 },
            87: { ZoneLightID: 3, PositionX: 21702.74, PositionY: 11534.7754, PointOrder: 2 },
            88: { ZoneLightID: 3, PositionX: 21647.3281, PositionY: 11608.6572, PointOrder: 3 },
            89: { ZoneLightID: 3, PositionX: 21638.0938, PositionY: 11830.3018, PointOrder: 4 },
            90: { ZoneLightID: 3, PositionX: 21499.5645, PositionY: 11922.6543, PointOrder: 5 },
            91: { ZoneLightID: 3, PositionX: 21342.8945, PositionY: 11926.7119, PointOrder: 6 },
            92: { ZoneLightID: 3, PositionX: 21237.81, PositionY: 12044.8564, PointOrder: 7 },
            93: { ZoneLightID: 3, PositionX: 20893.4023, PositionY: 12074.2432, PointOrder: 8 },
            94: { ZoneLightID: 3, PositionX: 20815.3828, PositionY: 12128.9414, PointOrder: 9 },
            95: { ZoneLightID: 3, PositionX: 20802.98, PositionY: 12226.8955, PointOrder: 10 },
            96: { ZoneLightID: 3, PositionX: 20286.16, PositionY: 12544.5986, PointOrder: 11 },
            97: { ZoneLightID: 3, PositionX: 20258.2227, PositionY: 12606.6357, PointOrder: 12 },
            98: { ZoneLightID: 3, PositionX: 19996.78, PositionY: 12622.3057, PointOrder: 13 },
            99: { ZoneLightID: 3, PositionX: 19784.9688, PositionY: 12630.748, PointOrder: 14 },
            100: { ZoneLightID: 3, PositionX: 19578.24, PositionY: 12598.1934, PointOrder: 15 },
            101: { ZoneLightID: 3, PositionX: 19551.1113, PositionY: 12523.6553, PointOrder: 16 },
            102: { ZoneLightID: 3, PositionX: 19447.707, PositionY: 12491.6035, PointOrder: 17 },
            103: { ZoneLightID: 3, PositionX: 19439.5254, PositionY: 12401.7373, PointOrder: 18 },
            104: { ZoneLightID: 3, PositionX: 18909.88, PositionY: 12392.0645, PointOrder: 19 },
            105: { ZoneLightID: 3, PositionX: 18799.291, PositionY: 12515.292, PointOrder: 20 },
            106: { ZoneLightID: 3, PositionX: 18633.7129, PositionY: 12644.9131, PointOrder: 21 },
            107: { ZoneLightID: 3, PositionX: 18664.3555, PositionY: 12721.499, PointOrder: 22 },
            108: { ZoneLightID: 3, PositionX: 18567.3867, PositionY: 12873.8809, PointOrder: 23 },
            109: { ZoneLightID: 3, PositionX: 18572.0039, PositionY: 13021.6436, PointOrder: 24 },
            110: { ZoneLightID: 3, PositionX: 18666.9648, PositionY: 13146.7266, PointOrder: 25 },
            111: { ZoneLightID: 3, PositionX: 18730.3555, PositionY: 13699.1191, PointOrder: 26 },
            112: { ZoneLightID: 3, PositionX: 18689.916, PositionY: 13837.127, PointOrder: 27 },
            113: { ZoneLightID: 3, PositionX: 18651.6641, PositionY: 15369.3154, PointOrder: 28 },
            114: { ZoneLightID: 3, PositionX: 18652.168, PositionY: 15364.9473, PointOrder: 29 },
            115: { ZoneLightID: 3, PositionX: 19615.582, PositionY: 14466.9541, PointOrder: 30 },
            116: { ZoneLightID: 3, PositionX: 20017.3145, PositionY: 14356.1318, PointOrder: 31 },
            117: { ZoneLightID: 3, PositionX: 20040.4023, PositionY: 14166.81, PointOrder: 32 },
            118: { ZoneLightID: 3, PositionX: 20077.3438, PositionY: 14069.84, PointOrder: 33 },
            119: { ZoneLightID: 3, PositionX: 20190.4746, PositionY: 14062.9131, PointOrder: 34 },
            120: { ZoneLightID: 3, PositionX: 20232.0332, PositionY: 13864.3564, PointOrder: 35 },
            121: { ZoneLightID: 3, PositionX: 20339.3926, PositionY: 13792.7832, PointOrder: 36 },
            122: { ZoneLightID: 3, PositionX: 20450.2148, PositionY: 13638.0938, PointOrder: 37 },
            123: { ZoneLightID: 3, PositionX: 20515.7617, PositionY: 13486.5986, PointOrder: 38 },
            124: { ZoneLightID: 3, PositionX: 20650.81, PositionY: 13382.6133, PointOrder: 39 },
            125: { ZoneLightID: 3, PositionX: 20777.78, PositionY: 13426.3916, PointOrder: 40 },
            126: { ZoneLightID: 3, PositionX: 21030.56, PositionY: 13406.5889, PointOrder: 41 },
            127: { ZoneLightID: 3, PositionX: 21224.4688, PositionY: 13409.875, PointOrder: 42 },
            128: { ZoneLightID: 3, PositionX: 21347.959, PositionY: 13461.6455, PointOrder: 43 },
            129: { ZoneLightID: 3, PositionX: 21443.7422, PositionY: 13546.8936, PointOrder: 44 },
            130: { ZoneLightID: 3, PositionX: 21586.8555, PositionY: 13566.34, PointOrder: 45 },
            131: { ZoneLightID: 3, PositionX: 21755.3672, PositionY: 13515.3682, PointOrder: 46 },
            132: { ZoneLightID: 3, PositionX: 21870.7754, PositionY: 13412.4492, PointOrder: 47 },
            133: { ZoneLightID: 3, PositionX: 22070.2324, PositionY: 13362.542, PointOrder: 48 },
            134: { ZoneLightID: 3, PositionX: 22187.7285, PositionY: 13304.5537, PointOrder: 49 },
            135: { ZoneLightID: 3, PositionX: 22454.6387, PositionY: 13389.4756, PointOrder: 50 },
            136: { ZoneLightID: 3, PositionX: 22739.0918, PositionY: 13505.0479, PointOrder: 51 },
            137: { ZoneLightID: 3, PositionX: 23116.26, PositionY: 13981.3828, PointOrder: 52 },
            138: { ZoneLightID: 3, PositionX: 24099.5566, PositionY: 13979.9609, PointOrder: 53 },
            139: { ZoneLightID: 3, PositionX: 23139.4238, PositionY: 11152.1377, PointOrder: 54 },
            140: { ZoneLightID: 4, PositionX: 23116.2871, PositionY: 13983.89, PointOrder: 1 },
            141: { ZoneLightID: 4, PositionX: 23296.7461, PositionY: 14365.1641, PointOrder: 2 },
            142: { ZoneLightID: 4, PositionX: 23201.91, PositionY: 14639.38, PointOrder: 3 },
            143: { ZoneLightID: 4, PositionX: 22842.4141, PositionY: 14778.38, PointOrder: 4 },
            144: { ZoneLightID: 4, PositionX: 22663.0742, PositionY: 14897.1123, PointOrder: 5 },
            145: { ZoneLightID: 4, PositionX: 22392.5352, PositionY: 15094.3447, PointOrder: 6 },
            146: { ZoneLightID: 4, PositionX: 22221.2754, PositionY: 15075.7031, PointOrder: 7 },
            147: { ZoneLightID: 4, PositionX: 22055.79, PositionY: 14978.5635, PointOrder: 8 },
            148: { ZoneLightID: 4, PositionX: 21873.7246, PositionY: 14684.293, PointOrder: 9 },
            149: { ZoneLightID: 4, PositionX: 21730.91, PositionY: 14628.9834, PointOrder: 10 },
            150: { ZoneLightID: 4, PositionX: 21592.7129, PositionY: 14655.6357, PointOrder: 11 },
            151: { ZoneLightID: 4, PositionX: 21442.97, PositionY: 14760.7881, PointOrder: 12 },
            152: { ZoneLightID: 4, PositionX: 21212.26, PositionY: 14891.6416, PointOrder: 13 },
            153: { ZoneLightID: 4, PositionX: 20961.9238, PositionY: 14895.5117, PointOrder: 14 },
            154: { ZoneLightID: 4, PositionX: 20674.6465, PositionY: 14823.1914, PointOrder: 15 },
            155: { ZoneLightID: 4, PositionX: 20484.8457, PositionY: 14729.0029, PointOrder: 16 },
            156: { ZoneLightID: 4, PositionX: 20249.3477, PositionY: 14513.13, PointOrder: 17 },
            157: { ZoneLightID: 4, PositionX: 20188.166, PositionY: 14316.8818, PointOrder: 18 },
            158: { ZoneLightID: 4, PositionX: 20183.5469, PositionY: 14069.84, PointOrder: 19 },
            159: { ZoneLightID: 4, PositionX: 20072.7246, PositionY: 14065.2227, PointOrder: 20 },
            160: { ZoneLightID: 4, PositionX: 20040.4023, PositionY: 14171.4268, PointOrder: 21 },
            161: { ZoneLightID: 4, PositionX: 20012.6973, PositionY: 14365.3662, PointOrder: 22 },
            162: { ZoneLightID: 4, PositionX: 19606.3477, PositionY: 14466.9541, PointOrder: 23 },
            163: { ZoneLightID: 4, PositionX: 18645.252, PositionY: 15372.2129, PointOrder: 24 },
            164: { ZoneLightID: 4, PositionX: 18058.5527, PositionY: 16593.8633, PointOrder: 25 },
            165: { ZoneLightID: 4, PositionX: 18370.62, PositionY: 17865.8379, PointOrder: 26 },
            166: { ZoneLightID: 4, PositionX: 19071.873, PositionY: 18705.54, PointOrder: 27 },
            167: { ZoneLightID: 4, PositionX: 21539.6055, PositionY: 18909.4824, PointOrder: 28 },
            168: { ZoneLightID: 4, PositionX: 24192.7344, PositionY: 18435.9414, PointOrder: 29 },
            169: { ZoneLightID: 4, PositionX: 24640.8027, PositionY: 16635.3477, PointOrder: 30 },
            170: { ZoneLightID: 4, PositionX: 24098.4844, PositionY: 13978.3281, PointOrder: 31 },
            171: { ZoneLightID: 5, PositionX: 20512.959, PositionY: 13491.4463, PointOrder: 1 },
            172: { ZoneLightID: 5, PositionX: 20449.7813, PositionY: 13636.7168, PointOrder: 2 },
            173: { ZoneLightID: 5, PositionX: 20336.2285, PositionY: 13793.6914, PointOrder: 3 },
            174: { ZoneLightID: 5, PositionX: 20232.5684, PositionY: 13863.4, PointOrder: 4 },
            175: { ZoneLightID: 5, PositionX: 20190.5176, PositionY: 14060.86, PointOrder: 5 },
            176: { ZoneLightID: 5, PositionX: 20186.2969, PositionY: 14326.3965, PointOrder: 6 },
            177: { ZoneLightID: 5, PositionX: 20249.8945, PositionY: 14516.3027, PointOrder: 7 },
            178: { ZoneLightID: 5, PositionX: 20483.1074, PositionY: 14729.5293, PointOrder: 8 },
            179: { ZoneLightID: 5, PositionX: 20671.6133, PositionY: 14824.6338, PointOrder: 9 },
            180: { ZoneLightID: 5, PositionX: 20959.8652, PositionY: 14895.25, PointOrder: 10 },
            181: { ZoneLightID: 5, PositionX: 21212.0859, PositionY: 14890.6328, PointOrder: 11 },
            182: { ZoneLightID: 5, PositionX: 21448.4, PositionY: 14760.8037, PointOrder: 12 },
            183: { ZoneLightID: 5, PositionX: 21593.1543, PositionY: 14653.5029, PointOrder: 13 },
            184: { ZoneLightID: 5, PositionX: 21730.5625, PositionY: 14628.9219, PointOrder: 14 },
            185: { ZoneLightID: 5, PositionX: 21876.248, PositionY: 14687.3184, PointOrder: 15 },
            186: { ZoneLightID: 5, PositionX: 22055.5176, PositionY: 14982.82, PointOrder: 16 },
            187: { ZoneLightID: 5, PositionX: 22393.7715, PositionY: 15092.1992, PointOrder: 17 },
            188: { ZoneLightID: 5, PositionX: 22670.248, PositionY: 14892.7539, PointOrder: 18 },
            189: { ZoneLightID: 5, PositionX: 22843.5684, PositionY: 14778.3174, PointOrder: 19 },
            190: { ZoneLightID: 5, PositionX: 23204.625, PositionY: 14638.3174, PointOrder: 20 },
            191: { ZoneLightID: 5, PositionX: 23295.8145, PositionY: 14363.0576, PointOrder: 21 },
            192: { ZoneLightID: 5, PositionX: 23117.5723, PositionY: 13984.25, PointOrder: 22 },
            193: { ZoneLightID: 5, PositionX: 22736.8262, PositionY: 13499.8213, PointOrder: 23 },
            194: { ZoneLightID: 5, PositionX: 22445.6016, PositionY: 13389.0205, PointOrder: 24 },
            195: { ZoneLightID: 5, PositionX: 22186.2129, PositionY: 13303.5254, PointOrder: 25 },
            196: { ZoneLightID: 5, PositionX: 22069.3945, PositionY: 13361.7813, PointOrder: 26 },
            197: { ZoneLightID: 5, PositionX: 21870.0215, PositionY: 13414.0674, PointOrder: 27 },
            198: { ZoneLightID: 5, PositionX: 21752.81, PositionY: 13517.0313, PointOrder: 28 },
            199: { ZoneLightID: 5, PositionX: 21584.57, PositionY: 13566.9854, PointOrder: 29 },
            200: { ZoneLightID: 5, PositionX: 21443.0645, PositionY: 13544.3, PointOrder: 30 },
            201: { ZoneLightID: 5, PositionX: 21345.1211, PositionY: 13461.6787, PointOrder: 31 },
            202: { ZoneLightID: 5, PositionX: 21223.77, PositionY: 13411.6191, PointOrder: 32 },
            203: { ZoneLightID: 5, PositionX: 21035.3555, PositionY: 13406.1846, PointOrder: 33 },
            204: { ZoneLightID: 5, PositionX: 20775.418, PositionY: 13421.7871, PointOrder: 34 },
            205: { ZoneLightID: 5, PositionX: 20648.9453, PositionY: 13377.8369, PointOrder: 35 },
            206: { ZoneLightID: 6, PositionX: 16531.0234, PositionY: 6935.641, PointOrder: 1 },
            207: { ZoneLightID: 6, PositionX: 15999.998, PositionY: 6944.87646, PointOrder: 2 },
            208: { ZoneLightID: 6, PositionX: 12804.7266, PositionY: 7480.861, PointOrder: 3 },
            209: { ZoneLightID: 6, PositionX: 10838.3135, PositionY: 8874.21, PointOrder: 4 },
            210: { ZoneLightID: 6, PositionX: 11744.7256, PositionY: 10236.9336, PointOrder: 5 },
            211: { ZoneLightID: 6, PositionX: 11815.3984, PositionY: 10115.2344, PointOrder: 6 },
            212: { ZoneLightID: 6, PositionX: 11894.3389, PositionY: 10124.8379, PointOrder: 7 },
            213: { ZoneLightID: 6, PositionX: 11965.7637, PositionY: 10254.7871, PointOrder: 8 },
            214: { ZoneLightID: 6, PositionX: 12527, PositionY: 10247.584, PointOrder: 9 },
            215: { ZoneLightID: 6, PositionX: 12756.0635, PositionY: 10260.084, PointOrder: 10 },
            216: { ZoneLightID: 6, PositionX: 12926.3545, PositionY: 10355.47, PointOrder: 11 },
            217: { ZoneLightID: 6, PositionX: 13395.67, PositionY: 10703.6064, PointOrder: 12 },
            218: { ZoneLightID: 6, PositionX: 13485.7129, PositionY: 10867.5313, PointOrder: 13 },
            219: { ZoneLightID: 6, PositionX: 13693.5049, PositionY: 11082.25, PointOrder: 14 },
            220: { ZoneLightID: 6, PositionX: 13707.3574, PositionY: 11527.8486, PointOrder: 15 },
            221: { ZoneLightID: 6, PositionX: 13998.2666, PositionY: 11532.4668, PointOrder: 16 },
            222: { ZoneLightID: 6, PositionX: 14002.8848, PositionY: 11467.82, PointOrder: 17 },
            223: { ZoneLightID: 6, PositionX: 14330.7344, PositionY: 11463.2031, PointOrder: 18 },
            224: { ZoneLightID: 6, PositionX: 14430.0127, PositionY: 11587.8779, PointOrder: 19 },
            225: { ZoneLightID: 6, PositionX: 14626.2607, PositionY: 11613.2754, PointOrder: 20 },
            226: { ZoneLightID: 6, PositionX: 14831.7441, PositionY: 11691.7744, PointOrder: 21 },
            227: { ZoneLightID: 6, PositionX: 14931.0234, PositionY: 11834.92, PointOrder: 22 },
            228: { ZoneLightID: 6, PositionX: 14979.5078, PositionY: 12001.1533, PointOrder: 23 },
            229: { ZoneLightID: 6, PositionX: 15067.1006, PositionY: 12039.7344, PointOrder: 24 },
            230: { ZoneLightID: 6, PositionX: 15162.8555, PositionY: 12166.4756, PointOrder: 25 },
            231: { ZoneLightID: 6, PositionX: 15278.2021, PositionY: 12164.2422, PointOrder: 26 },
            232: { ZoneLightID: 6, PositionX: 15279.2686, PositionY: 12233.8428, PointOrder: 27 },
            233: { ZoneLightID: 6, PositionX: 15409.3076, PositionY: 12233.2422, PointOrder: 28 },
            234: { ZoneLightID: 6, PositionX: 15432.0977, PositionY: 12140.0176, PointOrder: 29 },
            235: { ZoneLightID: 6, PositionX: 15567.9688, PositionY: 12019.3037, PointOrder: 30 },
            236: { ZoneLightID: 6, PositionX: 15587.9277, PositionY: 11929.6084, PointOrder: 31 },
            237: { ZoneLightID: 6, PositionX: 15826.6514, PositionY: 11823.5879, PointOrder: 32 },
            238: { ZoneLightID: 6, PositionX: 15902.1172, PositionY: 11711.0361, PointOrder: 33 },
            239: { ZoneLightID: 6, PositionX: 15992.2764, PositionY: 11701.3369, PointOrder: 34 },
            240: { ZoneLightID: 6, PositionX: 15989.3789, PositionY: 11641.0283, PointOrder: 35 },
            241: { ZoneLightID: 6, PositionX: 15792.2061, PositionY: 11557.8633, PointOrder: 36 },
            242: { ZoneLightID: 6, PositionX: 15725.2705, PositionY: 11482.5811, PointOrder: 37 },
            243: { ZoneLightID: 6, PositionX: 15647.9063, PositionY: 11366.2334, PointOrder: 38 },
            244: { ZoneLightID: 6, PositionX: 15643.2881, PositionY: 11163.0586, PointOrder: 39 },
            245: { ZoneLightID: 6, PositionX: 15722.9424, PositionY: 11063.7793, PointOrder: 40 },
            246: { ZoneLightID: 6, PositionX: 15776.0449, PositionY: 10934.4863, PointOrder: 41 },
            247: { ZoneLightID: 6, PositionX: 15931.69, PositionY: 10906.4189, PointOrder: 42 },
            248: { ZoneLightID: 6, PositionX: 16164.959, PositionY: 10747.3828, PointOrder: 43 },
            249: { ZoneLightID: 6, PositionX: 16265.9395, PositionY: 10739.9795, PointOrder: 44 },
            250: { ZoneLightID: 6, PositionX: 16273.291, PositionY: 10830.77, PointOrder: 45 },
            251: { ZoneLightID: 6, PositionX: 16494.207, PositionY: 10831.5156, PointOrder: 46 },
            252: { ZoneLightID: 6, PositionX: 16604.3, PositionY: 10960.4014, PointOrder: 47 },
            253: { ZoneLightID: 6, PositionX: 16722.4746, PositionY: 10957.6846, PointOrder: 48 },
            254: { ZoneLightID: 6, PositionX: 16797.9375, PositionY: 11099.2676, PointOrder: 49 },
            255: { ZoneLightID: 6, PositionX: 16938.0449, PositionY: 11115.0215, PointOrder: 50 },
            256: { ZoneLightID: 6, PositionX: 17262.8574, PositionY: 11120.3857, PointOrder: 51 },
            257: { ZoneLightID: 6, PositionX: 17262.1289, PositionY: 10975.6777, PointOrder: 52 },
            258: { ZoneLightID: 6, PositionX: 17177.1289, PositionY: 10857.5215, PointOrder: 53 },
            259: { ZoneLightID: 6, PositionX: 17163.7012, PositionY: 10772.8418, PointOrder: 54 },
            260: { ZoneLightID: 6, PositionX: 17070.62, PositionY: 10666.2295, PointOrder: 55 },
            261: { ZoneLightID: 6, PositionX: 16834.3926, PositionY: 10493.8164, PointOrder: 56 },
            262: { ZoneLightID: 6, PositionX: 16829.2559, PositionY: 10268.3174, PointOrder: 57 },
            263: { ZoneLightID: 6, PositionX: 16648.0156, PositionY: 9950.761, PointOrder: 58 },
            264: { ZoneLightID: 6, PositionX: 16628.7539, PositionY: 9605.321, PointOrder: 59 },
            265: { ZoneLightID: 6, PositionX: 16526.1816, PositionY: 9585.523, PointOrder: 60 },
            266: { ZoneLightID: 6, PositionX: 16531.0234, PositionY: 8752.669, PointOrder: 61 },
            267: { ZoneLightID: 7, PositionX: 13693.0654, PositionY: 11078.7578, PointOrder: 1 },
            268: { ZoneLightID: 7, PositionX: 13495.9414, PositionY: 10874.3779, PointOrder: 2 },
            269: { ZoneLightID: 7, PositionX: 13390.4316, PositionY: 10700.2334, PointOrder: 3 },
            270: { ZoneLightID: 7, PositionX: 13083.5088, PositionY: 10465.1436, PointOrder: 4 },
            271: { ZoneLightID: 7, PositionX: 12926.7822, PositionY: 10350.8633, PointOrder: 5 },
            272: { ZoneLightID: 7, PositionX: 12750.4648, PositionY: 10259.4395, PointOrder: 6 },
            273: { ZoneLightID: 7, PositionX: 12508.8447, PositionY: 10249.6445, PointOrder: 7 },
            274: { ZoneLightID: 7, PositionX: 11963.5664, PositionY: 10256.1748, PointOrder: 8 },
            275: { ZoneLightID: 7, PositionX: 11904.7939, PositionY: 10122.3037, PointOrder: 9 },
            276: { ZoneLightID: 7, PositionX: 11816.6348, PositionY: 10115.7734, PointOrder: 10 },
            277: { ZoneLightID: 7, PositionX: 11741.9326, PositionY: 10239.8486, PointOrder: 11 },
            278: { ZoneLightID: 7, PositionX: 10840.3584, PositionY: 8875.02051, PointOrder: 12 },
            279: { ZoneLightID: 7, PositionX: 8066.32764, PositionY: 10979.1328, PointOrder: 13 },
            280: { ZoneLightID: 7, PositionX: 10567.4395, PositionY: 12377.9551, PointOrder: 14 },
            281: { ZoneLightID: 7, PositionX: 11062.3877, PositionY: 12391.5752, PointOrder: 15 },
            282: { ZoneLightID: 7, PositionX: 11111.3652, PositionY: 12339.334, PointOrder: 16 },
            283: { ZoneLightID: 7, PositionX: 11385.6367, PositionY: 12342.5986, PointOrder: 17 },
            284: { ZoneLightID: 7, PositionX: 11568.4844, PositionY: 12437.2871, PointOrder: 18 },
            285: { ZoneLightID: 7, PositionX: 12123.5586, PositionY: 12440.5527, PointOrder: 19 },
            286: { ZoneLightID: 7, PositionX: 12133.3535, PositionY: 12499.3252, PointOrder: 20 },
            287: { ZoneLightID: 7, PositionX: 12355.3828, PositionY: 12505.8555, PointOrder: 21 },
            288: { ZoneLightID: 7, PositionX: 12395.125, PositionY: 12549.4229, PointOrder: 22 },
            289: { ZoneLightID: 7, PositionX: 12434.7031, PositionY: 12544.8047, PointOrder: 23 },
            290: { ZoneLightID: 7, PositionX: 12453.3369, PositionY: 12502.59, PointOrder: 24 },
            291: { ZoneLightID: 7, PositionX: 12801.915, PositionY: 12482.835, PointOrder: 25 },
            292: { ZoneLightID: 7, PositionX: 12938.2441, PositionY: 12388.7266, PointOrder: 26 },
            293: { ZoneLightID: 7, PositionX: 13088.4268, PositionY: 12241.5156, PointOrder: 27 },
            294: { ZoneLightID: 7, PositionX: 13182.3232, PositionY: 12112.29, PointOrder: 28 },
            295: { ZoneLightID: 7, PositionX: 13376.0869, PositionY: 11887.1035, PointOrder: 29 },
            296: { ZoneLightID: 7, PositionX: 13584.8232, PositionY: 11720.4736, PointOrder: 30 },
            297: { ZoneLightID: 7, PositionX: 13708.8594, PositionY: 11522.9922, PointOrder: 31 },
            298: { ZoneLightID: 8, PositionX: 16528.7148, PositionY: 8004.6167, PointOrder: 1 },
            299: { ZoneLightID: 8, PositionX: 16521.7871, PositionY: 9588.455, PointOrder: 2 },
            300: { ZoneLightID: 8, PositionX: 16627.9922, PositionY: 9604.617, PointOrder: 3 },
            301: { ZoneLightID: 8, PositionX: 16651.08, PositionY: 9944.011, PointOrder: 4 },
            302: { ZoneLightID: 8, PositionX: 16831.168, PositionY: 10267.2432, PointOrder: 5 },
            303: { ZoneLightID: 8, PositionX: 16835.7852, PositionY: 10493.5049, PointOrder: 6 },
            304: { ZoneLightID: 8, PositionX: 17069.2285, PositionY: 10664.3652, PointOrder: 7 },
            305: { ZoneLightID: 8, PositionX: 17162.7988, PositionY: 10772.0166, PointOrder: 8 },
            306: { ZoneLightID: 8, PositionX: 17176.668, PositionY: 10860.4, PointOrder: 9 },
            307: { ZoneLightID: 8, PositionX: 17260.9551, PositionY: 10974.1816, PointOrder: 10 },
            308: { ZoneLightID: 8, PositionX: 17262.127, PositionY: 11127.2129, PointOrder: 11 },
            309: { ZoneLightID: 8, PositionX: 17254.5059, PositionY: 11328.2412, PointOrder: 12 },
            310: { ZoneLightID: 8, PositionX: 17367.4238, PositionY: 11390.39, PointOrder: 13 },
            311: { ZoneLightID: 8, PositionX: 17968.4824, PositionY: 11388.8682, PointOrder: 14 },
            312: { ZoneLightID: 8, PositionX: 18074.2715, PositionY: 11347.31, PointOrder: 15 },
            313: { ZoneLightID: 8, PositionX: 18148.0156, PositionY: 11300.8135, PointOrder: 16 },
            314: { ZoneLightID: 8, PositionX: 18265.8887, PositionY: 11303.0547, PointOrder: 17 },
            315: { ZoneLightID: 8, PositionX: 18271.86, PositionY: 11137.6611, PointOrder: 18 },
            316: { ZoneLightID: 8, PositionX: 18599.709, PositionY: 11123.8086, PointOrder: 19 },
            317: { ZoneLightID: 8, PositionX: 18599.709, PositionY: 11008.3682, PointOrder: 20 },
            318: { ZoneLightID: 8, PositionX: 18712.8418, PositionY: 10978.3535, PointOrder: 21 },
            319: { ZoneLightID: 8, PositionX: 18952.957, PositionY: 10959.8838, PointOrder: 22 },
            320: { ZoneLightID: 8, PositionX: 18976.0449, PositionY: 10763.6357, PointOrder: 23 },
            321: { ZoneLightID: 8, PositionX: 19190.7637, PositionY: 10763.6357, PointOrder: 24 },
            322: { ZoneLightID: 8, PositionX: 19167.6758, PositionY: 10597.4014, PointOrder: 25 },
            323: { ZoneLightID: 8, PositionX: 19343.1445, PositionY: 10500.4316, PointOrder: 26 },
            324: { ZoneLightID: 8, PositionX: 19435.4961, PositionY: 10565.0781, PointOrder: 27 },
            325: { ZoneLightID: 8, PositionX: 19707.9336, PositionY: 10560.4609, PointOrder: 28 },
            326: { ZoneLightID: 8, PositionX: 19740.2578, PositionY: 10431.168, PointOrder: 29 },
            327: { ZoneLightID: 8, PositionX: 21093.2168, PositionY: 10431.168, PointOrder: 30 },
            328: { ZoneLightID: 8, PositionX: 21104.76, PositionY: 9937.084, PointOrder: 31 },
            329: { ZoneLightID: 8, PositionX: 21331.0234, PositionY: 9930.158, PointOrder: 32 },
            330: { ZoneLightID: 8, PositionX: 21344.875, PositionY: 8011.54346, PointOrder: 33 },
            331: { ZoneLightID: 8, PositionX: 19733.7266, PositionY: 6948.70264, PointOrder: 34 },
            332: { ZoneLightID: 8, PositionX: 16525.4434, PositionY: 6933.728, PointOrder: 35 },
            333: { ZoneLightID: 9, PositionX: 14434.03, PositionY: 11589.4619, PointOrder: 1 },
            334: { ZoneLightID: 9, PositionX: 14329.8906, PositionY: 11461.166, PointOrder: 2 },
            335: { ZoneLightID: 9, PositionX: 14002.8848, PositionY: 11463.2021, PointOrder: 3 },
            336: { ZoneLightID: 9, PositionX: 13998.2666, PositionY: 11527.8486, PointOrder: 4 },
            337: { ZoneLightID: 9, PositionX: 13705.0488, PositionY: 11523.2314, PointOrder: 5 },
            338: { ZoneLightID: 9, PositionX: 13580.374, PositionY: 11717.1709, PointOrder: 6 },
            339: { ZoneLightID: 9, PositionX: 13374.8906, PositionY: 11888.0215, PointOrder: 7 },
            340: { ZoneLightID: 9, PositionX: 13178.6416, PositionY: 12118.9023, PointOrder: 8 },
            341: { ZoneLightID: 9, PositionX: 13081.6729, PositionY: 12248.1953, PointOrder: 9 },
            342: { ZoneLightID: 9, PositionX: 12936.2178, PositionY: 12389.0322, PointOrder: 10 },
            343: { ZoneLightID: 9, PositionX: 12803.2676, PositionY: 12480.5264, PointOrder: 11 },
            344: { ZoneLightID: 9, PositionX: 12806.0967, PositionY: 12705.0967, PointOrder: 12 },
            345: { ZoneLightID: 9, PositionX: 12871.4951, PositionY: 12795.7969, PointOrder: 13 },
            346: { ZoneLightID: 9, PositionX: 13331.7275, PositionY: 12825.8115, PointOrder: 14 },
            347: { ZoneLightID: 9, PositionX: 13799.627, PositionY: 12850.9082, PointOrder: 15 },
            348: { ZoneLightID: 9, PositionX: 13877.7539, PositionY: 12974.4023, PointOrder: 16 },
            349: { ZoneLightID: 9, PositionX: 13968.3613, PositionY: 12995.626, PointOrder: 17 },
            350: { ZoneLightID: 9, PositionX: 14167.7275, PositionY: 13015.6807, PointOrder: 18 },
            351: { ZoneLightID: 9, PositionX: 14460.5771, PositionY: 13028.0459, PointOrder: 19 },
            352: { ZoneLightID: 9, PositionX: 14477.7236, PositionY: 12962.9746, PointOrder: 20 },
            353: { ZoneLightID: 9, PositionX: 14614.8594, PositionY: 12956.4443, PointOrder: 21 },
            354: { ZoneLightID: 9, PositionX: 14768.3213, PositionY: 12802.9834, PointOrder: 22 },
            355: { ZoneLightID: 9, PositionX: 14908.7217, PositionY: 12802.9834, PointOrder: 23 },
            356: { ZoneLightID: 9, PositionX: 15019.7363, PositionY: 12838.8994, PointOrder: 24 },
            357: { ZoneLightID: 9, PositionX: 15032.7969, PositionY: 12884.6113, PointOrder: 25 },
            358: { ZoneLightID: 9, PositionX: 15267.8877, PositionY: 12858.49, PointOrder: 26 },
            359: { ZoneLightID: 9, PositionX: 15336.4551, PositionY: 12789.9229, PointOrder: 27 },
            360: { ZoneLightID: 9, PositionX: 15333.1895, PositionY: 12522.1807, PointOrder: 28 },
            361: { ZoneLightID: 9, PositionX: 15267.8877, PositionY: 12453.6133, PointOrder: 29 },
            362: { ZoneLightID: 9, PositionX: 15277.123, PositionY: 12232.8682, PointOrder: 30 },
            363: { ZoneLightID: 9, PositionX: 15278.7637, PositionY: 12163.0439, PointOrder: 31 },
            364: { ZoneLightID: 9, PositionX: 15167.2158, PositionY: 12162.5234, PointOrder: 32 },
            365: { ZoneLightID: 9, PositionX: 15063.8125, PositionY: 12034.1592, PointOrder: 33 },
            366: { ZoneLightID: 9, PositionX: 14980.4238, PositionY: 12008.7061, PointOrder: 34 },
            367: { ZoneLightID: 9, PositionX: 14932.9795, PositionY: 11847.8818, PointOrder: 35 },
            368: { ZoneLightID: 9, PositionX: 14836.9658, PositionY: 11692.4395, PointOrder: 36 },
            369: { ZoneLightID: 9, PositionX: 14631.3428, PositionY: 11611.8252, PointOrder: 37 },
            370: { ZoneLightID: 10, PositionX: 21349.8086, PositionY: 8013.98, PointOrder: 1 },
            371: { ZoneLightID: 10, PositionX: 21328.8652, PositionY: 9933.062, PointOrder: 2 },
            372: { ZoneLightID: 10, PositionX: 21102.2227, PositionY: 9933.146, PointOrder: 3 },
            373: { ZoneLightID: 10, PositionX: 21095.2949, PositionY: 10432.4922, PointOrder: 4 },
            374: { ZoneLightID: 10, PositionX: 19734.5977, PositionY: 10432.4922, PointOrder: 5 },
            375: { ZoneLightID: 10, PositionX: 19711.7422, PositionY: 10566.3623, PointOrder: 6 },
            376: { ZoneLightID: 10, PositionX: 19430.94, PositionY: 10566.3623, PointOrder: 7 },
            377: { ZoneLightID: 10, PositionX: 19346.6055, PositionY: 10505.6777, PointOrder: 8 },
            378: { ZoneLightID: 10, PositionX: 19169.7285, PositionY: 10599.0137, PointOrder: 9 },
            379: { ZoneLightID: 10, PositionX: 19191.86, PositionY: 10766.86, PointOrder: 10 },
            380: { ZoneLightID: 10, PositionX: 18973.1914, PositionY: 10765.9043, PointOrder: 11 },
            381: { ZoneLightID: 10, PositionX: 18955.99, PositionY: 10963.7529, PointOrder: 12 },
            382: { ZoneLightID: 10, PositionX: 18707.17, PositionY: 10980.8711, PointOrder: 13 },
            383: { ZoneLightID: 10, PositionX: 18601.5938, PositionY: 11003.8916, PointOrder: 14 },
            384: { ZoneLightID: 10, PositionX: 18598.33, PositionY: 11127.9668, PointOrder: 15 },
            385: { ZoneLightID: 10, PositionX: 18268.55, PositionY: 11137.7617, PointOrder: 16 },
            386: { ZoneLightID: 10, PositionX: 18266.2422, PositionY: 11306.3613, PointOrder: 17 },
            387: { ZoneLightID: 10, PositionX: 18297.9355, PositionY: 11356.5264, PointOrder: 18 },
            388: { ZoneLightID: 10, PositionX: 18297.9355, PositionY: 11542.64, PointOrder: 19 },
            389: { ZoneLightID: 10, PositionX: 18268.55, PositionY: 11568.7607, PointOrder: 20 },
            390: { ZoneLightID: 10, PositionX: 18268.55, PositionY: 11669.9795, PointOrder: 21 },
            391: { ZoneLightID: 10, PositionX: 18167.33, PositionY: 11780.9941, PointOrder: 22 },
            392: { ZoneLightID: 10, PositionX: 18164.0664, PositionY: 12032.41, PointOrder: 23 },
            393: { ZoneLightID: 10, PositionX: 18461.1934, PositionY: 12032.41, PointOrder: 24 },
            394: { ZoneLightID: 10, PositionX: 18506.9063, PositionY: 12205.4629, PointOrder: 25 },
            395: { ZoneLightID: 10, PositionX: 18405.29, PositionY: 12331.8467, PointOrder: 26 },
            396: { ZoneLightID: 10, PositionX: 18436.5137, PositionY: 12406.3213, PointOrder: 27 },
            397: { ZoneLightID: 10, PositionX: 18538.7539, PositionY: 12377.1787, PointOrder: 28 },
            398: { ZoneLightID: 10, PositionX: 18681.0879, PositionY: 12292.6992, PointOrder: 29 },
            399: { ZoneLightID: 10, PositionX: 18712.61, PositionY: 12358.9238, PointOrder: 30 },
            400: { ZoneLightID: 10, PositionX: 18911.7832, PositionY: 12386.76, PointOrder: 31 },
            401: { ZoneLightID: 10, PositionX: 19441.6914, PositionY: 12403.6895, PointOrder: 32 },
            402: { ZoneLightID: 10, PositionX: 19444.9863, PositionY: 12491.7129, PointOrder: 33 },
            403: { ZoneLightID: 10, PositionX: 19548.4844, PositionY: 12525.4463, PointOrder: 34 },
            404: { ZoneLightID: 10, PositionX: 19581.1367, PositionY: 12607.0752, PointOrder: 35 },
            405: { ZoneLightID: 10, PositionX: 19783.5742, PositionY: 12626.666, PointOrder: 36 },
            406: { ZoneLightID: 10, PositionX: 19972.9531, PositionY: 12623.4, PointOrder: 37 },
            407: { ZoneLightID: 10, PositionX: 20257.02, PositionY: 12607.0752, PointOrder: 38 },
            408: { ZoneLightID: 10, PositionX: 20279.875, PositionY: 12541.7725, PointOrder: 39 },
            409: { ZoneLightID: 10, PositionX: 20550.8828, PositionY: 12371.9844, PointOrder: 40 },
            410: { ZoneLightID: 10, PositionX: 20799.0332, PositionY: 12221.7881, PointOrder: 41 },
            411: { ZoneLightID: 10, PositionX: 20818.623, PositionY: 12127.1, PointOrder: 42 },
            412: { ZoneLightID: 10, PositionX: 20900.252, PositionY: 12078.1221, PointOrder: 43 },
            413: { ZoneLightID: 10, PositionX: 21230.0313, PositionY: 12048.7363, PointOrder: 44 },
            414: { ZoneLightID: 10, PositionX: 21344.31, PositionY: 11927.9258, PointOrder: 45 },
            415: { ZoneLightID: 10, PositionX: 21497.7734, PositionY: 11924.66, PointOrder: 46 },
            416: { ZoneLightID: 10, PositionX: 21638.1738, PositionY: 11826.707, PointOrder: 47 },
            417: { ZoneLightID: 10, PositionX: 21647.9688, PositionY: 11604.6768, PointOrder: 48 },
            418: { ZoneLightID: 10, PositionX: 21700.21, PositionY: 11536.1094, PointOrder: 49 },
            419: { ZoneLightID: 10, PositionX: 21895.5938, PositionY: 11538.418, PointOrder: 50 },
            420: { ZoneLightID: 10, PositionX: 23138.7637, PositionY: 11152.64, PointOrder: 51 },
            421: { ZoneLightID: 10, PositionX: 22512.3359, PositionY: 9294.59, PointOrder: 52 },
            422: { ZoneLightID: 11, PositionX: 17254.4258, PositionY: 11328.4492, PointOrder: 1 },
            423: { ZoneLightID: 11, PositionX: 17262.127, PositionY: 11127.2129, PointOrder: 2 },
            424: { ZoneLightID: 11, PositionX: 16934.291, PositionY: 11115.1641, PointOrder: 3 },
            425: { ZoneLightID: 11, PositionX: 16796.9824, PositionY: 11101.6025, PointOrder: 4 },
            426: { ZoneLightID: 11, PositionX: 16725.4727, PositionY: 10961.0566, PointOrder: 5 },
            427: { ZoneLightID: 11, PositionX: 16599.8984, PositionY: 10961.0654, PointOrder: 6 },
            428: { ZoneLightID: 11, PositionX: 16490.4863, PositionY: 10830.627, PointOrder: 7 },
            429: { ZoneLightID: 11, PositionX: 16270.7861, PositionY: 10831.8975, PointOrder: 8 },
            430: { ZoneLightID: 11, PositionX: 16268.2422, PositionY: 10736.29, PointOrder: 9 },
            431: { ZoneLightID: 11, PositionX: 16165.2393, PositionY: 10745.47, PointOrder: 10 },
            432: { ZoneLightID: 11, PositionX: 15933.999, PositionY: 10904.7861, PointOrder: 11 },
            433: { ZoneLightID: 11, PositionX: 15777.1992, PositionY: 10935.6406, PointOrder: 12 },
            434: { ZoneLightID: 11, PositionX: 15713.707, PositionY: 11068.3975, PointOrder: 13 },
            435: { ZoneLightID: 11, PositionX: 15642.1338, PositionY: 11164.2129, PointOrder: 14 },
            436: { ZoneLightID: 11, PositionX: 15649.0605, PositionY: 11363.9238, PointOrder: 15 },
            437: { ZoneLightID: 11, PositionX: 15723.918, PositionY: 11482.8613, PointOrder: 16 },
            438: { ZoneLightID: 11, PositionX: 15726.9736, PositionY: 11486.2168, PointOrder: 17 },
            439: { ZoneLightID: 11, PositionX: 15792.2061, PositionY: 11557.8633, PointOrder: 18 },
            440: { ZoneLightID: 11, PositionX: 15867.2422, PositionY: 11589.0322, PointOrder: 19 },
            441: { ZoneLightID: 11, PositionX: 15991.918, PositionY: 11640.98, PointOrder: 20 },
            442: { ZoneLightID: 11, PositionX: 15995.3809, PositionY: 11703.3174, PointOrder: 21 },
            443: { ZoneLightID: 11, PositionX: 16138.5264, PositionY: 11927.2715, PointOrder: 22 },
            444: { ZoneLightID: 11, PositionX: 16304.7607, PositionY: 11987.3008, PointOrder: 23 },
            445: { ZoneLightID: 11, PositionX: 16521.7871, PositionY: 11987.3008, PointOrder: 24 },
            446: { ZoneLightID: 11, PositionX: 16604.9043, PositionY: 11858.0078, PointOrder: 25 },
            447: { ZoneLightID: 11, PositionX: 16988.166, PositionY: 11876.4775, PointOrder: 26 },
            448: { ZoneLightID: 11, PositionX: 17283.6914, PositionY: 12042.7119, PointOrder: 27 },
            449: { ZoneLightID: 11, PositionX: 17283.6914, PositionY: 12042.7119, PointOrder: 28 },
            450: { ZoneLightID: 11, PositionX: 17500.7188, PositionY: 12213.5635, PointOrder: 29 },
            451: { ZoneLightID: 11, PositionX: 18017.89, PositionY: 12227.416, PointOrder: 30 },
            452: { ZoneLightID: 11, PositionX: 18165.6543, PositionY: 12028.8584, PointOrder: 31 },
            453: { ZoneLightID: 11, PositionX: 18170.2715, PositionY: 11784.126, PointOrder: 32 },
            454: { ZoneLightID: 11, PositionX: 18267.2422, PositionY: 11664.0684, PointOrder: 33 },
            455: { ZoneLightID: 11, PositionX: 18267.2422, PositionY: 11571.7158, PointOrder: 34 },
            456: { ZoneLightID: 11, PositionX: 18299.5645, PositionY: 11530.1572, PointOrder: 35 },
            457: { ZoneLightID: 11, PositionX: 18294.9473, PositionY: 11354.6885, PointOrder: 36 },
            458: { ZoneLightID: 11, PositionX: 18264.2578, PositionY: 11306.32, PointOrder: 37 },
            459: { ZoneLightID: 11, PositionX: 18137.9883, PositionY: 11304.1836, PointOrder: 38 },
            460: { ZoneLightID: 11, PositionX: 18065.86, PositionY: 11350.7363, PointOrder: 39 },
            461: { ZoneLightID: 11, PositionX: 17966.2734, PositionY: 11392.0225, PointOrder: 40 },
            462: { ZoneLightID: 11, PositionX: 17367.68, PositionY: 11389.3525, PointOrder: 41 },
        }
    }*/
}

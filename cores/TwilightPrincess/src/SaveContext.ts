
import { JSONTemplate } from "modloader64_api/JSONTemplate";
import * as API from '../API/Imports';
import * as CORE from './Imports';
import { Inventory } from './Inventory';
import IMemory from "modloader64_api/IMemory";
import { QuestStatus } from "./QuestStatus";
import { IModLoaderAPI, ILogger } from "modloader64_api/IModLoaderAPI";
import { ITPCore } from "../API/Imports";
import { SwordsEquipment } from "./SwordsEquipment";
import { ShieldsEquipment } from "./ShieldsEquipment";

export class SaveContext extends JSONTemplate implements API.ISaveContext {
    private emulator: IMemory;
    private core: ITPCore;
    private dSv_info_c = 0x804061C0;
    private eventFlagAddr = this.dSv_info_c + 0x7F0; //0x804069B0
    private regionFlagAddr = this.dSv_info_c + 0x1F0; //0x804063B0;
    private liveFlagAddr = this.dSv_info_c + 0x958; //0x80406B18; 
    inventory: Inventory;
    questStatus: QuestStatus;
    swords: SwordsEquipment;
    shields: ShieldsEquipment;

    jsonFields: string[] = [
        "inventory",
        'questStatus',
        "swords",
        "shields",
        "eventFlags",
        "regionFlags",
        "liveFlags",
    ];

    constructor(emu: IMemory, core: ITPCore) {
        super();
        this.emulator = emu;
        this.core = core;
        this.inventory = new CORE.Inventory(emu);
        this.questStatus = new CORE.QuestStatus(emu, core);
        this.swords = new SwordsEquipment(emu, core);
        this.shields = new ShieldsEquipment(emu, core);
    }

    get eventFlags(): Buffer {
        return this.emulator.rdramReadBuffer(this.eventFlagAddr, 0x100);
    }

    set eventFlags(flag: Buffer) {
        this.emulator.rdramWriteBuffer(this.eventFlagAddr, flag);
    }

    get regionFlags(): Buffer {
        return this.emulator.rdramReadBuffer(this.regionFlagAddr, 0x400);
    }

    set regionFlags(flag: Buffer) {
        this.emulator.rdramWriteBuffer(this.regionFlagAddr, flag);
    }

    get liveFlags(): Buffer {
        return this.emulator.rdramReadBuffer(this.liveFlagAddr, 0x20);
    }

    set liveFlags(flag: Buffer) {
        this.emulator.rdramWriteBuffer(this.liveFlagAddr, flag);
    }

}
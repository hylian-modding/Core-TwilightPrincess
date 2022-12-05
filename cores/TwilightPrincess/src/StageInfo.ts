
import { JSONTemplate } from "modloader64_api/JSONTemplate";
import * as API from '../API/Imports';
import * as CORE from './Imports';
import IMemory from "modloader64_api/IMemory";
import { IModLoaderAPI, ILogger } from "modloader64_api/IModLoaderAPI";
import { IStageInfo, ITPCore } from "../API/Imports";

export class StageInfo extends JSONTemplate implements IStageInfo {
    private emulator: IMemory;
    private core: ITPCore;
    private dSv_info_c = 0x804061C0;
    private stageInfoAddr = this.dSv_info_c + 0x1F0;
    private stageID: number;

    jsonFields: string[] = [
        "chests",
        "switches",
        "items",
        "rooms",
        "keys",
        "dungeonItem"
    ];

    constructor(emu: IMemory, core: ITPCore, stageID: number, instance?: number) {
        super();
        this.emulator = emu;
        this.core = core;
        this.stageID = stageID;
        if (instance !== undefined) {
            this.stageInfoAddr = instance;
        }
    }

    get chests(): Buffer {
        return this.emulator.rdramReadBuffer(this.stageInfoAddr + (0x20 * this.stageID), 0x8);
    }
    set chests(flag: Buffer) {
        this.emulator.rdramWriteBuffer(this.stageInfoAddr + (0x20 * this.stageID), flag);
    }

    get switches(): Buffer {
        return this.emulator.rdramReadBuffer(this.stageInfoAddr + (0x20 * this.stageID) + 0x8, 0x10);
    }
    set switches(flag: Buffer) {
        this.emulator.rdramWriteBuffer(this.stageInfoAddr + (0x20 * this.stageID) + 0x8, flag);
    }

    get items(): Buffer {
        return this.emulator.rdramReadBuffer(this.stageInfoAddr + (0x20 * this.stageID) + 0x18, 0x4);
    }
    set items(flag: Buffer) {
        this.emulator.rdramWriteBuffer(this.stageInfoAddr + (0x20 * this.stageID) + 0x18, flag);
    }

    get keys(): number {
        return this.emulator.rdramRead8(this.stageInfoAddr + (0x20 * this.stageID) + 0x1C);
    }
    set keys(flag: number) {
        this.emulator.rdramWrite8(this.stageInfoAddr + (0x20 * this.stageID) + 0x1C, flag);
    }

    get dungeonItem(): number {
        let bit = this.emulator.rdramRead8(this.stageInfoAddr + (0x20 * this.stageID) + 0x1D);
        return bit;
    }
    set dungeonItem(flag: number) {
        this.emulator.rdramWrite8(this.stageInfoAddr + (0x20 * this.stageID) + 0x1D, flag);
    }
}

import { JSONTemplate } from "modloader64_api/JSONTemplate";
import * as API from '../API/Imports';
import { Inventory } from './Inventory';
import { SaveContext } from './SaveContext';
import IMemory from "modloader64_api/IMemory";
import { IModLoaderAPI, ILogger } from "modloader64_api/IModLoaderAPI";
import { Flag, FlagManager } from "modloader64_api/FlagManager";
import { ShieldsEquipment } from "./ShieldsEquipment";
import { SwordsEquipment } from "./SwordsEquipment";
import { ITPCore } from "../API/Imports";

export const enum ShieldBitMap {
    HEROES = 0,
    MIRROR = 1
}
export const enum SwordBitMap {
    HerosSword = 0,
    MasterSword = 1,
    MasterSwordHalf = 2,
    MasterSwordFull = 3,
}

export class QuestStatus extends JSONTemplate implements API.IQuestStatus {
    private emulator: IMemory;

    constructor(emu: IMemory, core: ITPCore) {
        super();
        this.emulator = emu;
    }

    jsonFields: string[] = [

    ];

    get max_hp(): number {
        return this.emulator.rdramRead8(0x804061C1);
    }
    set max_hp(flag: number) {
        this.emulator.rdramWrite8(0x804061C1, flag);
    }

    get current_hp(): number {
        return this.emulator.rdramRead8(0x804061C3);
    }
    set current_hp(flag: number) {
        this.emulator.rdramWrite8(0x804061C3, flag);
    }

    get swordEquip(): number {
        return this.emulator.rdramRead8(0x804061D4);
    }

    set swordEquip(flag: number) {
        this.emulator.rdramWrite8(0x804061D4, flag);
    }

    get shieldEquip(): number {
        return this.emulator.rdramRead8(0x804061D5);
    }

    set shieldEquip(flag: number) {
        this.emulator.rdramWrite8(0x804061D5, flag);
    }

    get clothing(): number {
        return this.emulator.rdramRead8(0x804061D3);
    }
    set clothing(flag: number) {
        this.emulator.rdramWrite8(0x804061D3, flag);
    }

    get form(): number {
        return this.emulator.rdramRead8(0x804061DE);
    }
    set form(flag: number) {
        this.emulator.rdramWrite8(0x804061DE, flag);
    }

    get rupees(): number {
        return this.emulator.rdramRead16(0x804061C4);
    }
    set rupees(flag: number) {
        this.emulator.rdramWrite16(0x804061C4, flag);
    }

    get currentWallet(): number {
        return this.emulator.rdramRead8(0x804061D9);
    }
    set currentWallet(flag: number) {
        this.emulator.rdramWrite8(0x804061D9, flag);
    }

    get heroArmor(): boolean {
        let bits = this.emulator.rdramReadBit8(0x80406292, 0);
        return bits[0];
    }
    set heroArmor(flag: boolean) {
        this.emulator.rdramWriteBit8(0x80406292, 0, flag);
    }

    get zoraArmor(): boolean {
        return this.emulator.rdramReadBit8(0x80406291, 6);
    }
    set zoraArmor(flag: boolean) {
        this.emulator.rdramWriteBit8(0x80406291, 6, flag);
    }

    get magicArmor(): boolean {
        let bits = this.emulator.rdramReadBit8(0x80406291, 7);
        return bits[7];
    }
    set magicArmor(flag: boolean) {
        this.emulator.rdramWriteBit8(0x80406291, 7, flag);
    }

    get goldenBugs(): Buffer {
        return this.emulator.rdramReadBuffer(0x804062A5, 0x3)
    }
    set goldenBugs(flag: Buffer) {
        this.emulator.rdramWriteBuffer(0x804062A5, flag);
    }

    get hiddenSkills(): number {
        return this.emulator.rdramRead16(0x804069D9);
    }
    set hiddenSkills(flag: number) {
        this.emulator.rdramWrite16(0x804069D9, flag);
    }

    get poeCount(): number {
        return this.emulator.rdramRead8(0x804062CC);
    }
    set poeCount(flag: number) {
        this.emulator.rdramWrite8(0x804062CC, flag);
    }

    get scent(): number {
        return this.emulator.rdramRead8(0x804061D6);
    }
    set scent(flag: number) {
        this.emulator.rdramWrite8(0x804061D6, flag);
    }
}

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
        "max_hp",
        "currentWallet",
        "ordonSword",
        "masterSword",
        "ordonShield",
        "woodenShield",
        "hylianShield",
        "heroArmor",
        "zoraArmor",
        "magicArmor",
        "goldenBugs",
        "hiddenSkills",
        "poeCount",
        "scent",
        "wooden_sword",
        "dominion_flag",
        "fusedShadow1",
        "fusedShadow2",
        "fusedShadow3",
        "mirrorShard1",
        "mirrorShard2",
        "mirrorShard3",
        "mirrorShard4",
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

    get ordonSword(): boolean {
        return this.emulator.rdramReadBit8(0x80406292, 7);
    }
    set ordonSword(flag: boolean) {
        this.emulator.rdramWriteBit8(0x80406292, 7, flag);
    }

    get masterSword(): boolean {
        return this.emulator.rdramReadBit8(0x80406292, 6);
    }
    set masterSword(flag: boolean) {
        this.emulator.rdramWriteBit8(0x80406292, 6, flag);
    }

    get masterSwordTwilightFlag(): boolean {
        return this.emulator.rdramReadBit8(0x80406296, 1);
    }
    set masterSwordTwilightFlag(flag: boolean){
        this.emulator.rdramWriteBit8(0x80406296, 1, flag);
    }

    get ordonShield(): boolean {
        return this.emulator.rdramReadBit8(0x80406292, 5);
    }
    set ordonShield(flag: boolean) {
        this.emulator.rdramWriteBit8(0x80406292, 5, flag);
    }

    get woodenShield(): boolean {
        return this.emulator.rdramReadBit8(0x80406292, 4);
    }
    set woodenShield(flag: boolean) {
        this.emulator.rdramWriteBit8(0x80406292, 4, flag);
    }

    get hylianShield(): boolean {
        return this.emulator.rdramReadBit8(0x80406292, 3);
    }
    set hylianShield(flag: boolean) {
        this.emulator.rdramWriteBit8(0x80406292, 3, flag);
    }

    get heroArmor(): boolean {
        return this.emulator.rdramReadBit8(0x80406292, 0);
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
        return this.emulator.rdramReadBit8(0x80406291, 7);
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

    get wooden_sword(): number {
        return this.emulator.rdramRead8(0x80406290);
    }
    set wooden_sword(flag: number) {
        this.emulator.rdramWrite8(0x80406290, flag);
    }

    get dominion_flag(): number {
        return this.emulator.rdramRead8(0x804069D5);
    }
    set dominion_flag(flag: number) {
        this.emulator.rdramWrite8(0x804069D5, flag);
    }

    get fusedShadow1(): boolean {
        return this.emulator.rdramReadBit8(0x804062C9, 7);
    }
    set fusedShadow1(flag: boolean) {
        this.emulator.rdramWriteBit8(0x804062C9, 7, flag);
    }
    get fusedShadow2(): boolean {
        return this.emulator.rdramReadBit8(0x804062C9, 6);
    }
    set fusedShadow2(flag: boolean) {
        this.emulator.rdramWriteBit8(0x804062C9, 6, flag);
    }
    get fusedShadow3(): boolean {
        return this.emulator.rdramReadBit8(0x804062C9, 5);
    }
    set fusedShadow3(flag: boolean) {
        this.emulator.rdramWriteBit8(0x804062C9, 5, flag);
    }

    get mirrorShard1(): boolean {
        return this.emulator.rdramReadBit8(0x804062CA, 7);
    }
    set mirrorShard1(flag: boolean) {
        this.emulator.rdramWriteBit8(0x804062CA, 7, flag);
    }
    get mirrorShard2(): boolean {
        return this.emulator.rdramReadBit8(0x804062CA, 6);
    }
    set mirrorShard2(flag: boolean) {
        this.emulator.rdramWriteBit8(0x804062CA, 6, flag);
    }
    get mirrorShard3(): boolean {
        return this.emulator.rdramReadBit8(0x804062CA, 5);
    }
    set mirrorShard3(flag: boolean) {
        this.emulator.rdramWriteBit8(0x804062CA, 5, flag);
    }
    get mirrorShard4(): boolean {
        return this.emulator.rdramReadBit8(0x804062CA, 4);
    }
    set mirrorShard4(flag: boolean) {
        this.emulator.rdramWriteBit8(0x804062CA, 4, flag);
    }
}
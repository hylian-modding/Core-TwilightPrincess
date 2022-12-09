
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
import { StageInfo } from "./StageInfo";

export class SaveContext extends JSONTemplate implements API.ISaveContext {
    private emulator: IMemory;
    private core: ITPCore;
    private dSv_info_c = 0x804061C0;
    private eventFlagAddr = this.dSv_info_c + 0x7F0; //0x804069B0
    private regionFlagAddr = this.dSv_info_c + 0x1F0; //0x804063B0;
    private liveFlagAddr = this.dSv_info_c + 0x958; //0x80406B18; 
    inventory: Inventory;
    questStatus: QuestStatus;

    stage_Live: StageInfo;
    stage0_Ordon: StageInfo;
    stage1_Sewers: StageInfo;
    stage2_Faron: StageInfo;
    stage3_Eldin: StageInfo;
    stage4_Laynaru: StageInfo;
    stage5_Unk1: StageInfo;
    stage6_CastleField: StageInfo;
    stage7_SacredGrove: StageInfo;
    stage8_Snowpeak: StageInfo;
    stage9_CastleTown: StageInfo;
    stageA_Gerudo: StageInfo;
    stageB_FishingHole: StageInfo;
    stageC_Unk2: StageInfo;
    stageD_Unk3: StageInfo;
    stageE_Unk4: StageInfo;
    stageF_Unk5: StageInfo;
    stage10_ForestTemple: StageInfo;
    stage11_GoronMines: StageInfo;
    stage12_LakebedTemple: StageInfo;
    stage13_ArbitersGrounds: StageInfo;
    stage14_SnowpeakRuins: StageInfo;
    stage15_TempleOfTime: StageInfo;
    stage16_CitySky: StageInfo;
    stage17_PalaceTwilight: StageInfo;
    stage18_HyruleCastle: StageInfo;
    stage19_Cave1: StageInfo;
    stage1A_Cave2: StageInfo;
    stage1B_Grottos: StageInfo;
    stage1C_Unk6: StageInfo;
    stage1D_Unk7: StageInfo;
    stage1E_Unk8: StageInfo;
    stage1F_Unk9: StageInfo;

    jsonFields: string[] = [
        "inventory",
        'questStatus',
        "eventFlags",
        "charloDonation",
        "maloDonation",
        "mapFlags",
        "itemFlags",
        "faronTears",
        "eldinTears",
        "lanayruTears",
        "fusedShadowFlags",
        "twilightMirrorFlags",
        "letterFlags",
        "stage_Live",
        "stage0_Ordon",
        "stage1_Sewers",
        "stage2_Faron",
        "stage3_Eldin",
        "stage4_Laynaru",
        "stage5_Unk1",
        "stage6_CastleField",
        "stage7_SacredGrove",
        "stage8_Snowpeak",
        "stage9_CastleTown",
        "stageA_Gerudo",
        "stageB_FishingHole",
        "stageC_Unk2",
        "stageD_Unk3",
        "stageE_Unk4",
        "stageF_Unk5",
        "stage10_ForestTemple",
        "stage11_GoronMines",
        "stage12_LakebedTemple",
        "stage13_ArbitersGrounds",
        "stage14_SnowpeakRuins",
        "stage15_TempleOfTime",
        "stage16_CitySky",
        "stage17_PalaceTwilight",
        "stage18_HyruleCastle",
        "stage19_Cave1",
        "stage1A_Cave2",
        "stage1B_Grottos",
        "stage1C_Unk6",
        "stage1D_Unk7",
        "stage1E_Unk8",
        "stage1F_Unk9",
    ];

    constructor(emu: IMemory, core: ITPCore) {
        super();
        this.emulator = emu;
        this.core = core;
        this.inventory = new CORE.Inventory(emu);
        this.questStatus = new CORE.QuestStatus(emu, core);

        this.stage_Live = new StageInfo(emu, core, 0x0, 0x80406B18);
        this.stage0_Ordon = new StageInfo(emu, core, 0x0);
        this.stage1_Sewers = new StageInfo(emu, core, 0x1);
        this.stage2_Faron = new StageInfo(emu, core, 0x2);
        this.stage3_Eldin = new StageInfo(emu, core, 0x3);
        this.stage4_Laynaru = new StageInfo(emu, core, 0x4);
        this.stage5_Unk1 = new StageInfo(emu, core, 0x5);
        this.stage6_CastleField = new StageInfo(emu, core, 0x6);
        this.stage7_SacredGrove = new StageInfo(emu, core, 0x7);
        this.stage8_Snowpeak = new StageInfo(emu, core, 0x8);
        this.stage9_CastleTown = new StageInfo(emu, core, 0x9);
        this.stageA_Gerudo = new StageInfo(emu, core, 0xA);
        this.stageB_FishingHole = new StageInfo(emu, core, 0xB);
        this.stageC_Unk2 = new StageInfo(emu, core, 0xC);
        this.stageD_Unk3 = new StageInfo(emu, core, 0xD);
        this.stageE_Unk4 = new StageInfo(emu, core, 0xE);
        this.stageF_Unk5 = new StageInfo(emu, core, 0xF);
        this.stage10_ForestTemple = new StageInfo(emu, core, 0x10);
        this.stage11_GoronMines = new StageInfo(emu, core, 0x11);
        this.stage12_LakebedTemple = new StageInfo(emu, core, 0x12);
        this.stage13_ArbitersGrounds = new StageInfo(emu, core, 0x13);
        this.stage14_SnowpeakRuins = new StageInfo(emu, core, 0x14);
        this.stage15_TempleOfTime = new StageInfo(emu, core, 0x15);
        this.stage16_CitySky = new StageInfo(emu, core, 0x16);
        this.stage17_PalaceTwilight = new StageInfo(emu, core, 0x17);
        this.stage18_HyruleCastle = new StageInfo(emu, core, 0x18);
        this.stage19_Cave1 = new StageInfo(emu, core, 0x19);
        this.stage1A_Cave2 = new StageInfo(emu, core, 0x1A);
        this.stage1B_Grottos = new StageInfo(emu, core, 0x1B);
        this.stage1C_Unk6 = new StageInfo(emu, core, 0x1C);
        this.stage1D_Unk7 = new StageInfo(emu, core, 0x1D);
        this.stage1E_Unk8 = new StageInfo(emu, core, 0x1E);
        this.stage1F_Unk9 = new StageInfo(emu, core, 0x1F);
    }

    get eventFlags(): Buffer {
        return this.emulator.rdramReadBuffer(this.eventFlagAddr, 0xF0); // Bytes 0xF1 - 0x100 aren't bitfields..?
    }
    set eventFlags(flag: Buffer) {
        this.emulator.rdramWriteBuffer(this.eventFlagAddr, flag);
    }

    get mapFlags(): Buffer {
        return this.emulator.rdramReadBuffer(0x804067B0, 0x200);
    }
    set mapFlags(flag: Buffer){
        this.emulator.rdramWriteBuffer(0x804067B0, flag);
    }

    get itemFlags(): Buffer {
        return this.emulator.rdramReadBuffer(0x8040628C, 0x20);
    }
    set itemFlags(flag: Buffer){
        this.emulator.rdramWriteBuffer(0x8040628C, flag);
    }

    get faronTears(): number {
        return this.emulator.rdramRead8(0x804062D4);
    }
    set faronTears(flag: number) {
        this.emulator.rdramWrite8(0x804062D4, flag);
    }

    get eldinTears(): number {
        return this.emulator.rdramRead8(0x804062D5);
    }
    set eldinTears(flag: number) {
        this.emulator.rdramWrite8(0x804062D5, flag);
    }

    get lanayruTears(): number {
        return this.emulator.rdramRead8(0x804062D6);
    }
    set lanayruTears(flag: number) {
        this.emulator.rdramWrite8(0x804062D6, flag);
    }

    get fusedShadowFlags(): Buffer {
        return this.emulator.rdramReadBuffer(0x804062C9, 0x1);
    } 
    set fusedShadowFlags(flag: Buffer) {
        this.emulator.rdramWriteBuffer(0x804062C9, flag);
    }

    get twilightMirrorFlags(): Buffer {
        return this.emulator.rdramReadBuffer(0x804062CA, 0x1);
    } 
    set twilightMirrorFlags(flag: Buffer) {
        this.emulator.rdramWriteBuffer(0x804062CA, flag);
    }

    get letterFlags(): Buffer {
        return this.emulator.rdramReadBuffer(0x804062DC, 0x50);
    }
    set letterFlags(flag: Buffer) {
        this.emulator.rdramWriteBuffer(0x804062DC, flag);
    }

    get charloDonation(): number {
        return this.emulator.rdramRead16(0x80406AA7);
    }
    set charloDonation(flag: number) {
        this.emulator.rdramWrite16(0x80406AA7, flag);
    }

    get maloDonation(): number {
        return this.emulator.rdramRead16(0x80406AA9);
    }
    set maloDonation(flag: number) {
        this.emulator.rdramWrite16(0x80406AA9, flag);
    }
}
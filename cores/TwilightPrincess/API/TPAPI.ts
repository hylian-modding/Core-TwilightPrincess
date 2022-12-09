import { Heap } from 'modloader64_api/heap';
import { ICore } from 'modloader64_api/IModLoaderAPI';
import { IPacketHeader } from 'modloader64_api/NetworkHandler';

export interface IStageInfo {
    chests: Buffer;
    switches: Buffer;
    items: Buffer;
    keys: number;
    dungeonItem: Buffer;
}

export const enum Sword {
    NONE = 0,
    Ordon = 1,
    Master = 2
}

export interface ISwords {
    swordLevel: Sword;
}

export const enum Shield {
    NONE = 0,
    Ordon = 1,
    Wooden = 2,
    Hylian = 3
}

export interface IShields {
    shieldLevel: Shield;
}

export const enum Wallet {
    NONE = 0,
    Small = 1,
    Big = 2,
    Giant = 3,
}
export interface IInventory extends IInventoryFields {
    getItem(item: InventorySlotItems): InventorySlotItems;
    addItemSlot(item: number): void;
}

export enum InventoryItem {
    galeBoomerang = 64,
    lantern = 72,
    spinner = 65,
    ironBoots = 69,
    bow = 67,
    hawkeye = 62,
    ballAndChain = 66,
    dominionRod = 70,
    clawshot = 68,
    doubleClawshot = 71,
    slingshot = 75,
    bottle_empty = 96,
    bombEmpty = 80,
    bombNormal = 112,
    bombWater = 113,
    bombBug = 114,
    ooccoo = 37,
    ooccooJr = 39,
    oocooNote = 45,
    asheiSketch = 145,
    fishingRod = 74,
    fishingRodEaring = 92,
    fishingRodEaringWorm = 95,
    coralEaring = 61,

    ronadoLetter = 128,
    invoice = 129,
    woodenSatue = 130,
    lilaCharm = 131,
    horseCall = 132,
    auroMemo = 144,
    skyBook = 233,
    skyBookFilled = 235,

    RedPotion = 97,
    MagicPotion = 98,
    BluePotion = 99,
    Milk = 100,
    MilkHalf = 101,
    LanternOil = 102,
    Water = 103,
    LanternOil2 = 104,
    RedPotion2 = 105,
    NastySoup = 106,
    HotSpringwater = 107,
    Fairy = 108,
    HotSpringwater2 = 109,
    LaternOil = 110,
    LaternOil2 = 111,
    FairysTears = 115,
    Worm = 116,
    GreatFairysTears = 117,
    BeeLarva = 118,
    RareChuJelly = 119,
    RedChuJelly = 120,
    BlueChuJelly = 121,
    GreenChuJelly = 122,
    YellowChuJelly = 123,
    PurpleChuJelly = 124,
    SimpleSoup = 125,
    GoodSoup = 126,
    SuperbSoup = 127,

    NONE = 0xFF,
}

export interface IInventoryFields {
    galeBoomerang: boolean;
    lantern: boolean;
    spinner: boolean;
    ironBoots: boolean;
    bow: boolean;
    hawkeye: boolean;
    ballAndChain: boolean;
    dominionRod: boolean;
    clawshot: InventoryItem;
    slingshot: boolean;
    bottle1: InventoryItem;
    bottle2: InventoryItem;
    bottle3: InventoryItem;
    bottle4: InventoryItem;
    bombBag1: InventoryItem;
    bombBag2: InventoryItem;
    bombBag3: InventoryItem;
    ooccoo: InventoryItem;
    questItem: InventoryItem;
    fishingRod: InventoryItem;
    horseCall: boolean;
    skyBook: InventoryItem;
    dekuSeeds: number;
    arrows: number;
    bombs1: number;
    bombs2: number;
    bombs3: number;
}

export const enum InventorySlots {
    SLOT_0,
    SLOT_1,
    SLOT_2,
    SLOT_3,
    SLOT_4,
    SLOT_5,
    SLOT_6,
    SLOT_7,
    SLOT_8,
    SLOT_9,
    SLOT_10,
    SLOT_11,
    SLOT_12,
    SLOT_13,
    SLOT_14,
    SLOT_15,
    SLOT_16,
    SLOT_17,
    SLOT_18,
    SLOT_19,
    SLOT_20,
    SLOT_21,
    SLOT_22,
    SLOT_23,
    SLOT_24
}

export const enum InventorySlotItems {
    galeBoomerang = 0,
    lantern = 1,
    spinner = 2,
    ironBoots = 3,
    bow = 4,
    hawkeye = 5,
    ballAndChain = 6,
    unknown0 = 7,
    dominionRod = 8,
    clawshot = 9,
    dblClawshot = 10,
    bottle1 = 11,
    bottle2 = 12,
    bottle3 = 13,
    bottle4 = 14,
    bombs1 = 15,
    bombs2 = 16,
    bombs3 = 17,
    ooccoo = 18,
    questItem = 19,
    fishingRod = 20,
    horseCall = 21,
    skyBook = 22,
    slingshot = 23,
    NONE = 0xFF
}
export interface IQuestStatus {
    max_hp: number;
    current_hp: number;
    swordEquip: number;
    shieldEquip: number;
    clothing: number;
    form: number;
    rupees: number;
    currentWallet: number;
    ordonSword: boolean;
    masterSword: boolean;
    ordonShield: boolean;
    woodenShield: boolean;
    hylianShield: boolean;
    heroArmor: boolean;
    zoraArmor: boolean;
    magicArmor: boolean;
    goldenBugs: Buffer;
    hiddenSkills: number;
    poeCount: number;
    scent: number;
    wooden_sword: number;
    dominion_flag: number;
    fusedShadow1: boolean;
    fusedShadow2: boolean;
    fusedShadow3: boolean;
    mirrorShard1: boolean;
    mirrorShard2: boolean;
    mirrorShard3: boolean;
    mirrorShard4: boolean;
}

export interface IGlobalContext {
    current_stage_id: number;
    current_scene_frame: number;
    current_scene_name: string;
    current_room_number: number;
    prev_room_number: number;
    next_scene_name: string;
    next_room_number: number;
    linkPointer: number;
    time: number;
    getSaveDataForCurrentScene(): Buffer;
    writeSaveDataForCurrentScene(buf: Buffer): void;
}

export interface ISaveContext {
    inventory: IInventory;
    questStatus: IQuestStatus;
    eventFlags: Buffer;
    charloDonation: number;
    maloDonation: number;
    mapFlags: Buffer;
    itemFlags: Buffer;
    faronTears: number;
    eldinTears: number;
    lanayruTears: number;
    fusedShadowFlags: Buffer;
    twilightMirrorFlags: Buffer;
    letterFlags: Buffer;
    stage_Live: IStageInfo;
    stage0_Ordon: IStageInfo;
    stage1_Sewers: IStageInfo;
    stage2_Faron: IStageInfo;
    stage3_Eldin: IStageInfo;
    stage4_Laynaru: IStageInfo;
    stage5_Unk1: IStageInfo;
    stage6_CastleField: IStageInfo;
    stage7_SacredGrove: IStageInfo;
    stage8_Snowpeak: IStageInfo;
    stage9_CastleTown: IStageInfo;
    stageA_Gerudo: IStageInfo;
    stageB_FishingHole: IStageInfo;
    stageC_Unk2: IStageInfo;
    stageD_Unk3: IStageInfo;
    stageE_Unk4: IStageInfo;
    stageF_Unk5: IStageInfo;
    stage10_ForestTemple: IStageInfo;
    stage11_GoronMines: IStageInfo;
    stage12_LakebedTemple: IStageInfo;
    stage13_ArbitersGrounds: IStageInfo
    stage14_SnowpeakRuins: IStageInfo;
    stage15_TempleOfTime: IStageInfo;
    stage16_CitySky: IStageInfo;
    stage17_PalaceTwilight: IStageInfo;
    stage18_HyruleCastle: IStageInfo;
    stage19_Cave1: IStageInfo;
    stage1A_Cave2: IStageInfo;
    stage1B_Grottos: IStageInfo;
    stage1C_Unk6: IStageInfo;
    stage1D_Unk7: IStageInfo;
    stage1E_Unk8: IStageInfo;
    stage1F_Unk9: IStageInfo;
}

export interface ILink {
    pos: Buffer;
    rot: number;
    speed: number;
}

export interface ITPHelper {
    isLoadingZone(): boolean;
    isLinkExists(): boolean;
    isTitleScreen(): boolean;
    isSceneNameValid(): boolean;
    isLinkControllable(): boolean;
    isPaused(): boolean;
    isSceneChange(): boolean;
}

export enum TPEvents {
    ON_SAVE_LOADED = 'onSaveLoaded',
    ON_SCENE_CHANGE = 'onSceneChange',
    ON_ROOM_CHANGE = 'onRoomChange',
    ON_LOADING_ZONE = 'onLoadingZone',
}

export interface ITPCore extends ICore {
    heap?: Heap;
    global: IGlobalContext;
    link: ILink;
    save: ISaveContext;
    helper: ITPHelper;
}
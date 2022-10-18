import IMemory from 'modloader64_api/IMemory';
import * as API from '../API/Imports';
import { FlagManager } from 'modloader64_api/FlagManager';
import { JSONTemplate } from 'modloader64_api/JSONTemplate';
import { ILogger } from 'modloader64_api/IModLoaderAPI';
import { NONAME } from 'dns';
import { IInventoryFields, InventoryItem, InventorySlotItems, InventorySlots } from '../API/Imports';

export class Inventory extends JSONTemplate implements API.IInventory {
    private emulator: IMemory;
    private instance: number = 0x8040625C;
    private slotInstance: number = 0x80406274;

    private bottleID =
        [
            API.InventoryItem.bottle_empty,
            API.InventoryItem.RedPotion, API.InventoryItem.MagicPotion, API.InventoryItem.BluePotion, API.InventoryItem.Milk,
            API.InventoryItem.MilkHalf, API.InventoryItem.LanternOil, API.InventoryItem.Water, API.InventoryItem.LanternOil2,
            API.InventoryItem.RedPotion2, API.InventoryItem.NastySoup, API.InventoryItem.HotSpringwater, API.InventoryItem.Fairy,
            API.InventoryItem.HotSpringwater2, API.InventoryItem.LaternOil, API.InventoryItem.LaternOil2, API.InventoryItem.FairysTears,
            API.InventoryItem.Worm, API.InventoryItem.GreatFairysTears, API.InventoryItem.BeeLarva, API.InventoryItem.RareChuJelly,
            API.InventoryItem.RedChuJelly, API.InventoryItem.BlueChuJelly, API.InventoryItem.GreenChuJelly, API.InventoryItem.YellowChuJelly,
            API.InventoryItem.PurpleChuJelly, API.InventoryItem.SimpleSoup, API.InventoryItem.GoodSoup, API.InventoryItem.SuperbSoup,
        ]

    private bombID =
        [
            API.InventoryItem.bombNormal,
            API.InventoryItem.bombWater,
            API.InventoryItem.bombBug,
            API.InventoryItem.bombEmpty
        ]
    constructor(emu: IMemory) {
        super();
        this.emulator = emu;
    }



    jsonFields: string[] = [
        'galeBoomerang',
        'lantern',
        'spinner',
        'ironBoots',
        'bow',
        'hawkeye',
        'ballAndChain',
        'dominionRod',
        'clawshot',
        'slingshot',
        'bottle1',
        'bottle2',
        'bottle3',
        'bottle4',
        'bombBag1',
        'bombBag2',
        'bombBag3',
        'fishingRod',
        'horseCall',
        'skyBook',
        'sketch_memo',
        'ooccoo',
        'bombCapacity',
        'quiver',
    ];


    private totalSlots: number = InventorySlots.SLOT_24;

    private get itemSlots(): Buffer {
        return this.emulator.rdramReadBuffer(this.slotInstance, this.totalSlots);
    }

    private set itemSlots(slots: Buffer) {
        this.emulator.rdramWriteBuffer(this.slotInstance, slots)
    }

    getItem(item: API.InventorySlotItems): API.InventorySlotItems {
        return this.itemSlots.indexOf(item) > -1 ? item : 0xFF;
    }

    addItemSlot(item: number) {
        let slots = this.itemSlots;
        if (slots.indexOf(item) > -1) {
            // The item already exists.
        } else {
            // The item does not exist.
            let empty: number = slots.indexOf(0xFF);
            if (empty === -1) {
                // No empty slots. Panic?
            } else {
                slots[empty] = item;
            }
        }
        this.itemSlots = slots;
    }

    //Inventory Items
    get galeBoomerang(): boolean {
        let val = this.getItem(API.InventorySlotItems.galeBoomerang)
        return !(val === API.InventorySlotItems.NONE);
    }
    set galeBoomerang(bool: boolean) {
        let value = bool ? API.InventoryItem.galeBoomerang : API.InventoryItem.NONE;
        this.emulator.rdramWrite8(this.instance, value);
        if (bool) this.addItemSlot(InventorySlotItems.galeBoomerang);
    }

    get lantern(): boolean {
        let val = this.getItem(API.InventorySlotItems.lantern)
        return !(val === API.InventorySlotItems.NONE);
    }
    set lantern(bool: boolean) {
        let value = bool ? API.InventoryItem.lantern : API.InventoryItem.NONE;
        this.emulator.rdramWrite8(this.instance + 1, value);
        if (bool) {
            this.addItemSlot(InventorySlotItems.lantern);
            //Lamp Oil
            this.emulator.rdramWrite16(0x804061C6, 0x5460);
        }
    }

    get spinner(): boolean {
        let val = this.getItem(API.InventorySlotItems.spinner)
        return !(val === API.InventorySlotItems.NONE);
    }
    set spinner(bool: boolean) {
        let value = bool ? API.InventoryItem.spinner : API.InventoryItem.NONE;
        this.emulator.rdramWrite8(this.instance + 2, value);
        if (bool) this.addItemSlot(InventorySlotItems.spinner);
    }

    get ironBoots(): boolean {
        let val = this.getItem(API.InventorySlotItems.ironBoots)
        return !(val === API.InventorySlotItems.NONE);
    }
    set ironBoots(bool: boolean) {
        let value = bool ? API.InventoryItem.ironBoots : API.InventoryItem.NONE;
        this.emulator.rdramWrite8(this.instance + 3, value);
        if (bool) this.addItemSlot(InventorySlotItems.ironBoots);
    }

    get bow(): boolean {
        let val = this.getItem(API.InventorySlotItems.bow)
        return !(val === API.InventorySlotItems.NONE);
    }
    set bow(bool: boolean) {
        let value = bool ? API.InventoryItem.bow : API.InventoryItem.NONE;
        this.emulator.rdramWrite8(this.instance + 4, value);
        if (bool) this.addItemSlot(InventorySlotItems.bow);
        if (this.arrows === 0) this.arrows = this.quiver;
    }

    get hawkeye(): boolean {
        let val = this.getItem(API.InventorySlotItems.hawkeye)
        return !(val === API.InventorySlotItems.NONE);
    }
    set hawkeye(bool: boolean) {
        let value = bool ? API.InventoryItem.hawkeye : API.InventoryItem.NONE;
        this.emulator.rdramWrite8(this.instance + 5, value);
        if (bool) this.addItemSlot(InventorySlotItems.hawkeye);
    }

    get ballAndChain(): boolean {
        let val = this.getItem(API.InventorySlotItems.ballAndChain)
        return !(val === API.InventorySlotItems.NONE);
    }
    set ballAndChain(bool: boolean) {
        let value = bool ? API.InventoryItem.ballAndChain : API.InventoryItem.NONE;
        this.emulator.rdramWrite8(this.instance + 6, value);
        if (bool) this.addItemSlot(InventorySlotItems.ballAndChain);
    }

    get dominionRod(): boolean {
        let val = this.getItem(API.InventorySlotItems.dominionRod)
        return !(val === API.InventorySlotItems.NONE);
    }
    set dominionRod(bool: boolean) {
        let value = bool ? API.InventoryItem.dominionRod : API.InventoryItem.NONE;
        this.emulator.rdramWrite8(this.instance + 8, value);
        if (bool) this.addItemSlot(InventorySlotItems.dominionRod);
    }

    get clawshot(): API.InventoryItem {
        let clawshot = this.emulator.rdramRead8(this.instance + 9)
        let dblClawshot = this.emulator.rdramRead8(this.instance + 10)
        if (dblClawshot === API.InventoryItem.doubleClawshot) return API.InventoryItem.doubleClawshot;
        else if (clawshot === API.InventoryItem.clawshot) return API.InventoryItem.clawshot;
        return API.InventoryItem.NONE;
    }
    set clawshot(item: API.InventoryItem) {
        if (item === API.InventoryItem.doubleClawshot) this.emulator.rdramWrite8(this.instance + 10, item);
        else if (item === API.InventoryItem.clawshot) this.emulator.rdramWrite8(this.instance + 9, item);
        if (item !== API.InventoryItem.NONE) this.addItemSlot(InventorySlotItems.clawshot);
    }

    get bottle1(): API.InventoryItem {
        let bottle = this.emulator.rdramRead8(this.instance + 11)
        if (this.bottleID.includes(bottle)) return bottle;
        return API.InventoryItem.NONE;
    }
    set bottle1(item: API.InventoryItem) {
        if (this.bottleID.includes(item)) this.emulator.rdramWrite8(this.instance + 11, item);
        if (item !== API.InventoryItem.NONE) this.addItemSlot(InventorySlotItems.Bottle1);
    }

    get bottle2(): API.InventoryItem {
        let bottle = this.emulator.rdramRead8(this.instance + 12)
        if (this.bottleID.includes(bottle)) return bottle;
        return API.InventoryItem.NONE;
    }
    set bottle2(item: API.InventoryItem) {
        if (this.bottleID.includes(item)) this.emulator.rdramWrite8(this.instance + 12, item);
        if (item !== API.InventoryItem.NONE) this.addItemSlot(InventorySlotItems.Bottle2);
    }

    get bottle3(): API.InventoryItem {
        let bottle = this.emulator.rdramRead8(this.instance + 13)
        if (this.bottleID.includes(bottle)) return bottle;
        return API.InventoryItem.NONE;
    }
    set bottle3(item: API.InventoryItem) {
        if (this.bottleID.includes(item)) this.emulator.rdramWrite8(this.instance + 13, item);
        if (item !== API.InventoryItem.NONE) this.addItemSlot(InventorySlotItems.Bottle3);
    }

    get bottle4(): API.InventoryItem {
        let bottle = this.emulator.rdramRead8(this.instance + 14)
        if (this.bottleID.includes(bottle)) return bottle;
        return API.InventoryItem.NONE;
    }
    set bottle4(item: API.InventoryItem) {
        if (this.bottleID.includes(item)) this.emulator.rdramWrite8(this.instance + 14, item);
        if (item !== API.InventoryItem.NONE) this.addItemSlot(InventorySlotItems.Bottle4);
    }

    get bombBag1(): API.InventoryItem {
        let bomb = this.emulator.rdramRead8(this.instance + 15)
        if (this.bombID.includes(bomb)) return bomb;
        return API.InventoryItem.NONE;
    }
    set bombBag1(item: API.InventoryItem) {
        if (item === API.InventoryItem.bombNormal || API.InventoryItem.bombWater || API.InventoryItem.bombBug || API.InventoryItem.bombEmpty) {
            this.emulator.rdramWrite8(this.instance + 15, item);
            this.addItemSlot(InventorySlotItems.Bombs1);
            if (this.bombs1 === 0) return;
            switch (item) {
                case InventoryItem.bombNormal:
                    if (!this.bombCapacity) this.bombs1 = 30;
                    else this.bombs1 = 60;
                    break;
                case InventoryItem.bombWater:
                    if (!this.bombCapacity) this.bombs1 = 15;
                    else this.bombs1 = 30;
                    break;
                case InventoryItem.bombBug:
                    if (!this.bombCapacity) this.bombs1 = 10;
                    else this.bombs1 = 20;
                    break;
            }
        }
    }

    get bombBag2(): API.InventoryItem {
        let bomb = this.emulator.rdramRead8(this.instance + 16)
        if (this.bombID.includes(bomb)) return bomb;
        return API.InventoryItem.NONE;
    }
    set bombBag2(item: API.InventoryItem) {
        if (item === API.InventoryItem.bombNormal || API.InventoryItem.bombWater || API.InventoryItem.bombBug || API.InventoryItem.bombEmpty) {
            this.emulator.rdramWrite8(this.instance + 16, item);
            this.addItemSlot(InventorySlotItems.Bombs2);
            if (this.bombs2 === 0) return;
            switch (item) {
                case InventoryItem.bombNormal:
                    if (!this.bombCapacity) this.bombs2 = 30;
                    else this.bombs2 = 60;
                    break;
                case InventoryItem.bombWater:
                    if (!this.bombCapacity) this.bombs2 = 15;
                    else this.bombs2 = 30;
                    break;
                case InventoryItem.bombBug:
                    if (!this.bombCapacity) this.bombs2 = 10;
                    else this.bombs2 = 20;
                    break;
            }
        }
    }

    get bombBag3(): API.InventoryItem {
        let bomb = this.emulator.rdramRead8(this.instance + 17)
        if (this.bombID.includes(bomb)) return bomb;
        return API.InventoryItem.NONE;
    }
    set bombBag3(item: API.InventoryItem) {
        if (item === API.InventoryItem.bombNormal || API.InventoryItem.bombWater || API.InventoryItem.bombBug || API.InventoryItem.bombEmpty) {
            this.emulator.rdramWrite8(this.instance + 17, item);
            this.addItemSlot(InventorySlotItems.Bombs3);
            if (this.bombs3 === 0) return;
            switch (item) {
                case InventoryItem.bombNormal:
                    if (!this.bombCapacity) this.bombs3 = 30;
                    else this.bombs3 = 60;
                    break;
                case InventoryItem.bombWater:
                    if (!this.bombCapacity) this.bombs3 = 15;
                    else this.bombs3 = 30;
                    break;
                case InventoryItem.bombBug:
                    if (!this.bombCapacity) this.bombs3 = 10;
                    else this.bombs3 = 20;
                    break;
            }
        }
    }

    get ooccoo(): API.InventoryItem {
        let item = this.emulator.rdramRead8(this.instance + 18)
        if (item === API.InventoryItem.ooccooJr) return API.InventoryItem.ooccooJr;
        else if (item === API.InventoryItem.ooccoo) return API.InventoryItem.ooccoo;
        return API.InventoryItem.NONE;
    }
    set ooccoo(item: API.InventoryItem) {
        this.emulator.rdramWrite8(this.instance + 18, item);
        if (item !== API.InventoryItem.NONE) this.addItemSlot(InventorySlotItems.ooccoo);
    }

    get sketch_memo(): API.InventoryItem {
        let item = this.emulator.rdramRead8(this.instance + 19)
        if (item === API.InventoryItem.asheiSketch) return API.InventoryItem.asheiSketch;
        else if (item === API.InventoryItem.auroMemo) return API.InventoryItem.auroMemo;
        return API.InventoryItem.NONE;
    }
    set sketch_memo(item: API.InventoryItem) {
        this.emulator.rdramWrite8(this.instance + 19, item);
        if (item !== API.InventoryItem.NONE) this.addItemSlot(InventorySlotItems.sketch_memo);
    }

    get fishingRod(): InventoryItem {
        let item = this.emulator.rdramRead8(this.instance + 20)
        if (item === API.InventoryItem.fishingRodEaringWorm) return API.InventoryItem.fishingRodEaringWorm;
        else if (item === API.InventoryItem.fishingRodEaring) return API.InventoryItem.fishingRodEaring;
        else if (item === API.InventoryItem.fishingRod) return API.InventoryItem.fishingRod;
        return API.InventoryItem.NONE;
    }
    set fishingRod(item: InventoryItem) {
        this.emulator.rdramWrite8(this.instance + 20, item);
        if (item !== API.InventoryItem.NONE) this.addItemSlot(InventorySlotItems.fishingRod);
    }

    get horseCall(): boolean {
        let val = this.getItem(API.InventorySlotItems.horseCall)
        return !(val === API.InventorySlotItems.NONE);
    }
    set horseCall(bool: boolean) {
        let value = bool ? API.InventoryItem.horseCall : API.InventoryItem.NONE;
        this.emulator.rdramWrite8(this.instance + 21, value);
        if (bool) this.addItemSlot(InventorySlotItems.horseCall);
    }

    get skyBook(): InventoryItem {
        let item = this.emulator.rdramRead8(this.instance + 22)
        if (item === API.InventoryItem.skyBookFilled) return API.InventoryItem.skyBookFilled;
        else if (item === API.InventoryItem.skyBook) return API.InventoryItem.skyBook;
        return API.InventoryItem.NONE;
    }
    set skyBook(item: InventoryItem) {
        this.emulator.rdramWrite8(this.instance + 22, item);
        if (item !== API.InventoryItem.NONE) this.addItemSlot(InventorySlotItems.Unknown3); //TODO: test if this works
    }

    get slingshot(): boolean {
        let val = this.getItem(API.InventorySlotItems.slingshot)
        return !(val === API.InventorySlotItems.NONE);
    }
    set slingshot(bool: boolean) {
        let value = bool ? API.InventoryItem.slingshot : API.InventoryItem.NONE;
        this.emulator.rdramWrite8(this.instance + 23, value);
        if (bool) {
            this.addItemSlot(InventorySlotItems.slingshot);
            this.dekuSeeds = 50;
        }
    }

    get quiver(): number {
        return this.emulator.rdramRead8(0x804062B8);
    }
    set quiver(flag: number) {
        this.emulator.rdramWrite8(0x804062B8, flag);
    }

    get bombCapacity(): boolean {
        return this.emulator.rdramReadBit8(0x80406296, 7);
    }
    set bombCapacity(flag: boolean) {
        this.emulator.rdramWriteBit8(0x80406296, 7, flag);
    }

    // Counts
    get dekuSeeds(): number {
        return this.emulator.rdramRead8(0x804062B4);
    }
    set dekuSeeds(flag: number) {
        this.emulator.rdramWrite8(0x804062B4, flag);
    }

    get arrows(): number {
        return this.emulator.rdramRead8(0x804062AC);
    }
    set arrows(flag: number) {
        this.emulator.rdramWrite8(0x804062AC, flag);
    }

    get bombs1(): number {
        return this.emulator.rdramRead8(0x804062AD);
    }
    set bombs1(flag: number) {
        this.emulator.rdramWrite8(0x804062AD, flag);
    }

    get bombs2(): number {
        return this.emulator.rdramRead8(0x804062AE);
    }
    set bombs2(flag: number) {
        this.emulator.rdramWrite8(0x804062AE, flag);
    }

    get bombs3(): number {
        return this.emulator.rdramRead8(0x804062AF);
    }
    set bombs3(flag: number) {
        this.emulator.rdramWrite8(0x804062AF, flag);
    }

}
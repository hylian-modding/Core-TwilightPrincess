import IMemory from 'modloader64_api/IMemory';
import * as API from '../API/Imports';
import { FlagManager } from 'modloader64_api/FlagManager';
import { JSONTemplate } from 'modloader64_api/JSONTemplate';
import { ILogger } from 'modloader64_api/IModLoaderAPI';
import { NONAME } from 'dns';
import { IInventoryFields, InventoryItem } from '../API/Imports';

export class Inventory extends JSONTemplate implements API.IInventory {
    private emulator: IMemory;
    private instance: number = 0x8040625C;
    private slotInstance: number = 0x80406274;

    constructor(emu: IMemory) {
        super();
        this.emulator = emu;
    }

    bottleID = [
        API.InventoryItem.RedPotion,
        API.InventoryItem.MagicPotion,
        API.InventoryItem.BluePotion,
        API.InventoryItem.Milk,
        API.InventoryItem.MilkHalf,
        API.InventoryItem.LanternOil,
        API.InventoryItem.Water,
        API.InventoryItem.LanternOil2,
        API.InventoryItem.RedPotion2,
        API.InventoryItem.NastySoup,
        API.InventoryItem.HotSpringwater,
        API.InventoryItem.Fairy,
        API.InventoryItem.HotSpringwater2,
        API.InventoryItem.LaternOil,
        API.InventoryItem.LaternOil2,
        API.InventoryItem.FairysTears,
        API.InventoryItem.Worm,
        API.InventoryItem.GreatFairysTears,
        API.InventoryItem.BeeLarva,
        API.InventoryItem.RareChuJelly,
        API.InventoryItem.RedChuJelly,
        API.InventoryItem.BlueChuJelly,
        API.InventoryItem.GreenChuJelly,
        API.InventoryItem.YellowChuJelly,
        API.InventoryItem.PurpleChuJelly,
        API.InventoryItem.SimpleSoup,
        API.InventoryItem.GoodSoup,
        API.InventoryItem.SuperbSoup,
    ]

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
        '//doubleClawshot',
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
        'dekuSeeds',
        'arrows',
        'bombs1',
        'bombs2',
        'bombs3',

    ];

    //Inventory Slots
    get galeBoomerang(): boolean {
        let val = this.getItem(API.InventoryItem.galeBoomerang)
        return !(val === API.InventoryItem.NONE);
    }
    set galeBoomerang(bool: boolean) {
        let value = bool ? API.InventoryItem.galeBoomerang : API.InventoryItem.NONE;
        this.setItem(value);
    }

    get lantern(): boolean {
        let val = this.getItem(API.InventoryItem.lantern)
        return !(val === API.InventoryItem.NONE);
    }
    set lantern(bool: boolean) {
        let value = bool ? API.InventoryItem.lantern : API.InventoryItem.NONE;
        this.setItem(value)
    }

    get spinner(): boolean {
        let val = this.getItem(API.InventoryItem.spinner)
        return !(val === API.InventoryItem.NONE);
    }
    set spinner(bool: boolean) {
        let value = bool ? API.InventoryItem.spinner : API.InventoryItem.NONE;
        this.setItem(value)
    }

    get ironBoots(): boolean {
        let val = this.getItem(API.InventoryItem.ironBoots)
        return !(val === API.InventoryItem.NONE);
    }
    set ironBoots(bool: boolean) {
        let value = bool ? API.InventoryItem.ironBoots : API.InventoryItem.NONE;
        this.setItem(value)
    }

    get bow(): boolean {
        let val = this.getItem(API.InventoryItem.bow)
        return !(val === API.InventoryItem.NONE);
    }
    set bow(bool: boolean) {
        let value = bool ? API.InventoryItem.bow : API.InventoryItem.NONE;
        this.setItem(value)
    }

    get hawkeye(): boolean {
        let val = this.getItem(API.InventoryItem.hawkeye)
        return !(val === API.InventoryItem.NONE);
    }
    set hawkeye(bool: boolean) {
        let value = bool ? API.InventoryItem.hawkeye : API.InventoryItem.NONE;
        this.setItem(value)
    }

    get ballAndChain(): boolean {
        let val = this.getItem(API.InventoryItem.ballAndChain)
        return !(val === API.InventoryItem.NONE);
    }
    set ballAndChain(bool: boolean) {
        let value = bool ? API.InventoryItem.ballAndChain : API.InventoryItem.NONE;
        this.setItem(value)
    }

    get dominionRod(): boolean {
        let val = this.getItem(API.InventoryItem.dominionRod)
        return !(val === API.InventoryItem.NONE);
    }
    set dominionRod(bool: boolean) {
        let value = bool ? API.InventoryItem.dominionRod : API.InventoryItem.NONE;
        this.setItem(value)
    }

    get clawshot(): API.InventoryItem {
        return this.getItem(API.InventoryItem.clawshot);
    }
    set clawshot(item: API.InventoryItem) {
        if (item === API.InventoryItem.clawshot ||
            item === API.InventoryItem.doubleClawshot) {
            this.setItem(item);
        }
    }

    get slingshot(): boolean {
        let val = this.getItem(API.InventoryItem.slingshot)
        return !(val === API.InventoryItem.NONE);
    }
    set slingshot(bool: boolean) {
        let value = bool ? API.InventoryItem.slingshot : API.InventoryItem.NONE;
        this.setItem(value)
    }

    get bottles(): API.InventoryItem[] {
        let bottleBuf = this.emulator.rdramReadBuffer(0x80406267, 0x4);
        let bottleTemp: API.InventoryItem[] = [];
        for (let i = 0; i < bottleBuf.byteLength; i++) {
            bottleTemp[i] = bottleBuf[i];
        }
        return bottleTemp;
    }
    set bottles(content: API.InventoryItem[]) {
        //this.setBottle(content);
    }

    get bombBag1(): API.InventoryItem {
        if (this.getItem(API.InventoryItem.bombBug) as number !== 0xFF) return API.InventoryItem.bombBug;
        if (this.getItem(API.InventoryItem.bombWater) as number !== 0xFF) return API.InventoryItem.bombWater;
        if (this.getItem(API.InventoryItem.bombNormal) as number !== 0xFF) return API.InventoryItem.bombNormal;
        return 0xFF;
    }
    set bombBag1(content: API.InventoryItem) {
        if (content !== API.InventoryItem.bombNormal &&
            content !== API.InventoryItem.bombWater &&
            content !== API.InventoryItem.bombBug
        ) {
            return;
        }
        this.setItem(content);
    }

    get bombBag2(): API.InventoryItem {
        if (this.getItem(API.InventoryItem.bombBug) as number !== 0xFF) return API.InventoryItem.bombBug;
        if (this.getItem(API.InventoryItem.bombWater) as number !== 0xFF) return API.InventoryItem.bombWater;
        if (this.getItem(API.InventoryItem.bombNormal) as number !== 0xFF) return API.InventoryItem.bombNormal;
        return 0xFF;
    }
    set bombBag2(content: API.InventoryItem) {
        if (content !== API.InventoryItem.bombNormal &&
            content !== API.InventoryItem.bombWater &&
            content !== API.InventoryItem.bombBug
        ) {
            return;
        }
        this.setItem(content);
    }

    get bombBag3(): API.InventoryItem {
        if (this.getItem(API.InventoryItem.bombBug) as number !== 0xFF) return API.InventoryItem.bombBug;
        if (this.getItem(API.InventoryItem.bombWater) as number !== 0xFF) return API.InventoryItem.bombWater;
        if (this.getItem(API.InventoryItem.bombNormal) as number !== 0xFF) return API.InventoryItem.bombNormal;
        return 0xFF;
    }
    set bombBag3(content: API.InventoryItem) {
        if (content !== API.InventoryItem.bombNormal &&
            content !== API.InventoryItem.bombWater &&
            content !== API.InventoryItem.bombBug
        ) {
            return;
        }
        this.setItem(content);
    }

    /* get ooccoo(): boolean {
        let val = this.getItem(API.InventorySlots.HOOKSHOT)
        return !(val === API.InventoryItem.NONE);
    }
    set ooccoo(bool: boolean) {
        let value = bool ? API.InventoryItem.ooccoo : API.InventoryItem.NONE;
        this.setItem(value, API.InventorySlots.HOOKSHOT)
    } */

    /* get asheiSketch(): boolean {
        let val = this.getItem(API.InventorySlots.SKULL_HAMMER)
        return !(val === API.InventoryItem.NONE);
    }
    set asheiSketch(bool: boolean) {
        let value = bool ? API.InventoryItem.asheiSketch : API.InventoryItem.NONE;
        this.setItem(value, API.InventorySlots.SKULL_HAMMER)
    } */

    get fishingRod(): InventoryItem {
        if (this.getItem(API.InventoryItem.fishingRodEaringWorm) as number !== 0xFF) return API.InventoryItem.fishingRodEaringWorm;
        if (this.getItem(API.InventoryItem.fishingRodEaring) as number !== 0xFF) return API.InventoryItem.fishingRodEaring;
        if (this.getItem(API.InventoryItem.fishingRod) as number !== 0xFF) return API.InventoryItem.fishingRod;
        return 0xFF;
    }
    set fishingRod(content: InventoryItem) {
        if (content !== API.InventoryItem.fishingRod &&
            content !== API.InventoryItem.fishingRodEaring &&
            content !== API.InventoryItem.fishingRodEaringWorm
        ) {
            return;
        }
        this.setItem(content)
    }

    get horseCall(): boolean {
        let val = this.getItem(API.InventoryItem.horseCall)
        return !(val === API.InventoryItem.NONE);
    }
    set horseCall(bool: boolean) {
        let value = bool ? API.InventoryItem.horseCall : API.InventoryItem.NONE;
        this.setItem(value)
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

    getItem(item: API.InventoryItem): API.InventoryItem {
        let curItem = API.InventoryItem.NONE;
        for (let i = 0; i <= API.InventorySlots.SLOT_24; i++) {
            let tempItem = this.emulator.rdramRead8(this.instance + i);
            if (tempItem === item) {
                curItem = tempItem;
                return curItem;
            }
        }
        return 0xFF;
    }
    getSlotForItem(item: API.InventoryItem): number {
        //console.log(`item: ${item}`)
        let slot = 0xFF;
        let backup: number[] = [];
        for (let i = 0; i <= API.InventorySlots.SLOT_24; i++) {
            if (this.emulator.rdramRead8(this.instance + i) === 0xFF) {
                backup.push(i);
                //console.log(`backup: ${backup[i]}`)
            }
            if (this.emulator.rdramRead8(this.instance + i) === item) {
                slot = i;
                //console.log(`item found: ${item} at slot ${slot}`)
            }
            if (i === API.InventorySlots.SLOT_24 && slot === 0xFF) {
                slot = backup[0]; //Set to empty slot if not detected
                //console.log(`slot (backup) = ${slot}`)
            }
        }
        //console.log(`return ${slot}`);
        return slot;
    }
    setItem(item: API.InventoryItem): void {
        let slot = this.getSlotForItem(item);
        //console.log(`setItem slot: ${slot}`)
        if (slot < 0 || slot > API.InventorySlots.SLOT_24) {
            return;
        }
        this.emulator.rdramWrite8(this.instance + slot, item.valueOf());
        this.emulator.rdramWrite8(this.slotInstance + slot, slot.valueOf());
    }
    /* getBottle(item: API.InventoryItem[]): API.InventoryItem[] {
        console.log(`item: ${item}`)
        let slot = 0xFF;
        let myBottles: number[] = [];

        for (let i = 0; i < item.length; i++) {
            if (this.bottleID.includes(item[i])) {
                myBottles.push(item[i]);
            }
        }

        console.log(`getBottle return ${myBottles}`);
        return myBottles;
    }
    setBottle(item: API.InventoryItem[]): void {
        console.log(`setBottle`);
        let slot = 0xFF;

        for (let i = 0; i < API.InventorySlots.SLOT_24; i++) {
            if (this.emulator.rdramRead8(this.instance + i) === 0xFF) {
                slot = i;
            }
            for (let j = 0; j < item.length; j++) {
                if (this.emulator.rdramRead8(this.instance + i) === 0xFF) {
                    this.emulator.rdramWrite8(this.instance + i, item[j]);
                    this.emulator.rdramWrite8(this.slotInstance + slot, slot);
                }
            }
        }

    }
    getSlotForBottle(item: API.InventoryItem): number {
        console.log(`item: ${item}`)
        let slot = 0xFF;
        let backup: number[] = [];
        for (let i = 0; i <= API.InventorySlots.SLOT_24; i++) {
            if (this.emulator.rdramRead8(this.instance + i) === 0xFF) {
                backup.push(i);
                //console.log(`backup: ${backup[i]}`)
            }
            if (this.emulator.rdramRead8(this.instance + i) === item[i]) {
                slot = i;
                console.log(`item found: ${item} at slot ${slot}`)
            }
            if (i === API.InventorySlots.SLOT_24 && slot === 0xFF) {
                slot = backup[0]; //Set to empty slot if not detected
                console.log(`slot (backup) = ${slot}`)
            }
        }
        console.log(`getSlotForBottle return ${slot}`);
        return slot;
    } */
}

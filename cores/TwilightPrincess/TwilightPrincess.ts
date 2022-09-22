import { onTick, Preinit, Init, Postinit } from "modloader64_api/PluginLifecycle";
import { IRomHeader } from 'modloader64_api/IRomHeader';
import { ModLoaderAPIInject } from "modloader64_api/ModLoaderAPIInjector";
import { IModLoaderAPI, ILogger, ICore, ModLoaderEvents } from "modloader64_api/IModLoaderAPI";
import { bus, EventHandler } from "modloader64_api/EventHandler";
import { PayloadType } from "modloader64_api/PayloadType";
import IMemory from "modloader64_api/IMemory";
import fs from 'fs';
import path from 'path';
import * as API from './API/Imports';
import { GlobalContext, Link, SaveContext, WWHelper } from "./src/Imports";
import * as CORE from './src/Imports';
import { BindVar, BindVar_Sizes } from 'modloader64_api/BindVar';

export class TwilightPrincess implements ICore, API.ITPCore {
    heap_size = -1;
    heap_start = -1;
    header = "GZ2E";
    @ModLoaderAPIInject()
    ModLoader: IModLoaderAPI = {} as IModLoaderAPI;
    eventTicks: Map<string, Function> = new Map<string, Function>();
    link!: API.ILink;
    save!: API.ISaveContext;
    global!: API.IGlobalContext;
    helper!: API.ITPHelper;
    isSaveLoaded = false;
    touching_loading_zone = false;
    last_known_scene: string = "";
    last_known_room: number = -1;
    isLinkLoadingZone!: number;
    temp: boolean = false;
    isFirstTunic = false;
    spdHack = false;

    @Preinit(
    )
    preinit() {
        this.eventTicks.set('waitingForSaveload', () => {
            if (!this.isSaveLoaded && this.helper.isSceneNameValid() && !this.helper.isTitleScreen() && this.helper.isLinkControllable()) {
                this.isSaveLoaded = true;
                bus.emit(API.TPEvents.ON_SAVE_LOADED, {});
            }
        });
    }

    @Init()
    init(): void {
    }

    @Postinit()
    postinit(): void {
        this.global = new GlobalContext(this.ModLoader.emulator);
        this.link = new Link(this.ModLoader.emulator);
        this.save = new SaveContext(this.ModLoader.emulator, this);
        this.helper = new WWHelper(
            this.save,
            this.global,
            this.link,
            this.ModLoader.emulator
        );
        this.ModLoader.utils.setIntervalFrames(()=>{
            
        }, 600);
    }

    @onTick()
    onTick() {
        if (this.helper.isTitleScreen() || !this.helper.isSceneNameValid()) return;
        if (this.helper.isLoadingZone() && !this.touching_loading_zone) {
            console.log(`OnLoadingZone()`);
            bus.emit(API.TPEvents.ON_LOADING_ZONE, {});
            this.touching_loading_zone = true;
        }
        if (this.touching_loading_zone && this.helper.isSceneChange() && !this.temp) {
            console.log(`OnSceneChange(): Scene ${this.global.next_scene_name}`);
            bus.emit(API.TPEvents.ON_SCENE_CHANGE, this.global.next_scene_name);
            this.touching_loading_zone = false;
            this.temp = true;
        }
        if (this.global.current_scene_frame === 60) this.temp = false;
        this.eventTicks.forEach((value: Function, key: string) => {
            value();
        });

        // Room change check
        if (this.last_known_room !== this.global.current_room_number) {
            //console.log(`OnRoomChange(): room ${this.global.next_room_number}`);
            bus.emit(API.TPEvents.ON_ROOM_CHANGE, this.global.current_scene_name, this.global.current_room_number);
            this.last_known_room = this.global.current_room_number;
        }


    }

    speedhack() {
        //console.log(`speedhack`)
        this.ModLoader.emulator.rdramWrite32(0x8003D50C, 0x60000000);
        this.ModLoader.emulator.rdramWrite32(0x8003D528, 0x60000000);
        this.ModLoader.emulator.rdramWrite32(0x8003D540, 0x60000000);
        this.ModLoader.emulator.rdramWrite32(0x8003D55C, 0x60000000);
        this.ModLoader.emulator.rdramWrite32(0x8003D5B8, 0x60000000);
        this.ModLoader.emulator.rdramWrite32(0x8003D5D4, 0x60000000);
        this.ModLoader.emulator.rdramWrite32(0x8003D5EC, 0x60000000);
        this.ModLoader.emulator.rdramWrite32(0x8003D608, 0x60000000);

        this.ModLoader.emulator.invalidateCachedCode(0x8003D50C, 0xFC, true);
    }


    testInventory() {
        if (this.helper.isTitleScreen() || !this.helper.isSceneNameValid() || !this.helper.isLinkControllable()) return;
        if (this.global.current_scene_frame > 300) return;

        /* console.log(`galeBoomerang = ${this.save.inventory.galeBoomerang}`);
        console.log(`lantern = ${this.save.inventory.lantern}`);
        console.log(`galeBoomerang ${this.save.inventory.galeBoomerang}`);
        console.log(`lantern ${this.save.inventory.lantern}`);
        console.log(`spinner ${this.save.inventory.spinner}`);
        console.log(`ironBoots ${this.save.inventory.ironBoots}`);
        console.log(`bow ${this.save.inventory.bow}`);
        console.log(`hawkeye ${this.save.inventory.hawkeye}`);
        console.log(`ballAndChain ${this.save.inventory.ballAndChain}`);
        console.log(`dominionRod ${this.save.inventory.dominionRod}`);
        console.log(`clawshot ${this.save.inventory.clawshot}`);
        console.log(`slingshot ${this.save.inventory.slingshot}`);
        console.log(`fishingRod ${this.save.inventory.fishingRod}`);
        console.log(`horseCall ${this.save.inventory.horseCall}`); */

        /*         this.save.inventory.galeBoomerang = true;
                this.save.inventory.lantern = true;
                this.save.inventory.spinner = true;
                this.save.inventory.ironBoots = true;
                this.save.inventory.bow = true;
                this.save.inventory.hawkeye = true;
                this.save.inventory.ballAndChain = true;
                this.save.inventory.dominionRod = true;
                this.save.inventory.clawshot = API.InventoryItem.doubleClawshot;
                this.save.inventory.slingshot = true;
                this.save.inventory.fishingRod = API.InventoryItem.fishingRodEaring;
                this.save.inventory.horseCall = true; */

        /* this.save.inventory.dekuSeeds = 30;
        this.save.inventory.arrows = 30;

        this.save.inventory.bombs1 = 30;
        this.save.inventory.bombs2 = 30;
        this.save.inventory.bombs3 = 30;

        this.save.swords.swordLevel = API.Sword.Master;
        this.save.shields.shieldLevel = API.Shield.Hylian;
        this.save.shields.shieldLevel = API.Shield.Ordon;
        this.save.questStatus.max_hp = 50;
        this.save.questStatus.currentWallet = 2;
        this.save.questStatus.rupees = 300;
        this.save.questStatus.magicArmor = true;
        this.save.questStatus.zoraArmor = true;
        this.save.questStatus.heroArmor = true;
        this.save.questStatus.goldenBugs = Buffer.from([0xFF, 0xFF, 0xFF]) */
    }

    @EventHandler(API.TPEvents.ON_SCENE_CHANGE)
    onSceneChange() {
        this.speedhack();
        if (!this.isSaveLoaded || !this.helper.isSceneNameValid() || this.helper.isTitleScreen()) return;
        if (this.save.questStatus.heroArmor) {
            console.log("First hero tunic, changing...")
            this.save.questStatus.clothing = 47;
            this.isFirstTunic = true;
        }
    }
}
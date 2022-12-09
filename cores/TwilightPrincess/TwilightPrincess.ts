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
        this.ModLoader.utils.setIntervalFrames(() => {

        }, 600);
        bus.emit("DOLPHIN_ENABLE_PATCH", 'Hyrule Field Speed Hack');
    }

    @onTick()
    onTick() {
        if (this.helper.isTitleScreen() || !this.helper.isSceneNameValid()) return;
        
        if (this.helper.isLoadingZone() && !this.touching_loading_zone) {
            console.log(`OnLoadingZone()`);
            bus.emit(API.TPEvents.ON_LOADING_ZONE, {});
            this.touching_loading_zone = true;
        }
        if (this.touching_loading_zone && this.global.current_scene_name !== this.last_known_scene && !this.temp && this.global.current_scene_frame > 1) {
            console.log(`OnSceneChange(): Scene ${this.global.current_scene_name}`);
            bus.emit(API.TPEvents.ON_SCENE_CHANGE, this.global.current_scene_name);
            this.touching_loading_zone = false;
            this.last_known_scene = this.global.current_scene_name;
            this.temp = true;
        } else if (this.touching_loading_zone && this.global.current_scene_frame > 60 && !this.helper.isLoadingZone()) this.touching_loading_zone = false;
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
    
    @EventHandler(API.TPEvents.ON_SCENE_CHANGE)
    onSceneChange() {
        if (!this.isSaveLoaded || !this.helper.isSceneNameValid() || this.helper.isTitleScreen()) return;
        if (this.save.questStatus.heroArmor && !this.isFirstTunic) {
            console.log("First hero tunic, changing...");
            this.save.questStatus.clothing = 47;
            this.isFirstTunic = true;
        }
    }
}
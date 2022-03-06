import { IModLoaderAPI } from "modloader64_api/IModLoaderAPI";
import * as API from '../API/Imports';
import { JSONTemplate } from "modloader64_api/JSONTemplate";
import IMemory from "modloader64_api/IMemory";

export class WWHelper extends JSONTemplate implements API.ITPHelper {

    private save: API.ISaveContext;
    private global: API.IGlobalContext;
    private link: API.ILink;
    private emu: IMemory;
    constructor(
        save: API.ISaveContext,
        global: API.IGlobalContext,
        link: API.ILink,
        memory: IMemory
    ) {
        super();
        this.save = save;
        this.global = global;
        this.link = link;
        this.emu = memory;
    }

    isLinkControllable(): boolean {
        let r1 = this.emu.rdramRead8(0x803DC41C);
        return (r1 === 0 && !this.isLoadingZone() && !this.isPaused());
    }

    isTitleScreen(): boolean {
        return (this.global.current_scene_name === "F_SP102");
    }

    isSceneChange(): boolean {
        let r1 = this.global.current_scene_frame;
        return (r1 === 0x00000000);
    }

    isLoadingZone(): boolean {
        let r1 = this.emu.rdramRead32(0x80450CE0);

        return (r1 === 0x1);
    }

    isLinkExists(): boolean {
        return (this.global.linkPointer !== 0x0);
    }

    isSceneNameValid(): boolean {
        return this.global.current_scene_name !== "NULL" && !this.isTitleScreen();
    }

    isPaused(): boolean {
        return this.emu.rdramRead8(0x8040C04F) !== 0x0;
    }

}
import IMemory from 'modloader64_api/IMemory';
import * as API from '../API/Imports'
import { JSONTemplate } from 'modloader64_api/JSONTemplate';
import { IModLoaderAPI } from 'modloader64_api/IModLoaderAPI';
import { StageInfo } from './StageInfo';

export class GlobalContext extends JSONTemplate implements API.IGlobalContext {
    private emulator: IMemory;

    constructor(emu: IMemory) {
        super();
        this.emulator = emu;
    }

    get current_stage_id(): number {
        return this.emulator.rdramRead8(0x80406B38);
    }

    get current_scene_frame(): number {
        return this.emulator.rdramRead16(0x8040BE1E);
    }

    get current_scene_name(): string {
        let rawName = this.emulator.rdramReadBuffer(0x8040AFC0, 0x8).toString();
        let realName = "NULL";
        for (let i = 0; i < this.sceneNames.length; i++) {
            if (rawName.indexOf(this.sceneNames[i]) !== -1) realName = this.sceneNames[i];
        }
        return realName;
    }

    get current_room_number(): number {
        return this.emulator.rdramRead8(0x8042D3E0);
    }
    get prev_room_number(): number {
        return this.emulator.rdramRead8(0x8040B36B);
    }

    get next_scene_name(): string {
        let rawName = this.emulator.rdramReadBuffer(0x8040AFCE, 0x8).toString();
        let realName = "NULL";
        for (let i = 0; i < this.sceneNames.length; i++) {
            if (rawName.startsWith(this.sceneNames[i], 0)) realName = this.sceneNames[i];
        }
        return realName;
    }

    get next_room_number(): number {
        return this.emulator.rdramRead8(0x8040AFD8);
    }
    get linkPointer(): number {
        return this.emulator.rdramRead32(0x803DCE54);
    }

    get time(): number {
        return this.emulator.rdramReadF32(0x804061F4);
    }
    set time(flag: number) {
        this.emulator.rdramWriteF32(0x804061F4, flag);
    }

    getSaveDataForCurrentScene(): Buffer {
        return this.emulator.rdramReadBuffer(0x804063B0 + (this.current_stage_id * 0x20), 0x20);
    }

    writeSaveDataForCurrentScene(buf: Buffer): void {
        this.emulator.rdramWriteBuffer(0x804063B0 + (this.current_stage_id * 0x20), buf);
    }

    getSaveDataForScene(id: number): StageInfo {
        let stageInfo = new StageInfo(this.emulator, id);
        stageInfo.chests = this.emulator.rdramReadBuffer(0x804063B0 + (id * 0x20), 0x8);
        stageInfo.switches = this.emulator.rdramReadBuffer(0x804063B0 + (id * 0x20) + 0x8, 0x10);
        stageInfo.items = this.emulator.rdramReadBuffer(0x804063B0 + (id * 0x20) + 0x18, 0x4);
        stageInfo.keys = this.emulator.rdramRead8(0x804063B0 + (id * 0x20) + 0x1C);
        stageInfo.dungeonItem = this.emulator.rdramReadBuffer(0x804063B0 + (id * 0x20) + 0x1D, 0x1);

        return stageInfo;
    }

    writeSaveDataForScene(id: number, buf: StageInfo): void {
        this.emulator.rdramWriteBuffer(0x804063B0 + (id * 0x20), buf.chests);
        this.emulator.rdramWriteBuffer(0x804063B0 + (id * 0x20) + 0x8, buf.switches);
        this.emulator.rdramWriteBuffer(0x804063B0 + (id * 0x20) + 0x18, buf.items);
        this.emulator.rdramWrite8(0x804063B0 + (id * 0x20) + 0x1C, buf.keys);
        this.emulator.rdramWriteBuffer(0x804063B0 + (id * 0x20) + 0x1D, buf.dungeonItem);
    }

    sceneNames = [
        "D_MN00",
        "D_MN00A",
        "D_MN01",
        "D_MN01A",
        "D_MN01B",
        "D_MN02",
        "D_MN03",
        "D_MN04",
        "D_MN04A",
        "D_MN04B",
        "D_MN05",
        "D_MN05A",
        "D_MN05B",
        "D_MN06",
        "D_MN06A",
        "D_MN06B",
        "D_MN07",
        "D_MN07A",
        "D_MN07B",
        "D_MN08",
        "D_MN08A",
        "D_MN08B",
        "D_MN08C",
        "D_MN08D",
        "D_MN09",
        "D_MN09A",
        "D_MN09B",
        "D_MN09C",
        "D_MN10",
        "D_MN10A",
        "D_MN10B",
        "D_MN11",
        "D_MN11A",
        "D_MN11B",
        "D_MN54",
        "D_MN54A",
        "D_MN99A",
        "D_SB00",
        "D_SB01",
        "D_SB02",
        "D_SB03",
        "D_SB04",
        "D_SB05",
        "D_SB06",
        "D_SB07",
        "D_SB08",
        "D_SB09",
        "D_SB10",
        "F_SP00",
        "F_SP102",
        "F_SP103",
        "F_SP104",
        "F_SP108",
        "F_SP109",
        "F_SP110",
        "F_SP111",
        "F_SP112",
        "F_SP113",
        "F_SP114",
        "F_SP115",
        "F_SP116",
        "F_SP117",
        "F_SP118",
        "F_SP121",
        "F_SP122",
        "F_SP123",
        "F_SP124",
        "F_SP125",
        "F_SP126",
        "F_SP127",
        "F_SP128",
        "F_SP200",
        "R_SP01",
        "R_SP107",
        "R_SP108",
        "R_SP109",
        "R_SP110",
        "R_SP116",
        "R_SP127",
        "R_SP128",
        "R_SP160",
        "R_SP161",
        "R_SP209",
        "R_SP300",
        "R_SP301",
        "S_MV000"
    ]
}
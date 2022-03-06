import IMemory from 'modloader64_api/IMemory';
import * as API from '../API/Imports'
import { JSONTemplate } from 'modloader64_api/JSONTemplate';
import { IModLoaderAPI } from 'modloader64_api/IModLoaderAPI';

export class Link extends JSONTemplate implements API.ILink {
    private emulator: IMemory;

    constructor(emu: IMemory) {
        super();
        this.emulator = emu;
    }

    get pos(): Buffer {
      return this.emulator.rdramReadBuffer(0x80A1A25C, 0xC);
    }
    get rot(): number {
      return this.emulator.rdramRead16(0x80A1A272);
    }
    get speed(): number {
      return this.emulator.rdramRead32(0x80A1A2B8);
    }
}
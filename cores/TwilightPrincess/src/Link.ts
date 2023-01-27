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
    return this.emulator.rdramReadPtrBuffer(0x8040BF6C, 0x4D0, 0xC);
  }
  get rot(): Buffer {
    return this.emulator.rdramReadPtrBuffer(0x8040BF6C, 0x4D0 + 0xC, 0x6);
  }
  get speed(): number {
    return this.emulator.rdramRead32(0x80A1A2B8);
  }
}
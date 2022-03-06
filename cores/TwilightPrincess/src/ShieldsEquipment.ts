import IMemory from 'modloader64_api/IMemory';
import { JSONTemplate } from 'modloader64_api/JSONTemplate';
import { IShields, ITPCore, Shield } from '../API/TPAPI';

export const enum ShieldBitMap {
  NONE = 0,
  Hylian = 3,
  Wooden = 4,
  Ordon = 5,
}

export class ShieldsEquipment extends JSONTemplate implements IShields {
  private emulator: IMemory;
  private core: ITPCore;
  jsonFields: string[] = ['shieldLevel'];
  constructor(emulator: IMemory, core: ITPCore) {
    super();
    this.emulator = emulator;
    this.core = core;
  }

  get shieldLevel(): Shield {
    let bits = this.emulator.rdramReadBits8(0x80406292); //Shield bitfield

    if (bits[ShieldBitMap.Ordon] === 1) {
      return Shield.Ordon;
    } else if (bits[ShieldBitMap.Wooden] === 1) {
      return Shield.Wooden;
    } else if (bits[ShieldBitMap.Hylian] === 1) {
      return Shield.Hylian;
    } else {
      return Shield.NONE;
    }
  }

  set shieldLevel(level: Shield) {
    let bits = this.emulator.rdramReadBits8(0x80406292);
    switch (level) {
      case Shield.Ordon:
        bits[ShieldBitMap.Ordon] = 1;
        bits[ShieldBitMap.Wooden] = 0;
        break;
      case Shield.Wooden:
        bits[ShieldBitMap.Ordon] = 0;
        bits[ShieldBitMap.Wooden] = 1;
        break;
      case Shield.Hylian:
        bits[ShieldBitMap.Hylian] = 1;
        break;
    }
    this.emulator.rdramWriteBits8(0x80406292, bits);
  }

}
import IMemory from 'modloader64_api/IMemory';
import { JSONTemplate } from 'modloader64_api/JSONTemplate';
import { ISwords, ITPCore, Sword } from '../API/TPAPI';

export const enum SwordBitMap {
  NONE = 0,
  Ordon = 7,
  Master = 6,
}

export class SwordsEquipment extends JSONTemplate implements ISwords {
  private emulator: IMemory;
  private core: ITPCore;

  jsonFields: string[] = [
    'swordLevel',
  ];
  constructor(emulator: IMemory, core: ITPCore) {
    super();
    this.emulator = emulator;
    this.core = core;
  }

  get swordLevel(): Sword {
    let bits = this.emulator.rdramReadBits8(0x80406292); //Sword bitfield
    if (bits[SwordBitMap.Master] === 1) {
      return Sword.Master;
    } else if (bits[SwordBitMap.Ordon] === 1) {
      return Sword.Ordon;
    }
    else {
      return Sword.NONE;
    }
  }

  set swordLevel(level: Sword) {
    let bits = this.emulator.rdramReadBits8(0x80406292);
    switch (level) {
      case Sword.NONE:
        bits[SwordBitMap.Ordon] = 0;
        bits[SwordBitMap.Master] = 0;
        break;
      case Sword.Ordon:
        bits[SwordBitMap.Ordon] = 1;
        bits[SwordBitMap.Master] = 0;
        break;
      case Sword.Master:
        bits[SwordBitMap.Ordon] = 1;
        bits[SwordBitMap.Master] = 1;
        break;
    }
    this.emulator.rdramWriteBits8(0x80406292, bits);
  }

}
import { HomeCharacterInterface } from '@interfaces/interfaces';
import { urldecode, urlencode } from '@osumi/tools';

export default class HomeCharacter {
  constructor(
    public id: number | null = null,
    public type: number | null = null,
    public name: string | null = null
  ) {}

  fromInterface(hc: HomeCharacterInterface): HomeCharacter {
    this.id = hc.id;
    this.type = hc.type;
    this.name = urldecode(hc.name);

    return this;
  }

  toInterface(): HomeCharacterInterface {
    return {
      id: this.id,
      type: this.type,
      name: urlencode(this.name),
    };
  }
}

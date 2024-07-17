import {
  CurrentSystemInterface,
  HomeCharacterInterface,
  ShortMessageInterface,
} from '@interfaces/interfaces';
import HomeCharacter from '@model/home-character.model';
import ShortMessage from '@model/short-message.model';
import Utils from '@model/utils.class';

export default class CurrentSystem {
  constructor(
    public system: string | null = null,
    public star: string | null = null,
    public numPlanets: number = 0,
    public credits: number = 0,
    public maxStrength: number = 0,
    public strength: number = 0,
    public messages: ShortMessage[] = [],
    public characters: HomeCharacter[] = []
  ) {}

  fromInterface(cs: CurrentSystemInterface): CurrentSystem {
    this.system = Utils.urldecode(cs.system);
    this.star = Utils.urldecode(cs.star);
    this.numPlanets = cs.numPlanets;
    this.credits = cs.credits;
    this.maxStrength = cs.maxStrength;
    this.strength = cs.strength;
    this.messages = cs.messages.map(
      (item: ShortMessageInterface): ShortMessage => {
        return new ShortMessage().fromInterface(item);
      }
    );
    this.characters = cs.characters.map(
      (item: HomeCharacterInterface): HomeCharacter => {
        return new HomeCharacter().fromInterface(item);
      }
    );

    return this;
  }

  toInterface(): CurrentSystemInterface {
    return {
      system: Utils.urlencode(this.system),
      star: Utils.urlencode(this.star),
      numPlanets: this.numPlanets,
      credits: this.credits,
      maxStrength: this.maxStrength,
      strength: this.strength,
      messages: this.messages.map(
        (item: ShortMessage): ShortMessageInterface => {
          return item.toInterface();
        }
      ),
      characters: this.characters.map(
        (item: HomeCharacter): HomeCharacterInterface => {
          return item.toInterface();
        }
      ),
    };
  }
}

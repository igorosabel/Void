import { StarInterface } from '@interfaces/interfaces';

export default class Star {
  constructor(
    public top: number = 0,
    public right: number = 0,
    public width: number = 0,
    public pulse: number = 0
  ) {}

  fromInterface(s: StarInterface): Star {
    this.top = s.top;
    this.right = s.right;
    this.width = s.width;
    this.pulse = s.pulse;

    return this;
  }

  toInterface(): StarInterface {
    return {
      top: this.top,
      right: this.right,
      width: this.width,
      pulse: this.pulse,
    };
  }
}

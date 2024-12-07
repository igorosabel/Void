import Star from '@model/star.model';

export default class Utils {
  static randomFrom(array: number[]): number {
    return array[Math.floor(Math.random() * array.length)];
  }

  static stars(numberOfStars: number): Star[] {
    const bigRange: number[] = [...Array(100)].map((_, i) => i);
    const smallRange: number[] = [...Array(3)].map((_, i) => i);
    const tenRange: number[] = [...Array(10)].map((_, i) => i);
    const ret = [];
    for (let i: number = 0; i < numberOfStars; i++) {
      const pulse: number = Utils.randomFrom(tenRange);
      const top: number = Utils.randomFrom(bigRange);
      const right: number = Utils.randomFrom(bigRange);
      const width: number = Utils.randomFrom(smallRange);
      ret.push(new Star(top, right, width, pulse));
    }
    return ret;
  }
}

import Star from '@model/star.model';

export default class Utils {
  static randomFrom(array: number[]): number {
    return array[Math.floor(Math.random() * array.length)];
  }

  static stars(numberOfStars: number): Star[] {
    const bigRange = Array.apply(null, Array(100)).map(function (_, i) {
      return i;
    });
    const smallRange = Array.apply(null, Array(3)).map(function (_, i) {
      return i;
    });
    const tenRange = Array.apply(null, Array(10)).map(function (_, i) {
      return i;
    });
    const ret = [];
    for (let i = 0; i < numberOfStars; i++) {
      let pulse = Utils.randomFrom(tenRange);
      let top = Utils.randomFrom(bigRange);
      let right = Utils.randomFrom(bigRange);
      let width = Utils.randomFrom(smallRange);
      ret.push(new Star(top, right, width, pulse));
    }
    return ret;
  }
}

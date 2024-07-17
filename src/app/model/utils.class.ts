import Star from '@model/star.model';

export default class Utils {
  static urlencode(str: string | null): string | null {
    if (str === null) {
      return null;
    }
    return encodeURIComponent(str)
      .replace(/\%20/g, '+')
      .replace(/!/g, '%21')
      .replace(/'/g, '%27')
      .replace(/\(/g, '%28')
      .replace(/\)/g, '%29')
      .replace(/\*/g, '%2A')
      .replace(/\~/g, '%7E');
  }

  static urldecode(str: string | null): string {
    if (!str) {
      return '';
    }
    return decodeURIComponent(
      str
        .replace(/\+/g, '%20')
        .replace(/\%21/g, '!')
        .replace(/\%27/g, "'")
        .replace(/\%28/g, '(')
        .replace(/\%29/g, ')')
        .replace(/\%2A/g, '*')
        .replace(/\%7E/g, '~')
    );
  }

  static validateEmail(email: string): boolean {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  }

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

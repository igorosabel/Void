import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  standalone: true,
  name: "timeFormat",
})
export class TimeFormatPipe implements PipeTransform {
  transform(num: number): string {
    const hours: number = Math.floor(num / 3600);
    const minutes: number = Math.floor((num - hours * 3600) / 60);
    const seconds: number = num - hours * 3600 - minutes * 60;

    let strHours: string = hours.toString();
    if (hours < 10) {
      strHours = "0" + hours;
    }
    let strMinutes: string = minutes.toString();
    if (minutes < 10) {
      strMinutes = "0" + minutes;
    }
    let strSeconds: string = seconds.toString();
    if (seconds < 10) {
      strSeconds = "0" + seconds;
    }

    return hours > 0
      ? strHours + ":" + strMinutes + ":" + strSeconds
      : strMinutes + ":" + strSeconds;
  }
}

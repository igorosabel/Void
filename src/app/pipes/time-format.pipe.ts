import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {
	transform(num: number): string {
		let hours   = Math.floor(num / 3600);
		let minutes = Math.floor((num - (hours * 3600)) / 60);
		let seconds = num - (hours * 3600) - (minutes * 60);

		let strHours = hours.toString();
		if (hours   < 10) {strHours   = '0' + hours;}
		let strMinutes = minutes.toString();
		if (minutes < 10) {strMinutes = '0' + minutes;}
		let strSeconds = seconds.toString();
		if (seconds < 10) {strSeconds = '0' + seconds;}

		return (hours>0) ? strHours+':'+strMinutes+':'+strSeconds : strMinutes+':'+strSeconds;
	}
}
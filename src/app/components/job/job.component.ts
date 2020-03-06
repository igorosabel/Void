import { Component, OnInit } from '@angular/core';
import { ApiService }        from '../../services/api.service';

@Component({
	selector: 'void-job',
	templateUrl: './job.component.html',
	styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {
	timer = null;
	time: number = null;
	working: boolean = false;
	type: number = null;
	message: string = null;
	messages = {
		type1: 'Explorando...'
	}

	constructor(private as: ApiService) {}
	ngOnInit(): void {}
	
	updateTime() {
		clearTimeout(this.timer);
		this.time--;
		this.timer = setTimeout(() => {
			this.updateTime();
		}, 1000);
	}
	
	startJob(type, time) {
		this.time = time;
		this.type = type;
		this.message = this.messages['type'+this.type];
		this.working = true;
		this.updateTime();
	}
}
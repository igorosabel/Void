import { Component, OnInit } from '@angular/core';
import { ShortMessage }      from '../../interfaces/interfaces';

@Component({
	selector: 'void-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	messageList: ShortMessage[] = [
		{id: 1, type: 1, name: 'Player 1', date: '2020-01-23 14:59', message: 'holahola'},
		{id: 2, type: 2, name: 'Player 2', date: '2020-01-22 12:59', message: 'hellou'},
		{id: 3, type: 1, name: 'Player 3', date: '2020-01-21 11:11', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure'},
		{id: 4, type: 1, name: 'Player 4', date: '2020-01-21 09:09', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure'},
		{id: 5, type: 2, name: 'Player 1', date: '2020-01-20 23:59', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure'},
		{id: 6, type: 2, name: 'Player 2', date: '2020-01-20 12:37', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure'}
	];
	constructor() {}
	ngOnInit() {}
}
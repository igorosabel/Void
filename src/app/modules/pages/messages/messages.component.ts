import { Component } from '@angular/core';
import HeaderComponent from '@shared/components/header/header.component';

@Component({
  selector: 'void-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  imports: [HeaderComponent],
})
export default class MessagesComponent {}

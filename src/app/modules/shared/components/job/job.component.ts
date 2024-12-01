import { Component, inject } from '@angular/core';
import { MessageInterface } from '@interfaces/interfaces';
import ApiService from '@services/api.service';
import TimeFormatPipe from '@shared/pipes/time-format.pipe';

@Component({
  selector: 'void-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
  imports: [TimeFormatPipe],
})
export default class JobComponent {
  private as: ApiService = inject(ApiService);

  timer: number | null = null;
  time: number | null = null;
  working: boolean = false;
  type: number | null = null;
  message: string | undefined = undefined;
  messages: MessageInterface = {
    type1: 'Explorando...',
  };

  updateTime(): void {
    if (this.timer !== null && this.time !== null) {
      window.clearTimeout(this.timer);
      this.time--;
      this.timer = window.setTimeout((): void => {
        this.updateTime();
      }, 1000);
    }
  }

  startJob(type: number, time: number): void {
    this.time = time;
    this.type = type;
    this.message =
      this.messages[('type' + this.type) as keyof MessageInterface];
    this.working = true;
    this.updateTime();
  }
}

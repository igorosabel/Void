import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MessageInterface } from "src/app/interfaces/interfaces";
import { TimeFormatPipe } from "src/app/modules/shared/pipes/time-format.pipe";
import { ApiService } from "src/app/services/api.service";

@Component({
  standalone: true,
  selector: "void-job",
  templateUrl: "./job.component.html",
  styleUrls: ["./job.component.scss"],
  imports: [CommonModule, TimeFormatPipe],
})
export class JobComponent {
  timer: number = null;
  time: number = null;
  working: boolean = false;
  type: number = null;
  message: string = null;
  messages: MessageInterface = {
    type1: "Explorando...",
  };

  constructor(private as: ApiService) {}

  updateTime(): void {
    clearTimeout(this.timer);
    this.time--;
    this.timer = window.setTimeout((): void => {
      this.updateTime();
    }, 1000);
  }

  startJob(type: number, time: number): void {
    this.time = time;
    this.type = type;
    this.message = this.messages["type" + this.type];
    this.working = true;
    this.updateTime();
  }
}

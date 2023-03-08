import { Component } from "@angular/core";
import { HeaderComponent } from "src/app/modules/shared/components/header/header.component";

@Component({
  standalone: true,
  selector: "void-messages",
  templateUrl: "./messages.component.html",
  styleUrls: ["./messages.component.scss"],
  imports: [HeaderComponent],
})
export default class MessagesComponent {}

import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { DialogField } from "src/app/interfaces/interfaces";

@Component({
  standalone: true,
  selector: "void-form-dialog",
  templateUrl: "./form-dialog.component.html",
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
})
export class FormDialogComponent {
  public title: string;
  public content: string;
  public fields: DialogField[];
  public ok: string;
  public cancel: string;

  constructor(public dialogRef: MatDialogRef<FormDialogComponent>) {}
}

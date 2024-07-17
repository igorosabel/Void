import { CommonModule } from '@angular/common';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DialogField } from '@interfaces/interfaces';

@Component({
  standalone: true,
  selector: 'void-form-dialog',
  templateUrl: './form-dialog.component.html',
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
})
export default class FormDialogComponent {
  public dialogRef: MatDialogRef<FormDialogComponent> = inject(MatDialogRef);

  public title: WritableSignal<string> = signal<string>('');
  public content: WritableSignal<string> = signal<string>('');
  public fields: WritableSignal<DialogField[]> = signal<DialogField[]>([]);
  public ok: WritableSignal<string> = signal<string>('');
  public cancel: WritableSignal<string> = signal<string>('');
}

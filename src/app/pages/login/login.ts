import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    MatToolbar,
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
    RouterLink,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export default class Login {}

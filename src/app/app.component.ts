import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { passwordValidator } from './util/password-validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class AppComponent {
  minPasswordLength = 8;

  passwordInput = new FormControl(null, [
    Validators.minLength(this.minPasswordLength),
    passwordValidator(),
  ]);

  setRed(): boolean {
    return this.passwordInput.errors && this.passwordInput.errors['minlength'];
  }

  setYellow(): boolean | null {
    if (!this.passwordInput.errors) {
      return null;
    }

    return (
      this.passwordInput.errors['missingLatinCharacters'] ||
      this.passwordInput.errors['missingNumbers'] ||
      this.passwordInput.errors['missingSpecialSymbols']
    );
  }

  setGreen(): boolean | null {
    return this.passwordInput.value && !this.passwordInput.errors;
  }

  setGrey(): boolean | null {
    if (!this.passwordInput.errors) {
      return null;
    }

    return (
      !this.passwordInput.errors['onlyNumbers'] ||
      !this.passwordInput.errors['onlySymbols'] ||
      !this.passwordInput.errors['onlyLatinCharacters']
    );
  }

  setEasy(): boolean | null {
    if (!this.passwordInput.errors) {
      return null;
    }

    return (
      this.passwordInput.errors['onlyNumbers'] ||
      this.passwordInput.errors['onlySymbols'] ||
      this.passwordInput.errors['onlyLatinCharacters']
    );
  }

  setMedium(): boolean | null {
    if (!this.passwordInput.errors) {
      return null;
    }

    return (
      !(
        this.passwordInput.errors['missingNumbers'] &&
        this.passwordInput.errors['onlyLatinCharacters']
      ) &&
      !(
        this.passwordInput.errors['missingLatinCharacters'] &&
        this.passwordInput.errors['onlyNumbers']
      ) &&
      !(
        this.passwordInput.errors['missingLatinCharacters'] &&
        this.passwordInput.errors['onlySymbols']
      )
    );
  }

  setText(): boolean | null {
    return this.passwordInput.errors && !this.passwordInput.errors['minlength'];
  }
}

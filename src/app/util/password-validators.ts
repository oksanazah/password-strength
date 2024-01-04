import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordValidator = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;
    const latinCharactersPattern = /(?=.*[a-zA-Z])/g;
    const numbersPattern = /(?=.*[\d])/g;
    const specialSymbolsPattern = /(?=.*[\W])/g;
    const errors = new Map<string, boolean>();

    if (!value) return null;

    if (!latinCharactersPattern.test(value)) {
      errors.set('missingLatinCharacters', true);
    }

    if (!numbersPattern.test(value)) {
      errors.set('missingNumbers', true);
    }

    if (!specialSymbolsPattern.test(value)) {
      errors.set('missingSpecialSymbols', true);
    }

    if (
      !latinCharactersPattern.test(value) &&
      !specialSymbolsPattern.test(value)
    ) {
      errors.set('onlyNumbers', true);
    }

    if (!latinCharactersPattern.test(value) && !numbersPattern.test(value)) {
      errors.set('onlySymbols', true);
    }

    if (!numbersPattern.test(value) && !specialSymbolsPattern.test(value)) {
      errors.set('onlyLatinCharacters', true);
    }

    return errors.size > 0 ? Object.fromEntries(errors) : null;
  };
};

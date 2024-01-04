import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';

import { passwordValidator } from './password-validators';

describe('PasswordValidators', () => {
  let validatorFn: ValidatorFn;

  describe('isPasswordValid', () => {
    beforeEach(() => {
      validatorFn = passwordValidator();
    });

    it('should return null if password undefined', () => {
      const control = new FormControl(undefined);
      const result = validatorFn(control);

      expect(result).toBeNull();
    });

    it('should return null for a valid password', () => {
      const control = new FormControl('qwQW12!@');
      const result = validatorFn(control);

      expect(result).toBeNull();
    });

    it('should return an error object if missing some characters', () => {
      const control = new FormControl('12345678');
      const result = validatorFn(control);

      expect(result).toEqual({
        missingLatinCharacters: true,
        missingSpecialSymbols: true,
        onlyNumbers: true,
      });
    });

    it('should return an error object if missing numbers', () => {
      const control = new FormControl('qwQW!@asd');
      const result = validatorFn(control);

      expect(result).toEqual({
        missingNumbers: true,
      });
    });
  });
});

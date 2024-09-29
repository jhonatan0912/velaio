import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function uniqueAssociateNamesValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const associates = control.value as Array<{ fullName: string; }>;

    if (!associates || associates.length === 0) {
      return null;
    }

    const names = associates.map(a => a.fullName);
    const hasDuplicates = names.some((name, index) => names.indexOf(name) !== index);

    return hasDuplicates ? { nonUniqueNames: true } : null;
  };
}

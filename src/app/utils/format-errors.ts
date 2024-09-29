import { FormArray, FormGroup } from '@angular/forms';

export const findInvalidControls = (form: FormGroup | FormArray): string[] => {
  let invalidControls: string[] = [];

  Object.keys(form.controls).forEach(key => {
    const control = form.get(key);

    if (control instanceof FormGroup || control instanceof FormArray) {
      invalidControls = invalidControls.concat(findInvalidControls(control));
    } else if (control && control.invalid) {
      const controlErrors = control.errors;
      if (controlErrors) {
        const errorMessages = Object.keys(controlErrors)
          .map(errorKey => {
            switch (errorKey) {
              case 'required':
                return 'es requerido';
              case 'minlength':
                return `debe tener al menos ${controlErrors[errorKey].requiredLength} caracteres`;
              case 'maxlength':
                return `no puede exceder de ${controlErrors[errorKey].requiredLength} caracteres`;
              case 'pattern':
                return 'tiene un formato inválido';
              case 'nonUniqueNames':
                return 'no puede haber dos personas asociadas con el mismo nombre';
              default:
                return `error: ${controlErrors[errorKey]}`;
            }
          })
          .join(', ');

        if (control.parent instanceof FormArray) {
          const parentArray = control.parent as FormArray;
          const index = parentArray.controls.indexOf(control);
          invalidControls.push(`Ítem ${index} (${key}): ${errorMessages}`);
        } else {
          invalidControls.push(`Campo "${key}": ${errorMessages}`);
        }
      }
    }
  });

  const associatesControl = form.get('associates');
  if (associatesControl && associatesControl.errors && associatesControl.errors['nonUniqueNames']) {
    invalidControls.push('No puede haber dos personas asociadas con el mismo nombre');
  }

  return invalidControls;
};

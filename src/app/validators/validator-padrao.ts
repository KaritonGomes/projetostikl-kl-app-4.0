import { FormControl, ValidationErrors } from '@angular/forms';

import { isCPF, isCEP, isCNPJ } from 'brazilian-values';

function isEmptyInputValue(value: any): boolean {
    // we don't check for string here so it also works with arrays
    return value == null || value.length === 0;
}
export class ValidatorPadrao {

    static validarCpf(fc: FormControl): ValidationErrors | null {

        if (isEmptyInputValue(fc.value)) {
            return null;  // don't validate empty values to allow optional controls
        }
        if (isCPF(fc.value) || isCNPJ(fc.value)) {
            return null;
        } else {
            return ({ invalido: true });
        }

    }

    static validarCep(fc: FormControl): ValidationErrors | null {

        if (isEmptyInputValue(fc.value)) {
            return null;  // don't validate empty values to allow optional controls
        }
        if (isCEP(fc.value)) {
            return null;
        } else {
            return ({ invalido: true });
        }

    }

}

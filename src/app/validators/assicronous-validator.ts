import { ValidationErrors, AbstractControl, Validator, AsyncValidatorFn } from '@angular/forms';

import { Observable } from 'rxjs';

import { ClienteService } from '../api/service/cliente.service';


export function existingCpfValidator(clienteService: ClienteService): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {

        return clienteService.verificarCpf({ cpf: control.value.replace(/\.|\-/g, '') }).then(
            resul => {
                if (resul.status) {
                    return null;
                } else {
                    return { cpfUsed: true };
                }
            }
        );
    };
}

export function existingEmailValidator(clienteService: ClienteService): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {

        return clienteService.verificarEmail({ email: control.value }).then(
            resul => {
                if (resul.status) {
                    return null;
                } else {
                    return { emailUsed: true };
                }
            }
        );
    };
}

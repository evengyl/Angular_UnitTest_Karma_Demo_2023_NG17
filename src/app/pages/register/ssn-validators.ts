import { AbstractControl, ValidationErrors } from "@angular/forms";

const SSN_PATTERN = /(\d{2}.){2}\d{2}-\d{3}.\d{2}/g;
const SSN_CLEANING_PATTERN = /(\.|-)/g;

export class SSNValidators {
    static ssn(control: AbstractControl): ValidationErrors | null {
        if(!control.value) {
            return null;
        }
        if(!control.value.match(SSN_PATTERN)) {
            return { ssnPattern: true };
        }
        const value = control.value.replace(SSN_CLEANING_PATTERN, '');
        const toControlString = value.substring(0, value.length-2);
        const controlNumber = 97 - parseInt(value.substring(value.length-2));
        if(parseInt(toControlString) % 97 !== controlNumber && parseInt(2 + toControlString) % 97 !== controlNumber) {
            return { ssnControl: true };
        }
        return null;
    }
}
import { Validators } from "@angular/forms";
import { SSNValidators } from "./ssn-validators";

export const RegisterForm = {
    email: [null, [Validators.required, Validators.email], []],
    nationality: [null, [Validators.required]],
    ssn: [null, [Validators.required, SSNValidators.ssn]]
};
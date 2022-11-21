import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators, ValidatorFn, AbstractControl, ValidationErrors} from "@angular/forms"
import { IUser } from "src/app/interfaces/interfaces";
@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss'],
})
export class FormUserComponent implements OnInit {
  @Input() formTitle!: string;
  @Output() mySubmit = new EventEmitter<IUser>();
  formGroup!: FormGroup;
  constructor() {}

  ngOnInit(): void {
    this.formGroup = new FormGroup(
      {
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        passwordConfirmation: new FormControl('', [Validators.required]),
      },
     {validators: this.validateAreEqual}
    );
  }

  get email() {
    return this.formGroup.get('email')!;
  }
  get password() {
    return this.formGroup.get('password')!;
  }
  get passwordConfirmation() {
    return this.formGroup.get('passwordConfirmation')!;
  }

  public validateAreEqual(c: AbstractControl): { notSame: boolean } | null {
    return c.value.password === c.value.passwordConfirmation ? null : { notSame: true };
  }

  handleSubmit() {
    if(this.formGroup.invalid) return
    console.log("ativo")
    this.mySubmit.emit(this.formGroup.value);
  }
}

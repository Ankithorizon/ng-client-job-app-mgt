import { AbstractControl, ValidatorFn } from '@angular/forms';

export default class Validation {
  static match(controlName: string, checkControlName: string): ValidatorFn {
      return (controls: AbstractControl) => {
          const control = controls.get('startDate');
          const checkControl = controls.get('endDate');

          if (checkControl?.errors && !checkControl.errors['matching']) {
              return null;
          }

          var startDate_ = new Date(control.value.year + "/" + control.value.month + "/" + control.value.day);
          var endDate_ = new Date(checkControl.value.year + "/" + checkControl.value.month + "/" + checkControl.value.day);
                    
          if (startDate_ <= endDate_) {  
              return null;
          } else {
              controls.get('endDate')?.setErrors({ matching: true });
              return { matching: true };
          }
      };
  }
}
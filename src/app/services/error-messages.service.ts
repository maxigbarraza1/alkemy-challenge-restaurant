import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessagesService {

  constructor() { }

  getErrorMessage(field:string, errors:any){
    let message:string='';
    if(errors.required){
      message=`The field ${field} is required`;
    }else if(errors.minlength){
      const requiredLength=errors.minlength.requiredLength;
      message=`The field ${field} must have at least ${requiredLength} characters`;
    }else if(errors.maxlength){
      const maxLength=errors.maxlength.requiredLength;
      message=`The field ${field} can not have more than ${maxLength} characters`;
    }else if(errors.pattern){
      message=`The field ${field} is not valid`;
    }
    return message;
  }
}

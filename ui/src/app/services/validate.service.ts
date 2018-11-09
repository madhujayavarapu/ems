import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateUser(user): boolean{
    if(this.isEmpty(user.username) || this.isEmpty(user.password)){
      return false;
    }
    return true;
  }

  checkArray(array): boolean{
    let count = 0;
    if(array.length <= 1 && array[0] == undefined){
      return false;
    }else{
      return true;
    }
  }

  isEmpty(value): boolean{
    if(value == undefined || value == ""){
      return true;
    }
    return false;
  }

  validateBranch(branch): boolean{
    if(this.isEmpty(branch.branch)){
      return false;
    }
    return true;
  }

  validateCompany(company): boolean{
    if( this.isEmpty(company.companyName) || this.isEmpty(company.establishedDate)){
      return false;
    }else if(!this.checkArray(company.awards) || !this.checkArray(company.branches)){
      return false;
    }
    return true;
  }

  validateRegister(user): boolean{
    if(this.isEmpty(user.first_name) || this.isEmpty(user.phone) || this.isEmpty(user.password) ||
       this.isEmpty(user.username) || this.isEmpty(user.role) || this.isEmpty(user.address)){
        
      return false;
    }
    return true;
  }

  validatePinCode(pin): boolean{
    let pinn = pin.toString();
    if(isNaN(pin)){
      return false;
    }else if(pinn.length != 6){
      return false;
    }
    return true;
  }

  validatePhone(num): Boolean{
    let number = num.toString();
    if(isNaN(num)){
      return false;
    }else{
      if(number.length != 10){
        return false;
      }
      return true;
    }
  }
}

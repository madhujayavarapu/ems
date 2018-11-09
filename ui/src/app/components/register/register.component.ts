import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  throbber: String = "none";
  first_name: String;
  last_name: String;
  username: String;
  // address: Object = {
  city: String;
  district: String;
  pincode: Number;
  // };
  phone: Number;
  password: String;
  role: Number;

  constructor(
    private validateSrv: ValidateService,
    private authSrv: AuthService,
    private flashMsgSrv: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegister(){
    this.throbber = "block";
    let daddress = {
      city: this.city,
      district: this.district,
      pincode: this.pincode
    }
    let userData = {
      first_name: this.first_name,
      last_name: this.last_name,
      username: this.username,
      address: daddress,
      phone: this.phone,
      password: this.password,
      role: 3
    }
    if(!this.validateSrv.validateRegister(userData) ){
      this.flashMsgSrv.show("Fill Details first",{cssClass: "alert alert-danger",timeout:3000});
      this.throbber = "none";
    }else if(!this.validateSrv.validatePhone(this.phone)){
      this.flashMsgSrv.show("Enter valid phone number",{cssClass: "alert alert-danger",timeout:3000});
      this.throbber = "none";
    }else if(!this.validateSrv.validatePinCode(this.pincode)){
      this.flashMsgSrv.show("Enter valid Pin Code",{cssClass: "alert alert-danger",timeout:3000});
      this.throbber = "none";
    }else{
      this.authSrv.registerUser(userData).subscribe((res) => {
        if(!res.success){
          this.flashMsgSrv.show(res.msg,{cssClass: "alert alert-danger",timeout: 3000});
          this.router.navigate(['/register']);
          this.throbber = "none";
        }else{
          this.flashMsgSrv.show(res.msg,{cssClass: "alert alert-success",timeout: 3000});
          this.router.navigate(['/login']);
          this.throbber = "none";
        }
      },(err) => {
        console.log(err);
        this.flashMsgSrv.show("Some thing went wrong",{cssClass: "alert alert-danger",timeout:3000});
        this.throbber = "none";
      })
    }
  }

}

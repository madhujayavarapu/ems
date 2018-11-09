import { Component, OnInit} from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  username: String;
  password: String;

  constructor(
    private validateSrv: ValidateService,
    private router: Router,
    private flashMsgSrv: FlashMessagesService,
    private authSrv: AuthService
  ) { }

  ngOnInit() {
    // console.log("OnInit");'
    this.authSrv.logout();
  }

  onLogin(): void{  
    let user = {
      username: this.username,
      password: this.password
    }

    if(!this.validateSrv.validateUser(user)){
      this.flashMsgSrv.show("Fill Details First",{cssClass: "alert alert-danger", timeout: 3000});
    }else{
      this.authSrv.authenticateUser(user).subscribe((res) => {
        console.log(res);
        if(!!res.success){
          this.authSrv.storeUserData(res.token,res.user);
          this.flashMsgSrv.show("Logged in Successfully",{cssClass:"alert alert-success",timeout: 3000});
          this.router.navigate(['/dashboard']);
        }else{
          this.flashMsgSrv.show(res.msg,{cssClass:"alert alert-danger",timeout: 3000});
          this.router.navigate(['/login']);
        }
      },(err) => {
        this.router.navigate(['/login']);
        console.log(err);
      })
    }

  }

}

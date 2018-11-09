import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { CadminService } from '../../services/cadmin.service';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.css']
})
export class AddBranchComponent implements OnInit {

  branch: String;
  companyId: String;

  constructor(
    private router: Router,
    private flashMsgSrv: FlashMessagesService,
    private cadminSrv: CadminService,
    private authSrv: AuthService,
    private validateSrv: ValidateService
  ) { }

  ngOnInit() {
    if(this.authSrv.isLoggedIn()){
      this.companyId = this.authSrv.getDetailsOfUser("companyId");
    }
  }

  addBranch(){
    let newBranch = {
      branch: this.branch,
      companyId: this.companyId
    }

    if(!this.validateSrv.validateBranch(newBranch)){
      this.flashMsgSrv.show("Fill Details first",{cssClass:"alert alert-danger",timeout:3000});
    }else{
      this.cadminSrv.addBranch(newBranch).subscribe((res) => {
        console.log(res);
        if(res.success){
          this.flashMsgSrv.show("Added new branch",{cssClass:"alert alert-success",timeout:3000});
          this.router.navigate(['/dashboard']);  
        }else{
          this.flashMsgSrv.show(res.msg,{cssClass:"alert alert-danger",timeout:3000});
          this.router.navigate(['/addBranch']);
        }
      },(err) => {
        console.log(err);
        if(err.status == 401){
          this.flashMsgSrv.show("Please Login First",{cssClass:"alert alert-danger",timeout:3000});
          this.authSrv.logout();
          this.router.navigate(['/login']);
        }else{
          this.flashMsgSrv.show("Failed to add branch..",{cssClass:"alert alert-danger",timeout:3000});
        }
      })
    }
  }

}

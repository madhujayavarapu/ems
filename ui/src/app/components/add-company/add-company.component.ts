import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AdminService } from '../../services/admin.service';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {

  cname: String;
  award: String;
  branch: String;
  edate: Date;

  constructor(
    private router: Router,
    private flashMsgSrv: FlashMessagesService,
    private adminSrv: AdminService,
    private authSrv: AuthService,
    private validateSrv: ValidateService
  ) { }

  ngOnInit() {
  }

  addCompany(){
    let newCompany = {
      companyName: this.cname,
      awards: [this.award],
      branches: [this.branch],
      establishedDate: this.edate
    }
    console.log(newCompany);

    if(!this.validateSrv.validateCompany(newCompany)){
      this.flashMsgSrv.show("Fill Details first",{cssClass:"alert alert-danger",timeout: 3000});
    }else{
      this.adminSrv.addCompany(newCompany).subscribe((res) => {
        console.log(res);
        if(res.success){
          this.flashMsgSrv.show("Company added successfully",{cssClass:"alert alert-success",timeout:3000});
        }else{
          this.flashMsgSrv.show(res.msg,{cssClass:"alert alert-danger",timeout:3000});
        }
      },(err) => {
        console.log(err);
        if(err.status == 401){
          this.flashMsgSrv.show("Please Login First",{cssClass:"alert alert-danger",timeout:3000});
          this.authSrv.logout();
          this.router.navigate(['/login']);
        }else{
          this.flashMsgSrv.show("Failed to Add this company",{cssClass:"alert alert-danger",timeout:3000});
        }
      })
      
    }
  }
}

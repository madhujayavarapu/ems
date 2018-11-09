import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { CadminService } from '../../services/cadmin.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  empName: String;
  branch: String = "-1";
  designation: String;
  package: Number;
  userId: String;
  companyId: String;
  disableEmp:Boolean = true;

  availableBranches: String[];

  constructor(
    private router: Router,
    private flashMsgSrv: FlashMessagesService,
    private cadminSrv: CadminService,
    private authSrv: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.userId = this.route.snapshot.params['userId'];
    if(this.authSrv.isLoggedIn()){
      this.companyId = this.authSrv.getDetailsOfUser("companyId");
    }

    this.getUserDetails();
    this.getBranches();
  }

  // this will fetch the selected user details
  getUserDetails(){
    let postData = {
      userId: this.userId
    }
    this.authSrv.getUserDetailsByUserId(postData).subscribe((res) => {

      if(res.success){
        this.empName = res.user.username;
      }else{
        this.flashMsgSrv.show("User Not Found",{cssClass: 'alert alert-danger', timout:3000});
      }
    },(err) => {
      if(err.status == 401){
        this.flashMsgSrv.show("Please Login First",{cssClass:"alert alert-danger",timeout:3000});
        this.authSrv.logout();
        this.router.navigate(['/login']);
      }else{
        this.flashMsgSrv.show("something went wrong..plese try again..");
        this.router.navigate(['/employees/unEmpList']);
      }
    });
  }

  // function will redirect to unemployed list
  getUnEmpList(){
    this.router.navigate(['/employees/unEmpList']);
  }

  // retrieve the available branches for this company
  getBranches(){
    let postData = {
      companyId: this.companyId
    }
    this.cadminSrv.getBranchesUnderACompany(postData).subscribe((res) => {
      if(res.success){
        this.availableBranches = res.data.branches;
      }
    },(err) => {
      if(err.status == 401){
        this.flashMsgSrv.show("Please Login First",{cssClass:"alert alert-danger",timeout:3000});
        this.authSrv.logout();
        this.router.navigate(['/login']);
      }else{
        this.flashMsgSrv.show("Failed to retrieve branches",{cssClass:"alert alert-danger",timeout:3000});
      } 
    })
  }

  // hire employee
  addEmployee(){
    let newEmployee = {
      companyId: this.companyId,
      branch: this.branch,
      emp_name: this.empName,
      designation: this.designation,
      package: this.package,
      userId: this.userId,
    }

    this.cadminSrv.addEmployee(newEmployee).subscribe((res) => {
      
      if(res.success){
        this.flashMsgSrv.show(res.msg,{cssClass:"alert alert-success",timeout:3000});
        this.router.navigate(['/employees']);
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
        this.flashMsgSrv.show("Failed to add employee",{cssClass: "alert alert-danger",timeout: 3000});
      }
    })
    
  }


}

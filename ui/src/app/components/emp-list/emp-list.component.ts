import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { CadminService } from '../../services/cadmin.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.css']
})
export class EmpListComponent implements OnInit {

  employees: any[];
  user: Object;
  noData: boolean = true;
  throbber: String = "none";

  constructor(
    private router: Router,
    private flashMsgSrv: FlashMessagesService,
    private cadminSrv: CadminService,
    private authSrv: AuthService
  ) { }

  ngOnInit() {
    if(this.authSrv.isLoggedIn()){
      this.user = this.authSrv.getDetailsOfUser("companyId");      
      this.empList(this.user);
    }
  }

  deleteEmp(employee){
    this.throbber = "block";
    
    let postData = {
      employeeId: employee._id,
      userId: employee.userId
    }
    
    this.cadminSrv.deleteEmployee(postData).subscribe((res) =>{
      if(res.success){
        this.flashMsgSrv.show(res.msg,{cssClass: "alert alert-success",timeout:3000});
        this.empList(this.user);
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
        this.flashMsgSrv.show("Failed to delete",{cssClass:"alert alert-danger",timeout:3000});
      }
    })
  }

  hireEmployee(){
    this.flashMsgSrv.show('You can Hire from these people',{cssClass: 'alert alert-info',timeout: 3000});
    this.router.navigate(['employees/unEmpList']);
  }

  empList(id){
    this.throbber = "block";
    
    let postData = {
      companyId: id
    }
    
    this.cadminSrv.getEmployeeList(postData).subscribe((res) => {
      if(res.success){
        this.employees = res.employees;
        this.noData = false;
      }
      this.throbber = "none";
    },(err) => {
      this.throbber = "none";
      this.noData = true;
      console.log(err);
      if(err.status == 401){
        this.flashMsgSrv.show("Please Login First",{cssClass:"alert alert-danger",timeout:3000});
        this.authSrv.logout();
        this.router.navigate(['/login']);
      }
    });
  }

}

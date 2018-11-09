import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { CadminService } from '../../services/cadmin.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-unemplist',
  templateUrl: './unemplist.component.html',
  styleUrls: ['./unemplist.component.css']
})
export class UnemplistComponent implements OnInit {

  throbber: String = "none";
  employees: any[];
  noData: boolean = true;

  constructor(
    private router: Router,
    private flashMsgSrv: FlashMessagesService,
    private cadminSrv: CadminService,
    private authSrv: AuthService
  ) { }

  ngOnInit() {
    this.getListOfUnemployed();
  }

  addEmployee(emp){
    this.router.navigate(['employees/unEmpList/addEmployee/',emp._id]);
  }

  getListOfUnemployed(){
    this.throbber = "block";
    this.cadminSrv.getUnEmployeeList().subscribe((res) => {
      
      if(res.success){
        this.employees = res.users;
        this.noData = this.employees.length == 0 ? true : false;
      }else{
        this.noData = true;
      }
      this.throbber = "none";
    },(err) => {
      console.log(err);
      this.throbber = "none";
      if(err.status == 401){
        this.flashMsgSrv.show("Please Login First",{cssClass:"alert alert-danger",timeout:3000});
        this.authSrv.logout();
        this.router.navigate(['/login']);
      }else{
        this.flashMsgSrv.show("Failed to retrieve unemployed list",{cssClass:"alert alert-danger",timeout:3000});
      }
    })
  }

}

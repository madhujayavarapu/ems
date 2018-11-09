import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.css']
})
export class CompaniesListComponent implements OnInit {

  companiesList: any[];
  throbber = "none";

  constructor(
    private authSrv: AuthService,
    private flashMsgSrv: FlashMessagesService,
    private router: Router,
    private adminSrv: AdminService,
    private utilsSrv: UtilsService
  ) { }

  ngOnInit() {
    this.getCompaniesList();
  }

  formatCompany(companies){
    companies.forEach(element => {
      element.eod = this.utilsSrv.formatDate(element.eod);
    });
    return companies;
  }

  addCompany(){
    this.router.navigate(['/companies/addCompany']);
  }

  getCompaniesList(){
    this.throbber = "block";
    this.adminSrv.getCompaniesList().subscribe((res) => {
      if(!!res.success){
        this.companiesList = this.formatCompany(res.companies);
      }else{
        this.flashMsgSrv.show(res.msg,{cssClass:"alert alert-danger",timeout:4000});
      }
      this.throbber = "none";
    },(err) => {
      this.throbber = "none";
      if(err.status == 401){
        this.flashMsgSrv.show("Please Login First",{cssClass:"alert alert-danger",timeout:3000});
        this.authSrv.logout();
        this.router.navigate(['/login']);
      }else{
        this.flashMsgSrv.show("Something went wrong",{cssClass:"alert alert-danger",timeout:3000});
      }
    })
  }

}

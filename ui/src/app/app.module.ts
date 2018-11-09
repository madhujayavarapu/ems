import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from './services/auth.service';
import { ValidateService } from './services/validate.service';
import { AdminService } from './services/admin.service';
import { CadminService } from './services/cadmin.service';
import { AuthGuard } from './guard/auth.guard';

import { appRoutes } from './app.routes';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddCompanyComponent } from './components/add-company/add-company.component';
import { CompaniesListComponent } from './components/companies-list/companies-list.component';
import { EmpListComponent } from './components/emp-list/emp-list.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { DeleteEmpComponent } from './components/delete-emp/delete-emp.component';
import { DeleteCompanyComponent } from './components/delete-company/delete-company.component';
import { AddBranchComponent } from './components/add-branch/add-branch.component';
import { UnemplistComponent } from './components/unemplist/unemplist.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    AddCompanyComponent,
    CompaniesListComponent,
    EmpListComponent,
    AddEmployeeComponent,
    DeleteEmpComponent,
    DeleteCompanyComponent,
    AddBranchComponent,
    UnemplistComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule
  ],
  providers: [
    FlashMessagesService,
    AuthService,
    ValidateService,
    CadminService,
    AuthGuard,
    AdminService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

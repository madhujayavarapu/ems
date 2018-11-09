import { Routes,CanActivate } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddCompanyComponent } from './components/add-company/add-company.component';
import { CompaniesListComponent } from './components/companies-list/companies-list.component';
import { EmpListComponent } from './components/emp-list/emp-list.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { DeleteCompanyComponent } from './components/delete-company/delete-company.component';
import { DeleteEmpComponent } from './components/delete-emp/delete-emp.component';
import { AddBranchComponent } from './components/add-branch/add-branch.component';
import { UnemplistComponent } from './components/unemplist/unemplist.component';
import { AuthGuard } from './guard/auth.guard';


export const appRoutes: Routes = [
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'login', component:LoginComponent},  
    {path:'register', component: RegisterComponent},
    {path:'dashboard',canActivate: [AuthGuard],component: DashboardComponent},
    {path:'addCompany',canActivate: [AuthGuard], component: AddCompanyComponent
        // data: {
        //     expectedRole: 1
        // } 
    },
    {path:'companies', canActivate: [AuthGuard], component: CompaniesListComponent
        // data: {
        //     expectedRole: 1
        // } 
    },
    {path:'deleteCompany', canActivate: [AuthGuard], component: DeleteCompanyComponent
        // data: {
        //     expectedRole: 1
        // } 
    },        
    {path:'employees',canActivate: [AuthGuard], component: EmpListComponent
        // data: {
        //     expectedRole: 2
        // } 
    },
    {path:'employees/unEmpList',canActivate: [AuthGuard], component: UnemplistComponent
        // data: {
        //     expectedRole: 2
        // } 
    },
    {path:'employees/unEmpList/addEmployee/:userId', canActivate: [AuthGuard], component: AddEmployeeComponent
        // data: {
        //     expectedRole: 2
        // } 
    },
    {path:'deleteEmp',canActivate: [AuthGuard],component: DeleteEmpComponent
        // data: {
        //     expectedRole: 2
        // } 
    },
    {path:'addBranch',canActivate: [AuthGuard],component: AddBranchComponent
        // data: {
        //     expectedRole: 2
        // } 
    }
];
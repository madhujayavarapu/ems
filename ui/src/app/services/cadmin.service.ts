import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http,Headers } from '@angular/http';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CadminService {

  constructor(
    private http: Http,
    private authSrv: AuthService
  ) { }

  url:String = "http://localhost:3000/";

  setHeaders(): Headers{
    let token = this.authSrv.getToken();
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    headers.append('Authorization',token);
    return headers;
  }

  getEmployeeList(postData): Observable<any>{
    let headers = this.setHeaders();
    return this.http.post(this.url+'emp/empUnderACompany',postData,{headers:headers}).pipe(map((res) => res.json()));
  }

  deleteEmployee(postData): Observable<any>{
    let headers = this.setHeaders();
    return this.http.post(this.url+"emp/deleteEmp",postData,{headers:headers}).pipe(map((res) => res.json()));
  }

  
  getBranchesUnderACompany(postData): Observable<any>{
    let headers = this.setHeaders();
    return this.http.post(this.url+'company/getBranchesUnderACompany',postData,{headers:headers})
            .pipe(map((res) => res.json()));
  }

  getUnEmployeeList(): Observable<any>{
    let headers = this.setHeaders();
    return this.http.get(this.url+'users/unempList',{headers:headers}).pipe(map((res) => res.json()));
  }

  addEmployee(postData): Observable<any>{
    let headers = this.setHeaders();
    return this.http.post(this.url+'emp/addEmployee',postData,{headers:headers}).pipe(map((res) => res.json()));
  }

  addBranch(postData): Observable<any>{
    let headers = this.setHeaders();
    return this.http.post(this.url+'company/addBranch',postData,{headers:headers}).pipe(map((res) => res.json()));
  }
}

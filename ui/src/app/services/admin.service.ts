import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http,Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: Http,
    private authSrv: AuthService
  ) { }

  url: String = "http://localhost:3000/company/";
  

  addCompany(company): Observable<any>{
    let token = this.authSrv.getToken();
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    headers.append('Authorization',token);
    return this.http.post(this.url+"addCompany",company,{headers:headers}).pipe(map((res) => res.json()));
  }
}

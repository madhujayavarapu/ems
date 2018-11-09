import { Injectable } from "@angular/core";
import { Router,CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { FlashMessagesService } from "angular2-flash-messages";
import decode from 'jwt-decode';

@Injectable()
export class AuthGuard implements CanActivate{
   constructor(
       private authSrv: AuthService,
       private router: Router,
       private flashMsgSrv: FlashMessagesService
   ){}

   canActivate(route: ActivatedRouteSnapshot): boolean{
        // const expectedRole = route.data.expectedRole;

        // const token = localStorage.getItem('token');

        // const tokenPayload = decode(token);

        // || tokenPayload.role !== expectedRole need to add this conditon when you are checking for roles

       if(!this.authSrv.isLoggedIn()){
            this.flashMsgSrv.show("Please login First",{cssClass: "alert alert-warning",timeout: 3000});
            this.router.navigate(['/login']);
            return false;  
       }
       return true;
   }
}
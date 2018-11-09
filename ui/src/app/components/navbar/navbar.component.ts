import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  username: String;
  user: Object;

  constructor(
    private authSrv: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMsgSrv: FlashMessagesService
    ){
    // this.route.params.subscribe((params: Params) => {
    //   this.getUserDetails();
    // });
    router.events.subscribe((val) => {
      this.getUserDetails();
    })
   }

  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails(){
    if(this.authSrv.isLoggedIn()){
      this.username = this.authSrv.getDetailsOfUser("username");
      this.user = this.authSrv.getDetailsOfUser("all");      
    }
  }

  onLogout(){
    this.authSrv.logout();
    this.flashMsgSrv.show("You are logged out",{cssClass: "alert-success",timeout:5000});
    this.router.navigate(['/login']);
    return false;
  }

}

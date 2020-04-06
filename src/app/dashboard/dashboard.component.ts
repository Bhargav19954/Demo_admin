import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public user_data : any =[];

  constructor( private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    let users = JSON.parse(localStorage.getItem('userInfo'));
    if(!users){
      this.router.navigate(['login']); 
    } 
    else{
      this.loginService.getUsers().subscribe(
        (data: any) => {
         this.user_data = data.data;
        }, (error) => {
          console.log(error)
          return;
        });
    }
  
  }

  openProfile(data) {
    this.router.navigate(['profile/' + data.id]);
  }

  logout(){
    localStorage.removeItem('userInfo');
    this.router.navigate(['login']);
  }

}

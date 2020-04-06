import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public users : any =[];

  constructor(private route: ActivatedRoute,
    private router: Router, private loginService: LoginService,) { }

  ngOnInit() {
    this.getUserData();
  }

  getUserData(){
    let users = JSON.parse(localStorage.getItem('userInfo'));
    if(!users){
    this.router.navigate(['login']); 
    }
    else if(!users.is_admin){
      this.users  = users;
    }
    else{
      let user_id = this.route.snapshot.params.id
      console.log(user_id);
      this.loginService.getUser(user_id).subscribe(
        (data: any) => {
          console.log(data)
         this.users = data.data;
        }, (error) => {
          console.log(error)
          return;
        });

    }
  }

  logout(){
    localStorage.removeItem('userInfo');
    this.router.navigate(['login']);
  }


}

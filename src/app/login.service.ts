import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _httpService: HttpService) { }

  login(email, password): Observable<HttpResponse<any>> {
    return this._httpService.post('http://localhost:3000/login', { email, password });
  }

  getUsers(): Observable<HttpResponse<any>> {
    return this._httpService.get('http://localhost:3000/users');
  }

  getUser(id): Observable<HttpResponse<any>> {
    return this._httpService.get('http://localhost:3000/user/'+id)
  }

}

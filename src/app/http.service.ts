import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient ) { }

  post(url, body, options?): Observable<any> {
    return this.httpClient.post(url, body, { headers: options });
  }

  get(url, options?): Observable<any> {
    return this.httpClient.get(url, { headers: options });
  }


}

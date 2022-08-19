import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class RestapiService {

  private baseURL = "http://localhost:8080/api/springboot";

  constructor(private httpClient: HttpClient, private config: ConfigService) { }

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  // getallpost(): Observable<any> {
  //  return this.http.get<any>(
  //    this.config.readConfig().apiUrl + '/api/springboot/getallpost'
  //  );
  // }
  getallpost(): Observable<any>{
    return this.httpClient.get<any[]>(`${this.baseURL}`);
  }

  addPost(addpost: any): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, addpost);
  }

  // addPost(addpost: any): Observable<any> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  //   };
  //   return this.httpClient.post<any>(`${this.baseURL}`,addpost);
  // }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  serviceURL : string = "http://127.0.0.1:5000"
  constructor(private http : HttpClient) { }

  getQustions(text : any) : Observable<any> {
    return this.http.post<any>(this.serviceURL+'/getQuestions', text)
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Container } from '../models/container';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContainersService {

  // API_URI = 'http://localhost:5300/api';

  constructor(private http: HttpClient) { }

  getContainers() {
    // return this.http.get(`${this.API_URI}/containers`);
    return this.http.get(`/api/containers`);
  }

  getContainerOne(idcont: String) {
    return this.http.get(`/api/containers/${idcont}`)
  }

  getCountainerbyNumber(ctnumber: Number) {
    return this.http.get(`/api/containers/number/${ctnumber}`)
  }

  setClient(id:string, body:any) {
    return this.http.put<any>(`/api/containers/${id}`, body);
  }
}

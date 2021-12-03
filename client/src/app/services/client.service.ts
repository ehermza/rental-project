import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  getClient(idclient: String) {
    console.log(`(ClientService) said: /api/clients/${idclient}`);
    return this.http.get(`/api/clients/${idclient}`);
  }
  
  createClient(body:any) {
    return this.http.post('/api/clients/', body);
    
  }

  updateClient(idclient: string, body:any) {
    // return this.http.put('/api/clients/', body);
    return this.http.put(`/api/clients/${idclient}`, body);
  }
}

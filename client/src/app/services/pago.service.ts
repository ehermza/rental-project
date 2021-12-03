import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PagoService {

  constructor(
    private http:HttpClient
  ) { }

  getPagosAll() {
    return this.http.get('/api/pagos/');
  }

  createPago(body:any){
    return this.http.post('/api/pagos/', body);
  }

  getPagoByClient(idClient:string, nCtner:Number) {
    return this.http.get(`/api/pagos/${idClient}&${nCtner}`);
  }
}

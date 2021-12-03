import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DebtInfoService {
  

  constructor(private http:HttpClient) { 
    
  }

  getListDebts() {
    return this.http.get("/api/informe");
    
  }
}

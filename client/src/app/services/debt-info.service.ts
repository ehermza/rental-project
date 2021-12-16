import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DebtInfoService {

  VALUE_PER_CLICK: number = 0;

  constructor(private http: HttpClient) {

  }

  getListDebts() {
    return this.http.get("/api/informe");

  }

  insertDebtPeriod() {
    return this.http.get("/api/rental/insertdebt");
  }
}

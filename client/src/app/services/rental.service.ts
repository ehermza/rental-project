import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { format } from 'date-fns';

import { IRental, Rental, RgtPago } from '../models/Rental';


@Injectable({
  providedIn: 'root'
})
export class RentalService
 {
  public alquiler: IRental = {
    id_client: '',
    id_container: '',
    id_debtinfo: '',

    active: false,
    date_init: new Date,
    date_final: new Date,
    deuda_total: -1,
    deuda_register: [],
    pagos_total: -1,
    pagos_register: [],
    last_payment: {
      period: '', 
      a_cta: 0
    }    
  };
  public pagos: RgtPago[] = [];
  public container: string = "";
  public blEmptyTable: string = "";
  public aCtaProxPayment: number= -1;

  constructor(
    private http: HttpClient
  ) { }

  createRentalService(body: any) {
    return this.http.post('/api/rental/', body);
  }

  createPaymentService(body: any) {
    return this.http.post('/api/rental/pagos/', body);
  }

  getACtaProxPayment() {
    // return this.alquiler.last_payment.a_cta;
  }
  getRentalByCtner(idctner?: string) {
    /**
     * Action: Get one Rental active Object by Container Number
     * Date: 19 Sept, 2021 Author: EHER
     */
    this.container = (!idctner) ? this.container : idctner;

    this.http.get(`/api/rental/container/${this.container}`)
      .subscribe((res) => {
        const obj: any = res;
        if (!obj) {
          return;
        }
        this.alquiler = obj;
        /** (this.alquiler) muestra todos los datos de alq. en la tabla 
         *  table-pays.component.html */

        this.pagos = this.alquiler.pagos_register.map(formatDate);
        this.blEmptyTable = (!this.pagos.length) ? "Not Payments" : "";
        this.aCtaProxPayment = this.alquiler.last_payment.a_cta;
      });
  }

  deletePaymentService(recibo: string) {
    /**
     * Action: Delete Payment by id Container
     * @param body Recibo Number, idConteiner
     * @returns Rental object 
     */
    const idctner = this.alquiler.id_container;

    return this.http.delete<Rental>(`/api/rental/pagos/${recibo}&${idctner}`);
  }

  getSaldoActual(idCtner: string) {
    /** 
     * deprecated! */
    return this.http.get<any>(`/api/rental/saldo/${idCtner}`);
  }

}

function formatDate(objeto: any) {
  const dt = new Date(objeto.paid_at);
  console.log(dt);
  objeto.paid_str = format(dt, 'dd/MM/yyyy');
  return objeto;
}

import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
// import { FormGroup,  FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { ClientService } from 'src/app/services/client.service';
import { RentalService } from 'src/app/services/rental.service';

import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/Client';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RgtPago } from 'src/app/models/Rental';

@Component({
  selector: 'app-form-client',
  templateUrl: './form-client.component.html',
  styleUrls: ['./form-client.component.css']
})
export class FormClientComponent implements OnInit {

  @Input() CLIENT: any = {};

  submitted = false;
  idclient: string = '';
  urlpath: string = '';
  saldoActual: number = -1;

  model: Client = new Client();

  constructor(
    // private route: ActivatedRoute,
    private router:Router,
    private http: HttpClient,
    private clientService: ClientService,
    private rentalService: RentalService
  ) { }

  formClient = new FormGroup({
    name:new FormControl('',Validators.required), 
    telephone: new FormControl(),
    business: new FormControl(),
    pagos_total: new FormControl(),
    saldo_act: new FormControl(),
  });

  i_getSaldoActual():number
  {
     /**
      * deprecated! urgent to correct, 
      * este dato deberia obtenerse from Rental model
      */
    const {pagos_total, deuda_total} = this.CLIENT;
    // console.log('get current by client-form: ', this.model) 
    const difer = pagos_total - deuda_total;
    console.log(`get saldo actual: ${difer} `);
    return difer;
  }

  getSaldoActual() {
    console.log("idclient of getsaldoactual: ", this.idclient);
    this.rentalService.getSaldoActual(this.idclient)
    .subscribe( res => {
      const {saldo} = res;
      this.saldoActual = saldo;
      console.log('GETSALDOACTUAL: ', res);
    });
  
  }

  ngOnChanges(changes: SimpleChanges) 
  {
    let id: string = this.CLIENT._id;
    if (id== ''|| !id) return;

    if (!this.submitted) {
      this.submitted = true;
      // this.model.setId(this.CLIENT._id);
      this.idclient = id;
      this.getSaldoActual();
    }
    this.model = this.CLIENT;
    // this.formClient.   // continue..!
    // console.log("ngOnChanges(): ", this.model);
  }

  ngOnInit(): void {
  }

  Enviar() {
    this.submitted = true;

    this.http.put<any>(`/api/clients/${this.idclient}`, this.model)
      .subscribe(
        data => { console.log(data) }
      );
      this.router.navigate(['/clients/alert/200']);
  }
}

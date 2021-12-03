import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { format } from 'date-fns';

import { Contenedor } from 'src/app/models/Contenedor';

import { ContainersService } from 'src/app/services/containers.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-form-add-pay',
  templateUrl: './form-add-pay.component.html',
  styleUrls: ['./form-add-pay.component.css']
})

export class FormAddPayComponent implements OnInit 
{
  @Input() CONTAINER: string= "";  

  dataSource: any = [];

    model: any = {      
    };
    idClient: string = '-1';
    objctner: Contenedor|null = null;
    readonly: Boolean= false;
    
    cliente : string = '';

  constructor(
    private containerService: ContainersService,
    private rentalService: RentalService,
    private router: Router
  ) { }

/*   
  formSelect = new FormGroup({
    container: new FormControl('', Validators.required),
  });
  formDebt = new FormGroup({
    per: new FormControl('', Validators.required),
  });
 */
  formAddPayment = new FormGroup({
    // container: new FormControl('', Validators.required),
    saldo: new FormControl('', Validators.pattern(/^[0-9]*$/)),
    value: new FormControl('', Validators.pattern(/^[0-9]*$/)),
    recibo_n: new FormControl('', Validators.pattern(/^[0-9]*$/)),
  });

  ngOnInit(): void 
  {
    this.model.container= this.CONTAINER;
    console.log(this.CONTAINER);
    this.printPaymentsOnTable();
     this.getContainer();
    // this.debt.per= "";
  }

  getContainer() {
    this.containerService.getContainerOne(this.CONTAINER) 
      .subscribe(
        (res) => {
          console.log( "CONTAINER: ", res);
          const obj: any= res;
          this.objctner = obj;
          this.cliente = (!this.objctner)? "EHER": this.objctner.rented_by; 
        },
        (ERR) => {
          this.cliente = "ERROR!";
        }
      )
  }
/* 
  getContainers() {
    this.containerService.getContainers()
      .subscribe(
        (res) => {
          const list: any = res;
          this.dataSource = list.filter(filtrar);
          this.model.container = "";
          // console.log(this.dataSource);
        },
        (err) => console.error(err)
      );
  }
 */  
  getSaldoActual() {
    const d= this.rentalService.alquiler.deuda_total;
    const p= this.rentalService.alquiler.pagos_total;
    // const importe: String = "$ ";
    return "$ ".concat((d-p).toString());
    
  }
  insertPagotoDB() {}

  insertPerDebt(){
  }
  
  setClientProperty() {
      if(this.objctner==null) return;

      this.idClient = this.objctner.rented_by_id;
  }

  alertar(idurl:number) {
    this.router.navigate([`clients/alert/${idurl}`]);
  }

  onSubmit() {
    // const id = this.model.getIdClient();
    const idCtner = this.model.container;
    console.log("id container: ", this.model.container);
    this.rentalService.createPaymentService(this.model)
      .subscribe(
        res => this.alertar(210),
        err => this.alertar(440)
    )
  }

  printPaymentsOnTable()
  {
    // const {container} = this.model;
    const id:string = this.CONTAINER;
    this.model.container= id;
      console.log(id);
    this.rentalService.getRentalByCtner(id);
    this.readonly = false;
  }
}

function filtrar(objeto: any) {
    return (objeto.active);
  }

  function formatDate(objeto:any)
   {
    const dt= new Date(objeto.paid_at);
    console.log(dt);
    objeto.paid_str = format(dt, 'dd/MM/yyyy');
    return objeto;
  }

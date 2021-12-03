// import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { format } from 'date-fns';
// import { pipe } from "rxjs";
import { map } from "rxjs/operators";
import { Pago } from 'src/app/models/Pago';

import { PagoService } from 'src/app/services/pago.service';
import { RentalService } from 'src/app/services/rental.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-table-pays',
  templateUrl: './table-pays.component.html',
  styleUrls: ['./table-pays.component.css']
})
export class TablePaysComponent implements OnInit {

  dataSource: any = [];
  // aCtaPayment: number = -1;
  displayedColumns: string[] = ['paid_at', 'period', 'value', 'recibo_n', '_id'];
  emptyAlertMsg: string = "";
  title: string = "Registro de Pagos";
  
  constructor(
    private pagoService: PagoService,
    public rentalService: RentalService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  printdate(date: string) {
    console.log(`fecha: ${date}`);
  }

  alertar(state: number) {
    this.router.navigate([`/clients/alert/${state}`]);

  }

  deletePayment(idpayment: string) 
  {
    if (!confirm('Estas a punto de borrar un registro de pago. Confirmar?')) {
      return;
    }
    // this.rentalService.deletePaymentService(idpayment, idctner)
    this.rentalService.deletePaymentService(idpayment)
      .subscribe(res => {
        alertar(410);
        this.rentalService.getRentalByCtner();
      });
  }
}

function filtrar(objeto: Pago) {
  const dt = new Date(objeto.paid_at);
  console.log(dt);
  objeto.paid_str = format(dt, 'dd/MM/yyyy');
  return objeto;
}

export async function fireSwal(objeto: any)
 {
  const { title, text, icon, timer } = objeto;
  await Swal.fire({
    title: title,
    text: text,
    icon: icon,
    timer: timer,
    showConfirmButton: (!timer),
    // timerProgressBar:
    // toast:
    position: 'center',
    allowOutsideClick: true,
    showCloseButton: false,
    confirmButtonText: 'Aceptar'
  });
};

function alertar(state: number)
 {
  console.log(`state alert: ${state}`);

  const MSTIMER = 3000;
  var message, title = "";
  var objeto = {};
  switch (state) {
    case 413:
      objeto = {
        title: "Error al agregar cliente",
        text: "Intentalo de vuelta por favor!",
        icon: 'error',
        timer: undefined
      }
      break;
    case 410:
      objeto = {
        title: 'Pago eliminado',
        text: 'Registro de pago eliminado de la base de datos.',
        icon: 'success',
        timer: MSTIMER
      }
      break;
  }
  fireSwal(objeto);
}


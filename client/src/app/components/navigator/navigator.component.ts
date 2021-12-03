import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})

export class NavigatorComponent implements OnInit {

  constructor(private route: ActivatedRoute) {}

  title: string= "RENTAL WEB by EHER";

  ngOnInit(): void
  {
    const url = new URL(window.location.href);
    console.log(url.href);
    if(url.href.indexOf('alert/')==-1){
      console.log('alert not exists!');
      return;
    }
    // if (!url.searchParams.get('alert')) {
    let idByUrl = this.route.snapshot.paramMap.get("id");
    console.log(idByUrl);
    
    if (idByUrl != null) {
      this.iniciar(idByUrl);  
     }
  }
  
  iniciar(alertNumber:string) 
  {
    console.log(`alertNumber: ${alertNumber}`);
    // const url = new URL(window.location.href);
    // console.log(url);
    // const alert_id = url.searchParams.get('alert');

    const MSTIMER = 3000;
    var message, title = "";
    var objeto = {};
    switch (alertNumber) {
      case '430':
        objeto = {
          title: "Error al agregar cliente",
          text: "Intentalo de vuelta por favor!",
          icon: 'error',
          timer: undefined
        }
        break;
      case '259':
        objeto = {
          text: "El Contenedor seleccionado ya se encuentra alquilado. Deberías desvincular Cliente en 'Editar'",
          title: "Error al agregar cliente",
          icon: 'error',
          timer: undefined
        }
        break;
      case '200':
        objeto = {
          title: 'Cliente actualizado',
          text: 'Sus Datos fueron cargados con éxito.',
          icon: 'success',
          timer: MSTIMER
        }
        break;
      case '210':
        objeto = {
          title: 'Pago ingresado',
          text: 'Registro de pago cargado a la base de datos.',
          icon: 'success',
          timer: MSTIMER
        }
        break;
      case '440':
        objeto = {
          title: "Error al insertar pago",
          text: "Es posible que no haya conexión con la base de datos.",
          icon: 'error',
          timer: undefined
        }
        break;
      case '437':
        objeto = {
          title: "Error al actualizar importe",
          text: "Can't update the rental value.",
          icon: 'error',
          timer: undefined
        }
        break;
        case '260':
        objeto = {
          title: 'Cliente Desvinculado',
          text: 'El contenedor queda disponible para nuevo alquiler.',
          icon: 'success',
          timer: MSTIMER
        }
        break;

      default:
    };
    if (alertNumber != null) fireSwalError(objeto);
  }

}

export async function fireSweetAlert(idpago: string)
 {
  const result = await Swal.fire({
    title: 'Borrar Pago',
    text: 'Estás a punto de eliminar un registro de Pago. ',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    confirmButtonText: `Confirmar`
  });

  if (result.isConfirmed) {
    {
      // window.location = `/pagos/delete/${idpago}`
    }
  };
};

export async function fireSwalError(objeto: any)
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


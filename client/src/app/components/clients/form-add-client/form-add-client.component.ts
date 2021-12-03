import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/Client';
import { Contenedor } from 'src/app/models/Contenedor';

import { ClientService } from 'src/app/services/client.service';
import { RentalService } from 'src/app/services/rental.service';
import { ContainersService } from '../../../services/containers.service';


@Component({
  selector: 'app-form-add-client',
  templateUrl: './form-add-client.component.html',
  styleUrls: ['./form-add-client.component.css']
})

export class FormAddClientComponent implements OnInit {

  idCtner: string = '';
  idClient: string = '';
  
  list: any = [];
  dataSource: any = [];

  submitted = false;
  model: Contenedor = new Contenedor(true);

  constructor(
    // private fb: FormBuilder,    // for validate form
    private router:Router,
    private ctnerService: ContainersService,
    private clientService: ClientService,
    private alquilerService: RentalService,
    private http: HttpClient
  ) { }

  formAddClient = new FormGroup({
     id_container: new FormControl(),
    rented_by: new FormControl ('', Validators.required),
    price_tocharge: new FormControl ('', Validators.pattern(/^[0-9]*$/)),
    active: new FormControl(true)

  })

  validateform() {
  }

  ngOnInit(): void {
    // this.validateform()
    this.getContainers();
    console.log(this.dataSource);
  }

  getContainers() {
    this.ctnerService.getContainers()
      .subscribe(
        res => {
          this.list = res;
          this.dataSource = this.list.filter(filtrar);
        },
        err => {
          console.error(err)
        }
      );
  }

  createAlquilerObj() 
  {
    /**
     * Insert Rental to Server: POST /api/rental/
     */
     const keys = {
      "ptr_client": this.idClient,
      "ptr_ctner" : this.idCtner,
      "client_name": this.model.rented_by, 
      "ctner_number": this.model.id_container
    }
    this.alquilerService.createRentalService(keys)
      .subscribe(
        (res) => {
        this.router.navigate(['/clients/alert/200']);
        },  
        (err) => console.log(err)
      ) 
  }

  linkClientByCtner()
   {
    console.log('(form-add-client) id ctner identified: ', this.idCtner);
    console.log('(form-add-client) id client created: ', this.idClient);

    this.model.rented_by_id = this.idClient;
    /**
     * Update container to Server: PUT /api/containers/:id
     */
    this.ctnerService.setClient(this.idCtner, this.model)
      .subscribe(
        (res) => {
          console.log( 'CtnerService.setClient() ', res);
          this.createAlquilerObj();
        } ,
        (err) => console.log(err)
      );
  }

  addClient() {
    const client: Client = new Client(true);          // nuevo client obj
    const clientname: string = this.model.rented_by;  // extraigo client name del form
    client.setAtributtes(clientname);                 //  ...lo asigno al client obj.
    /**
      Insert New Client to Server: POST /api/clients/ 
     */
    this.clientService.createClient(client).subscribe(
      (data) => {
        console.log('this.clientService.createClient: ', data);
        const obj: any = data;
        this.idClient = obj._id;      // get _id client
        this.linkClientByCtner();
      },
      (err) => { console.log(err); }
    );
  }

  submit() {
    if (this.submitted) return;
    this.submitted = true;

    let ctnumber: Number = this.model.id_container;
    this.ctnerService.getCountainerbyNumber(ctnumber)
      .subscribe(
        (data) => {
          const ctner: any = data;
          this.idCtner = ctner._id;
          this.addClient();
        },
        (err) => console.log(err)
      );
  }

}

function filtrar(objeto: any) {
  return (objeto.rented_by == "");
}

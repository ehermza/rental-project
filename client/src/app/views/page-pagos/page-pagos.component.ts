import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-pagos',
  templateUrl: './page-pagos.component.html',
  styleUrls: ['./page-pagos.component.css']
})
export class PagePagosComponent implements OnInit {

  constructor(route:ActivatedRoute) 
  {     
    this.idcont = route.snapshot.params.id;
  }
  idcont: string= '';
  // idcont:string = "614165dd08cdba49f58efec3";
  

  ngOnInit(): void {
  }

}

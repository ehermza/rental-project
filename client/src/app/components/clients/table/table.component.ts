import { Component, HostBinding, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ContainersService } from 'src/app/services/containers.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {
  // @HostBinding('class') classes = 'row';
  displayedColumns: string[] = [
    'id_container',
    'rented_by',
    'price_tocharge',
    'active',
     '_id', 
     'atr'
    ];
  DATOS: any = [];
  dataSource: any;
  list:any= [];
  
  constructor(private gameService: ContainersService) {
  }

  ngOnInit(): void {
    this.getContainers();
    // this.aviso = Date.now().toString();
  }
  
  getContainers() {
    this.gameService.getContainers()
    .subscribe(
      (res) => {
        this.list = res;
        this.DATOS = this.list.filter(filtrar);
        this.dataSource= new MatTableDataSource(this.DATOS);
        // this.dataSource = this.list.filter(filtrar);
        },
        (err) => console.error(err)
      );
  }
  aviso: string = "";
  
  applyFilter(event: Event) {
    
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    // this.aviso = filterValue;
  }
}

function filtrar(objeto:any) {
  return (objeto.active);
}
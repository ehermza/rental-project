import { Component, HostBinding, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';

import { ContainersService } from 'src/app/services/containers.service';

// import DeleteIcon from '@mui/icons-material/Delete';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {
  // @HostBinding('class') classes = 'row';

  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // dataSource = ELEMENT_DATA;
  displayedColumns: string[] = ['id_container','rented_by','price_tocharge','active', '_id', 'atr'];
  dataSource: any= [];
  list:any= [];
  
  constructor(private gameService: ContainersService) {
  }

  ngOnInit(): void {
    this.getContainers();
    // console.log(this.dataSource);
  }
  
  getContainers() {
    this.gameService.getContainers()
    .subscribe(
      (res) => {
        this.list = res;
        this.dataSource = this.list.filter(filtrar);
        // console.log(this.games);
        },
        (err) => console.error(err)
      );
  }

}

function filtrar(objeto:any) {
  return (objeto.active);
}
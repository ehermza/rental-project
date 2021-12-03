import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { ActivatedRoute } from '@angular/router';
import { IDebt } from 'src/app/models/Debt';
import { DebtInfoService } from 'src/app/services/debt-info.service';


/**
 * @title Table with filtering
 */
@Component({
  selector: 'app-debt-table',
  templateUrl: './debt-table.component.html',
  styleUrls: ['./debt-table.component.css']
})


export class DebtTableComponent implements OnInit {
  // aDebt: IDebt[] = [];
  DEUDAS: any = [];

  constructor(
    private route: ActivatedRoute,
    private debtInfoSer: DebtInfoService
  ) { }

  displayedColumns: string[] = [
    'number_ctner', 
    'name_client', 
    'current_debt',
    'price_rental',
    'overdue_debt'
  ];
  // dataSource = new MatTableDataSource(this.DEUDAS);
  dataSource: any = [];

  ngOnInit(): void {
    this.getListaDeudas();
  }

  getListaDeudas()
   {
    this.debtInfoSer.getListDebts()
      .subscribe(
        (res) => {
          this.DEUDAS = res;
          this.dataSource = new MatTableDataSource(this.DEUDAS);

          console.log(this.DEUDAS);
        },
        (err) => console.log(err)
      )
  }
  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

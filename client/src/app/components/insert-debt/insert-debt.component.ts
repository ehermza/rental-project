import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
// import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { ActivatedRoute } from '@angular/router';
import { IDebt } from 'src/app/models/Debt';
import { DebtInfoService } from 'src/app/services/debt-info.service';

@Component({
  selector: 'app-insert-debt',
  templateUrl: './insert-debt.component.html',
  styleUrls: ['./insert-debt.component.css']
})

export class InsertDebtComponent implements OnInit 
{
  
  DEUDAS: any = [];
  VALUE_PER_TOTAL: number= 0;
  totalPerClicked: number= 0;
  clickedRows = new Set<IDebt>();  
  // TotalDebtsOneMonth: number = 0;

  constructor(
    private route: ActivatedRoute,
    public debtInfoSer: DebtInfoService
  ) { }

  displayedColumns: string[] = [
    'number_ctner', 
    'name_client', 
    'price_rental',
    // 'current_debt',
    // 'overdue_debt'
  ];
  // dataSource = new MatTableDataSource(this.DEUDAS);
  dataSource: any = [];

  ngOnInit(): void {
    this.getListaDeudas();
  }

  Clickear() {
    // console.log(Fila.price_rental);
    console.log(this.clickedRows);

    this.totalPerClicked= 0;
    this.clickedRows.forEach( debt => {
      this.totalPerClicked+= debt.price_rental;
    });
    this.debtInfoSer.VALUE_PER_CLICK= this.totalPerClicked;
    // console.log(this.totalPerClicked);
  }
  
  sumarDebts(): number 
  {
    const debitos:IDebt[] = this.DEUDAS;
    var TotalDebtsOneMonth: number = 0;

    debitos.forEach( debtObj => {
      TotalDebtsOneMonth+= debtObj.price_rental;
    });
    return TotalDebtsOneMonth;
  }
  
  getListaDeudas()
   {
    this.debtInfoSer.getListDebts()
      .subscribe(
        (res) => {
          this.DEUDAS = res;
          this.dataSource = new MatTableDataSource(this.DEUDAS);
          this.debtInfoSer.VALUE_PER_TOTAL = this.sumarDebts();

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

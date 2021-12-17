import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DebtInfoService } from 'src/app/services/debt-info.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  probando: string = "";

  constructor(
    public debtInfoSer:DebtInfoService,
    private router:Router
    ) { }

  ngOnInit(): void {
  }

  insertar():void {

    this.probando = "WORKS!";
    this.debtInfoSer.insertDebtPeriod().subscribe(
       (res) => {
        this.router.navigate(['/clients/alert/226']);        
      }
    )
  }
}

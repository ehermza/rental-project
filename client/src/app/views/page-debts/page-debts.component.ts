import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IDebt } from 'src/app/models/Debt';
import { DebtInfoService } from 'src/app/services/debt-info.service';

@Component({
  selector: 'app-page-debts',
  templateUrl: './page-debts.component.html',
  styleUrls: ['./page-debts.component.css']
})
export class PageDebtsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
      
  }

}

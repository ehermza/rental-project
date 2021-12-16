import { Component, OnInit } from '@angular/core';

import { DebtInfoService } from 'src/app/services/debt-info.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  constructor(public debtInfoSer:DebtInfoService) { }

  ngOnInit(): void {
  }

}

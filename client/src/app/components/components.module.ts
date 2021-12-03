import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';

import { NavigatorComponent } from './navigator/navigator.component';
import { FormClientComponent } from './form-client/form-client.component';
import { FormContainerComponent } from './form-container/form-container.component';
import { TableComponent } from './clients/table/table.component';
import { FormAddClientComponent } from './clients/form-add-client/form-add-client.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { AlertComponent } from './alert/alert.component';
import { FormAddPayComponent } from './pagos/form-add-pay/form-add-pay.component';
import { TablePaysComponent } from './pagos/table-pays/table-pays.component';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button'; 

import { FilterContPipe } from '../pipes/filter-cont.pipe';
import { DebtTableComponent } from './debt-table/debt-table.component';

@NgModule({
  declarations: [
    NavigatorComponent,
    FormAddClientComponent,
    TableComponent,
    FormClientComponent,
    FormContainerComponent,
    // AlertComponent,
    FormAddPayComponent,
    TablePaysComponent,
    FilterContPipe,
    DebtTableComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule, // for validate inputs in form-add-client
    MatIconModule,
    MatButtonModule, 
  ], 
  exports: [
    NavigatorComponent,
    FormAddClientComponent,
    TableComponent,
    FormContainerComponent,
    FormClientComponent,

    FormAddPayComponent,  // page-pays
    TablePaysComponent,   // page-pays
    DebtTableComponent
    // AlertComponent
  ]
})
export class ComponentsModule { }

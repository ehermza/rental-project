import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageClientComponent } from './page-client/page-client.component';
import { ComponentsModule } from '../components/components.module';

// import { NavigatorComponent } from '../components/navigator/navigator.component';
// import { FormAddClientComponent } from '../components/clients/form-add-client/form-add-client.component';
// import { TableComponent } from '../components/clients/table/table.component';
import { PageContainersComponent } from './page-containers/page-containers.component';
import { PageProfileComponent } from './page-profile/page-profile.component';
import { PagePaysComponent } from './page-pays/page-pays.component';
import { PagePagosComponent } from './page-pagos/page-pagos.component';
import { PageDebtsComponent } from './page-debts/page-debts.component';

@NgModule({
  declarations: [
    PageClientComponent,
    PageContainersComponent,
    PageProfileComponent,
    PagePaysComponent,
    PagePagosComponent,
    PageDebtsComponent    // Nov-28th, 2021
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    // NavigatorComponent,
    //  FormAddClientComponent,
    //  TableComponent
  ],
  exports: [
     PageClientComponent,
     PageProfileComponent
  ]
})
export class ViewsModule { }

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ViewsModule } from './views/views.module';
import { ComponentsModule } from './components/components.module';
// import { FilterContPipe } from './pipes/filter-cont.pipe';


@NgModule({
  declarations: [
    AppComponent,
    // FilterContPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    ViewsModule,      // Re:
    ComponentsModule, // Re:
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

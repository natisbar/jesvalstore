import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { NosotrosComponent } from './feature/nosotros/nosotros.component';
import { ProductosComponent } from './feature/productos/productos.component';
import { ClientesComponent } from './feature/clientes/clientes.component';
import { DudasComponent } from './feature/dudas/dudas.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    NosotrosComponent,
    ProductosComponent,
    ClientesComponent,
    DudasComponent
  ],
  imports: [
    BrowserModule,
    CoreModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { NosotrosComponent } from './feature/nosotros/nosotros.component';
import { ProductosComponent } from './feature/productos/productos.component';
import { ClientesComponent } from './feature/clientes/clientes.component';
import { DudasComponent } from './feature/dudas/dudas.component';
// import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { SharedModule } from './shared/shared.module';

const routes: Routes = [
  {
    path: '', component: AppComponent
  }
];

const routerOptions: ExtraOptions ={
  anchorScrolling: "enabled"
};


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
    CoreModule,
    SharedModule
    // RouterModule.forRoot(routes, routerOptions)
  ],
  exports: [
    NosotrosComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

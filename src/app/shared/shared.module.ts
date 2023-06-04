
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ClienteService } from "./service/cliente.service";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [

  ],
  imports: [
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ClienteService]
})
export class SharedModule {}

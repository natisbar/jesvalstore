export class Requeridos{
  tipoUsuario: boolean;
  talla: boolean;
  color: boolean;
  faz: boolean;

  constructor(tipoUsuario: boolean, talla: boolean, color: boolean, faz: boolean){
    this.tipoUsuario = tipoUsuario;
    this.talla = talla;
    this.color = color;
    this.faz = faz;
  }
}

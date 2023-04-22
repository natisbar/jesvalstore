import { Component } from '@angular/core';

@Component({
  selector: 'app-dudas',
  templateUrl: './dudas.component.html',
  styleUrls: ['./dudas.component.css']
})
export class DudasComponent {
  public isActive: string;

  public clicAcordion(element:any){
    var acc = document.getElementsByClassName("accordion");
    console.log(element.parentElement);
    element.classList.toggle("active");
    element.classList.toggle("con-margen");
    element.nextElementSibling.classList.toggle("girar");
    var panel = element.parentElement.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }

  }

}

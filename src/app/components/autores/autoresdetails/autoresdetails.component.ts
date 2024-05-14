import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Autor } from '../../../models/autor';

@Component({
  selector: 'app-autoresdetails',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './autoresdetails.component.html',
  styleUrl: './autoresdetails.component.scss'
})
export class AutoresdetailsComponent {
  @Input("Autores") Autores: Autor = new Autor();
  @Output("retorno") retorno: EventEmitter<any> = new EventEmitter();

  constructor() {

  }

  salvar() {


    this.retorno.emit(this.Autores);

  }
}

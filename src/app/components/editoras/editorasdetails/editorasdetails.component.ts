import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Editora } from '../../../models/editora';

@Component({
  selector: 'app-editorasdetails',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './editorasdetails.component.html',
  styleUrl: './editorasdetails.component.scss'
})
export class EditorasdetailsComponent {
  
  @Input("Editora") editoras: Editora = new Editora();
  @Output("retorno") retorno: EventEmitter<any> = new EventEmitter();

  constructor() {

  }

  salvar() {


    this.retorno.emit(this.editoras);

  }
}

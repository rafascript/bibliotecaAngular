import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Livro } from '../../../models/livro';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-livrosdetails',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './livrosdetails.component.html',
  styleUrl: './livrosdetails.component.scss'
})
export class LivrosdetailsComponent {

  router = inject(ActivatedRoute);
  @Input("livros") livros: Livro = new Livro();
  @Output("retorno") retorno: EventEmitter<any> = new EventEmitter();

constructor(){
  
}

  salvar(){
    

    this.retorno.emit(this.livros);

  }
}

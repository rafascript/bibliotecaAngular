import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { Livro } from '../../../models/livro';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { LivrosdetailsComponent } from '../livrosdetails/livrosdetails.component';
import Swal from 'sweetalert2';
import { LivrosService } from '../../../services/livros.service';

@Component({
  selector: 'app-livroslist',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MdbModalModule, RouterModule, LivrosdetailsComponent],
  templateUrl: './livroslist.component.html',
  styleUrl: './livroslist.component.scss'
})
export class LivroslistComponent {

  modalService = inject(MdbModalService);
  @ViewChild('modalDetalhe') modalDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  lista: Livro[] = [];
  livroEdit!: Livro;
  livrosService = inject(LivrosService);
  constructor() {
    this.findall();
  }
  findall() {
    
    this.livrosService.findAll().subscribe({

      next: lista => {//quando funciona
        this.lista = lista;
      },
      error: erro => {//quando não funciona
        console.error(erro);
      }
    });
    
  }

  teste() {
    this.modalRef = this.modalService.open(this.modalDetalhe);
  }

  edit(livro: Livro){
    this.livroEdit = Object.assign({}, livro);
    this.modalRef = this.modalService.open(this.modalDetalhe);
  }

  apagar(livro: Livro){
    
    
    Swal.fire({
      title: "Deseja apagar?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Apagar",
      denyButtonText: "Cancelar"
    }).then((result) => { 
      if (result.isConfirmed) {
        let indice = this.lista.findIndex((livroa) =>{
          return livroa.id == livro.id;
        });
        this.lista.splice(indice, 1);
        
        
        
        Swal.fire("Apagado!", "", "success");
      }
    });
  }

  retornoDetalhe(livro: Livro) {
    if (this.livroEdit.id > 0) { //editar
      let indice = this.lista.findIndex(livroa => { return livroa.id == this.livroEdit.id });
      this.lista[indice] = livro;
      Swal.fire({
        title: "Good job!",
        text: "Editado com sucesso!",
        icon: "success"
      });
    } else { //cadastrar um novo
      livro.id = 4;
      this.lista.push(livro);
      Swal.fire({
        title: "Good job!",
        text: "Salvo com sucesso!",
        icon: "success"
      });
    }
    
    this.modalRef.close();
  }

  new(){
    this.livroEdit = new Livro(0, "");
    this.modalRef = this.modalService.open(this.modalDetalhe);
  }
}

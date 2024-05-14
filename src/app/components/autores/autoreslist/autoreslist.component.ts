import { CommonModule } from '@angular/common';
import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2';
import { Autor } from '../../../models/autor';
import { AutoresdetailsComponent } from '../autoresdetails/autoresdetails.component';

@Component({
  selector: 'app-Autoreslist',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MdbModalModule, AutoresdetailsComponent, RouterModule],
  templateUrl: './autoreslist.component.html',
  styleUrl: './autoreslist.component.scss'
})
export class AutoreslistComponent {
  modalService = inject(MdbModalService);
  @ViewChild('modalDetalhe') modalDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  lista: Autor[] = [];
  AutorEdit!: Autor;

  constructor() {
    this.findall();
  }
  findall() {
    let Autor1 = new Autor();
    Autor1.id = 1;
    Autor1.nome = 'Autor Um';

    let Autor2 = new Autor();
    Autor2.id = 2;
    Autor2.nome = 'Autor Dois';

    let Autor3 = new Autor();
    Autor3.id = 3;
    Autor3.nome = 'Autor Três';

    this.lista.push(Autor1);
    this.lista.push(Autor2);
    this.lista.push(Autor3);
  }

  teste() {
    this.modalRef = this.modalService.open(this.modalDetalhe);
  }

  edit(Autor: Autor){
    this.AutorEdit = Object.assign({}, Autor);
    this.modalRef = this.modalService.open(this.modalDetalhe);
  }

  apagar(Autor: Autor){
    
    Swal.fire({
      title: "Deseja apagar?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Apagar",
      denyButtonText: "Cancelar"
    }).then((result) => { 
      if (result.isConfirmed) {
        let indice = this.lista.findIndex((Autora) =>{
          return Autora.id == Autor.id;
        });
        this.lista.splice(indice, 1);
        
        
        Swal.fire("Apagado!", "", "success");
      }
    });
  }

  retornoDetalhe(Autor: Autor) {
    if (this.AutorEdit.id > 0) { //editar
      let indice = this.lista.findIndex(Autora => { return Autora.id == this.AutorEdit.id });
      this.lista[indice] = Autor;
      Swal.fire({
        title: "Good job!",
        text: "Editado com sucesso!",
        icon: "success"
      });
    } else { //cadastrar um novo
      Autor.id = 4;
      this.lista.push(Autor);
      Swal.fire({
        title: "Good job!",
        text: "Salvo com sucesso!",
        icon: "success"
      });
    }
    
    this.modalRef.close();
  }

  new(){
    this.AutorEdit = new Autor();
    this.modalRef = this.modalService.open(this.modalDetalhe);
  }
}

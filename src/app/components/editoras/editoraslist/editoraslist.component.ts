import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2';
import { Editora } from '../../../models/editora';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { EditorasdetailsComponent } from '../editorasdetails/editorasdetails.component';

@Component({
  selector: 'app-editoraslist',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MdbModalModule, EditorasdetailsComponent, RouterModule],
  templateUrl: './editoraslist.component.html',
  styleUrl: './editoraslist.component.scss'
})
export class EditoraslistComponent {
  modalService = inject(MdbModalService);
  @ViewChild('modalDetalhe') modalDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  lista: Editora[] = [];
  EditoraEdit!: Editora;

  constructor() {
    this.findall();
  }
  findall() {
    let Editora1 = new Editora();
    Editora1.id = 1;
    Editora1.titulo = 'Editora Um';

    let Editora2 = new Editora();
    Editora2.id = 2;
    Editora2.titulo = 'Editora Dois';

    let Editora3 = new Editora();
    Editora3.id = 3;
    Editora3.titulo = 'Editora Três';

    this.lista.push(Editora1);
    this.lista.push(Editora2);
    this.lista.push(Editora3);
  }

  teste() {
    this.modalRef = this.modalService.open(this.modalDetalhe);
  }

  edit(Editora: Editora){
    this.EditoraEdit = Object.assign({}, Editora);
    this.modalRef = this.modalService.open(this.modalDetalhe);
  }

  apagar(Editora: Editora){
    
    
    Swal.fire({
      title: "Deseja apagar?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Apagar",
      denyButtonText: "Cancelar"
    }).then((result) => { 
      if (result.isConfirmed) {
        let indice = this.lista.findIndex((Editoraa) =>{
          return Editoraa.id == Editora.id;
        });
        this.lista.splice(indice, 1);
        
        
        Swal.fire("Apagado!", "", "success");
      }
    });
  }

  retornoDetalhe(Editora: Editora) {
    if (this.EditoraEdit.id > 0) { //editar
      let indice = this.lista.findIndex(Editoraa => { return Editoraa.id == this.EditoraEdit.id });
      this.lista[indice] = Editora;
      Swal.fire({
        title: "Good job!",
        text: "Editado com sucesso!",
        icon: "success"
      });
    } else { //cadastrar um novo
      Editora.id = 4;
      this.lista.push(Editora);
      Swal.fire({
        title: "Good job!",
        text: "Salvo com sucesso!",
        icon: "success"
      });
    }
    
    this.modalRef.close();
  }

  new(){
    this.EditoraEdit = new Editora();
    this.modalRef = this.modalService.open(this.modalDetalhe);
  }
}

import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Livro } from '../../../models/livro';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LivrosService } from '../../../services/livros.service';


@Component({
  selector: 'app-livrosdetails',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './livrosdetails.component.html',
  styleUrl: './livrosdetails.component.scss'
})
export class LivrosdetailsComponent {

  @Input("livros") livros: Livro = new Livro(0, "");
  @Output("retorno") retorno: EventEmitter<any> = new EventEmitter<any>();
  router = inject(ActivatedRoute);
  router2 = inject(Router);

  livrosService = inject(LivrosService);


  constructor() {

    let id = this.router.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    }

  }

  findById(id: number) {

    this.livrosService.findById(id).subscribe({

      next: livro => {
        this.livros = livro;
      },
      error: erro => {
        alert(erro.status);
        console.log(erro);
        Swal.fire({
          title: 'Erro encontrado!',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }

    });
  }

  salvar() {
    if (this.livros.id > 0) {


      this.livrosService.update(this.livros).subscribe({
        next: retorno => {

          Swal.fire({
            title: 'Editado com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          this.router2.navigate(['admin/livro'], { state: { livroNovo: this.livros } });

        },
        error: erro => {

          alert(erro.status);
          console.log(erro);

          Swal.fire({
            title: 'Deu algum erro!',
            icon: 'error',
            confirmButtonText: 'Ok'
          });

        }
      });


    } else {

      this.livrosService.save(this.livros).subscribe({
        next: retorno => {

          Swal.fire({
            title: 'Salvo com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          this.router2.navigate(['admin/livros'], { state: { livroNovo: this.livros } });
          this.retorno.emit(this.livros);

        },
        error: erro => {

          alert(erro.status);
          console.log(erro);

          Swal.fire({
            title: 'Deu algum erro!',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      });
    }
  }
}

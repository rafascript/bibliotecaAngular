import { Component, Inject, inject } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  router = inject(Router);

  navegar(id : number){
    
    if(id == 1){
      this.router.navigate(['admin/livros']);
    }else if(id == 2){
      this.router.navigate(['admin/editora']);
    } else if(id == 3){
      this.router.navigate(['admin/autor']);
    }else{
      this.router.navigate(['login']);
    }
  }

}

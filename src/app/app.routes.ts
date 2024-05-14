import { Routes } from '@angular/router';
import { LivrosdetailsComponent } from './components/livros/livrosdetails/livrosdetails.component';
import { LivroslistComponent } from './components/livros/livroslist/livroslist.component';
import { AutoresdetailsComponent } from './components/autores/autoresdetails/autoresdetails.component';
import { AutoreslistComponent } from './components/autores/autoreslist/autoreslist.component';
import { EditorasdetailsComponent } from './components/editoras/editorasdetails/editorasdetails.component';
import { EditoraslistComponent } from './components/editoras/editoraslist/editoraslist.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { LoginComponent } from './components/layout/login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: 'admin',
        component: PrincipalComponent,
        children: [
            { path: 'livros', component: LivroslistComponent },
            {path: 'livros/new', component: LivrosdetailsComponent},
            {path: 'livros/edit/:id', component: LivrosdetailsComponent},
            { path: 'autor', component: AutoreslistComponent },
            {path: 'autor/new', component: AutoresdetailsComponent},
            {path: 'autor/edit/:id', component: AutoresdetailsComponent},
            { path: 'editora', component: EditoraslistComponent },
            {path: 'editora/new', component: EditorasdetailsComponent},
            {path: 'editora/edit/:id', component: EditorasdetailsComponent}
        ],
    }
];

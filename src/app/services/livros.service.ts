import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Livro } from '../models/livro';

@Injectable({
  providedIn: 'root'
})
export class LivrosService {

  http = inject(HttpClient);

  API = "http://localhost:8080/api/livro/"

  constructor() { }

  findAll(): Observable<Livro[]>{
    return this.http.get<Livro[]>(this.API+"listAll");
  }

  findById(id: number): Observable<Livro>{
    return this.http.get<Livro>(this.API+"/findById"+id);
  }

  save(livro: Livro): Observable<string>{
    return this.http.post<string>(this.API+"/save/"+livro,{responseType: 'text' as 'json'});
  }

  update(livro: Livro): Observable<string>{
    return this.http.put<string>(this.API+"/update/"+livro.id, livro, {responseType: 'text' as 'json'});
  }

  delete(livro: Livro): Observable<string>{
    return this.http.delete<string>(this.API+"/delete/"+livro.id, {responseType: 'text' as 'json'});
  }

}

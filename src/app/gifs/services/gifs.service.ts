import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gif.interface';
@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];
  private apiKey: string = 'OsQG7IogirXwlJRlUAUYQQjPKE1Ws9fw';
  //cambiar any por su correspondiente
  public resultados: Gif[] =[];


  get historial() {
    return [...this._historial];
  }
  constructor(private http: HttpClient) {

  }

  buscarGifs(query: string){

    query = query.trim().toLowerCase();
    if( !this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
    }

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${query}&limit=10`)
    .subscribe((respuesta : SearchGifsResponse) => {
     this.resultados = respuesta.data; 
    })
  }

}

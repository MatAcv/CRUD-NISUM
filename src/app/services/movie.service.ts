import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';

@Injectable({

  providedIn: 'root'
})
export class MovieService {

  private baseURL:string ='https://api.themoviedb.org/3';

  constructor(private http:HttpClient)
   { 

  }


  getPeliculas():Observable<any[]>{
    let params = {
      api_key:'8a1a6b59f6a581e2f2289f8ddcb63d89',
      language:'es-ES',
      page:1
    }

   
   
       return this.http.get<any>(`${this.baseURL}/movie/now_playing`,{params}).pipe(
         map((res)=>res.results)
  
       );
     }

     




}

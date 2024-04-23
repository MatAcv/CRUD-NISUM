import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Pelicula } from 'src/app/models/pelicula';
import { isValidImageUrl } from 'src/app/utils/utils';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  private peliculas : Pelicula[] = [];
  public data : Pelicula = {
    title: '',
    totalImgPath: '',
    adult: false,
    backdrop_path: '',
    genre_ids: [],
    id: 0,
    original_language: '',
    original_title: '',
    overview: '',
    popularity: 0,
    poster_path: '',
    release_date: '',
    video: false,
    vote_average: 0,
    vote_count: 0
  }
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
   
  ) {

    this.getAndSetPelicula();
  }


  getAndSetPelicula(){

    let peliculasStorage = localStorage.getItem("peliculas");
    if(peliculasStorage){
      this.peliculas = JSON.parse(peliculasStorage);
      console.log(this.peliculas);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  cancelarAgregar(): void {
    this.dialogRef.close();
  }

  agregarPelicula(): void {
    if (!isValidImageUrl(this.data.totalImgPath)) {
      alert('La URL de la imagen no es válida. Debe ser una URL de imagen con extensión jpeg, jpg, gif o png.');
      return; // No agregamos la película si la URL no es válida
    }

    if (!this.data.title.trim()) {
      alert('Debes ingresar el titulo de la película.');
      return; // No agregamos la película si la URL no es válida
    }
  
    this.peliculas.unshift(this.data); // Agrega al principio del array
    console.log(this.peliculas);
    localStorage.setItem("peliculas", JSON.stringify(this.peliculas));
    this.dialogRef.close(this.data);
  }
  

}

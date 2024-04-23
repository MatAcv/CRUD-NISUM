import { Component, Inject } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Pelicula } from 'src/app/models/pelicula';
import { isValidImageUrl } from 'src/app/utils/utils';

@Component({
  selector: 'app-modal-img',
  templateUrl: './modal-img.component.html',
  styleUrls: ['./modal-img.component.css']
})
export class ModalImgComponent {

  
  private peliculas : Pelicula[] = [];
  public dataPelicula : Pelicula = {
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
  public newUrl : string = "";

  constructor(
    public dialogRef: MatDialogRef<ModalImgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Pelicula
  ) {

    this.getAndSetPelicula();
    console.log(this.data);
  }


  getAndSetPelicula(){




  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  cancelarActualizar(): void {
    this.dialogRef.close();
  }

  actualizarPelicula(): void {

    if (!isValidImageUrl(this.newUrl)) {
      alert('La URL de la imagen no es válida. Debe ser una URL de imagen con extensión jpeg, jpg, gif o png.');
      return; // No agregamos la película si la URL no es válida
    }

    let peliculasStorage = localStorage.getItem("peliculas");
    if(peliculasStorage){
      this.peliculas = JSON.parse(peliculasStorage);
      console.log(this.peliculas);
      const index = this.peliculas.findIndex(pelicula => pelicula.id === this.data.id);
      if (index !== -1) {
        // Si se encuentra la película, actualiza su totalImgPath
        this.peliculas[index].totalImgPath = this.newUrl;
        // Guarda en localStorage o realiza otras acciones necesarias
        localStorage.setItem("peliculas", JSON.stringify(this.peliculas));
        this.dialogRef.close(this.data);

      }


    }



  }
  


  
}

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalImgComponent } from 'src/app/components/modal-img/modal-img.component';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { Pelicula } from 'src/app/models/pelicula';
import { MovieService } from 'src/app/services/movie.service';
import { isValidImageUrl } from 'src/app/utils/utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public peliculas : Pelicula[] = [];
  public nuevaPelicula: Pelicula = {} as Pelicula; 
  public edicionTitulo : boolean = false;
  public peliculaEditando: any = null;
  public tituloEditado : string = '';
  private alertMostrado: boolean = false;



  constructor(private movieService : MovieService,
              public dialog: MatDialog){



  }

  ngOnInit(): void 
  {
    this.init();


  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      this.init();
    });
  }
  

  editarImagen(pelicula : Pelicula): void {
    const dialogRef = this.dialog.open(ModalImgComponent, {
       data: pelicula,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.init();
    });
  }


  iniciarEdicion(pelicula: any): void {
    this.edicionTitulo = true;
    this.peliculaEditando = pelicula;
   
    this.tituloEditado = pelicula.title;
  }

  guardarEdicion(): void {

     // Verificar si ya se ha mostrado el alert y salir de la función
  if (this.alertMostrado) {
    return;
  }

    if (!this.tituloEditado) {
      this.alertMostrado = true; 

      alert("Ingrese un nombre para la película");
      setTimeout(() => {
        const tituloInput = document.getElementById('tituloInput') as HTMLInputElement;
        if (tituloInput) {
          tituloInput.focus();
        }
        this.alertMostrado = false; 
      }, 0);
    }
      else{
        if (this.peliculaEditando) {
          this.peliculaEditando.title = this.tituloEditado;
          this.edicionTitulo = false;
          console.log(this.peliculaEditando);
          // Actualizar el arreglo this.peliculas
          const index = this.peliculas.findIndex(p => p.id === this.peliculaEditando.id);
          if (index !== -1) {
            console.log('test');
            this.peliculas[index] = { ...this.peliculaEditando }; // Actualizar la película en el arreglo
            localStorage.setItem("peliculas", JSON.stringify(this.peliculas)); // Guardar en localStorage
          }
          this.peliculaEditando = null;
        }
      }

  }
  



  eliminarPelicula(pelicula: any): void {
    const index = this.peliculas.findIndex((p) => p.id === pelicula.id);
  
    if (index !== -1) {
      this.peliculas.splice(index, 1);
      localStorage.setItem("peliculas", JSON.stringify(this.peliculas));
      console.log('Película eliminada:', pelicula.title);
    } else {
      console.log('No se encontró la película con el id:', pelicula.id);
    }
  }
  

  reiniciarCartelera() : void{

    this.movieService.getPeliculas().subscribe(responsePeliculas=>{
      this.peliculas = responsePeliculas;
      console.log(this.peliculas);

      this.peliculas.forEach(singlePelicula=>{
        if(!singlePelicula.totalImgPath)
          {
            singlePelicula.totalImgPath = `https://image.tmdb.org/t/p/w500${singlePelicula.poster_path }`
            console.log(singlePelicula);
          }

      })
      localStorage.setItem("peliculas", JSON.stringify(this.peliculas));

    })
  }


  init(): void{
    let peliculasStorage = localStorage.getItem("peliculas");
    if(peliculasStorage)
      {
        this.peliculas = JSON.parse(peliculasStorage);
      }
      else
      {
        this.reiniciarCartelera();
      }
  }


  // En tu componente.ts
isValidImageUrls(url: string): boolean {

  return isValidImageUrl(url);

}

}

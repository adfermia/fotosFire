import { Component, OnInit } from '@angular/core';
import { FileItem } from 'src/app/models/file-item';
import { CargaImagenesService } from '../../services/carga-imagenes.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: []
})
export class CargaComponent implements OnInit {
  archivos: FileItem [] = [];
  constructor( public cargaImagenes: CargaImagenesService) { }

  ngOnInit() {
  }

  cargarImagenes() {
    this.cargaImagenes.cargarImagenesFirebase(this.archivos);
  }
  pruebaSobreElemento( event ) {
    console.log( event );
  }
  limpiarArchivos() {
    this.archivos = [];
  }

}

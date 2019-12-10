import { Injectable } from '@angular/core';
import { AngularFirestore} from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { FileItem } from '../models/file-item';
import { identifierModuleUrl } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class CargaImagenesService {

  private CARPETA_IMAGENES = 'img';
  estaSobreDrop = false;
  constructor(private db: AngularFirestore) {

   }
   cargarImagenesFirebase( imagenes: FileItem[]) {
     const storageRef = firebase.storage().ref();

     for ( const item of imagenes) {
       item.estaSubiendo = true;
       if ( item.progreso >= 100) {
         continue;
       }
       const uploadTask: firebase.storage.UploadTask = storageRef.child(`${ this.CARPETA_IMAGENES}/${ item.nombreArchivo}`)
                                                                 .put(item.archivo);
        // tslint:disable-next-line: align
        uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot: firebase.storage.UploadTaskSnapshot) => {
          item.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100; } ,
          (error) => {console.error('error al subir', error); },
          async () => {
            uploadTask.snapshot.ref.getDownloadURL().then(async (downloadURL) => {
              console.log('Imagen cargada correctamente');
              item.url = await uploadTask.snapshot.ref.getDownloadURL();
              item.estaSubiendo = false;
              this.guardarImagen({ nombre: item.nombreArchivo, url: item.url});

            }).catch(error => console.log({error}));
            }
            );
     }
   }

   private guardarImagen( imagen: { nombre: string, url: string}) {
        this.db.collection(`/${ this.CARPETA_IMAGENES}`).add( imagen);
   }
}

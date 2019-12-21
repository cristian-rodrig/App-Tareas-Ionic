import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  listas : Lista[] = [];

  constructor() {

  this.cargarStorage();
  
    }

   crearLista(titulo: string){

     const nuevaLista = new Lista(titulo);
     this.listas.push(nuevaLista);
     
     this.guardarStorage();

     return nuevaLista.id;
   }

   obtenerLista( id: string | number ){
   
    id = Number(id);

    return this.listas.find( listaData => listaData.id === id);

   }

   guardarStorage(){
    localStorage.setItem('data: any', JSON.stringify(this.listas))
   }

   cargarStorage(){
     if(localStorage.getItem('data: any')){ 
     this.listas = JSON.parse(localStorage.getItem('data: any'));
     }else{
       this.listas=[];
     }

   }

   borrarLista(lista:Lista){

    this.listas = this.listas.filter(listaData=> listaData.id!==lista.id)

    this.guardarStorage();
   }

}

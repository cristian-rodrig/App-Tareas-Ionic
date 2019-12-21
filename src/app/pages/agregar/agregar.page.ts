import { Component, OnInit } from "@angular/core";
import { TasksService } from "../../services/tasks.service";
import { ActivatedRoute } from "@angular/router";
import { Lista } from "../../models/lista.model";
import { listaItem } from "../../models/lista-item.model";

@Component({
  selector: "app-agregar",
  templateUrl: "./agregar.page.html",
  styleUrls: ["./agregar.page.scss"]
})
export class AgregarPage implements OnInit {
  lista: Lista;
  nombreItem: string = "";

  constructor(
    private taskservice: TasksService,
    private route: ActivatedRoute
  ) {
    const listaId = this.route.snapshot.paramMap.get("listaId");

    this.lista = this.taskservice.obtenerLista(listaId);
  }

  ngOnInit() {}

  agregarItem() {
    if (this.nombreItem.length === 0) {
      return;
    }

    const nuevoItem = new listaItem(this.nombreItem);

    //console.log(nuevoItem);
     console.log(this.taskservice.listas);

    this.lista.items.push(nuevoItem);  

    this.nombreItem = "";
    this.taskservice.guardarStorage();
  }

  cambioCheck(item: listaItem) {
    const pendientes = this.lista.items
                     .filter(itemData => !itemData.completado).length;
                
    if(pendientes === 0){
      this.lista.terminadaEn = new Date();
      this.lista.terminada = true;
    }else{
      this.lista.terminadaEn = null;
      this.lista.terminada = true;
    }

    this.taskservice.guardarStorage();
    // console.log(this.taskservice.listas);//listas de tareas
    console.log(this.lista.items);// items para hacer en listas de tareas
  }

  borrar(i: number){
    this.lista.items.splice(i, 1);
    console.log(this.lista.items);
    this.taskservice.guardarStorage();
  }
}

import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { TasksService } from "../../services/tasks.service";
import { Router } from "@angular/router";
import { Lista } from "../../models/lista.model";
import { AlertController, IonList } from "@ionic/angular";

@Component({
  selector: "app-listas",
  templateUrl: "./listas.component.html",
  styleUrls: ["./listas.component.scss"]
})
export class ListasComponent implements OnInit {

  @ViewChild( IonList ) lista:IonList;
  @Input() terminada = true;

  constructor(
    public tasksService: TasksService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  listaSeleccionada(lista: Lista) {
    console.log(lista);

    if (this.terminada) {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
    }
  }

  borrarLista(lista: Lista) {
    this.tasksService.borrarLista(lista);
  }

  async editarLista(lista: Lista) {
    const alert = await this.alertController.create({
      header: "Editar Lista",
      inputs: [
        {
          name: "titulo",
          type: "text",
          value: lista.titulo,
          placeholder: "Nombre de la lista"
        }
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          handler: () => {
            console.log("Cancelar");
            this.lista.closeSlidingItems();

          }
        },
        {
          text: "Actualizar",
          handler: data => {
            console.log(data);
            if (data.titulo.length === 0) {
              return;
            }

            lista.titulo = data.titulo;
            this.tasksService.guardarStorage();
            this.lista.closeSlidingItems();
          }
        }
      ]
    });

    alert.present();
  }
}

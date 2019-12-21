import { Component } from "@angular/core";
import { TasksService } from "../../services/tasks.service";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";


@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
export class Tab1Page {
  constructor(
    public tasksService: TasksService,
    private router: Router,
    private alertController: AlertController
  ) {}

  async agregarLista() {
    const alert = await this.alertController.create({
      header: "Nueva Lista",
      inputs: [
        {
          name: "titulo",
          type: "text",
          placeholder: "Nombre de la lista"
        }
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          handler: () => {
            console.log("Cancelar");
          }
        },
        {
          text: "Crear",
          handler: data => {
            console.log(data);
            if (data.titulo.length === 0) {
              return;
            }

            //Sino se crea la lista
           const listaId = this.tasksService.crearLista(data.titulo);
           
           console.log("Id de nueva lista" ,listaId);
           

             this.router.navigateByUrl(`/tabs/tab1/agregar/${ listaId }`);
          }
        }
      ]
    });

    alert.present();
  }

}

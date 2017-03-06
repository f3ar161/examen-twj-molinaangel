import {Component, OnInit} from '@angular/core';
import {Http, Response} from "@angular/http";
import {MasterUrlService} from "../services/master-url.service";
import {NgForm} from "@angular/forms";
@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css']
})
export class GrupoComponent implements OnInit {
  title: string = "Bienvenido a INGRESAR GRUPO";
  nuevoGrupo = {};
  grupos = [];
  disabledButtons = {
    NuevoGrupoFormSubmitButton: false
  };

  constructor(private _http: Http,
              private _masterURL: MasterUrlService) {
  }

  ngOnInit() {
    this._http.get(this._masterURL.url + "Grupo")
      .subscribe(
        (res: Response) => {
          this.grupos = res.json()
            .map((value) => {
              value.formularioCerrado = true;
              return value;
            });
        },
        (err) => {
          console.log(err);
        }
      )
  }

  crearGrupo(formulario: NgForm) {
    console.log(formulario);
    this.disabledButtons.NuevoGrupoFormSubmitButton = true;
    this._http.post(this._masterURL.url + "Grupo", {
      nombreGrupo: formulario.value.nombreGrupo,
      numeroMaximoEstudiantes: formulario.value.numeroMaximoEstudiantes

    }).subscribe(
      (res) => {
        console.log("No hubo Errores");
        console.log(res);
        this.grupos.push(res.json());
        this.nuevoGrupo = {};
        this.disabledButtons.NuevoGrupoFormSubmitButton = false;
      },
      (err) => {
        this.disabledButtons.NuevoGrupoFormSubmitButton = false;
        console.log("Ocurrio un err or", err);
      },
      () => {
        console.log("Termino la función vamos a las casa :v")
      }
    );
  }

  borrarGrupo(id: number) {
    this._http.delete(this._masterURL.url + "Grupo/" + id)
      .subscribe(
        (res) => {
          let grupoBorrado = res.json();
          this.grupos = this.grupos.filter(value => grupoBorrado.id != value.id);
        },
        (err) => {
          console.log(err);
        }
      )
  }

  actualizarGrupo(grupo: any) {
    let parametos = {
      nombreGrupo: grupo.nombreGrupo,
      numeroMaximoEstudiantes: grupo.numeroMaximoEstudiantes
    };
    this._http.put(this._masterURL.url + "Grupo/" + grupo.id, parametos)
      .subscribe(
        (res: Response) => {
          grupo.formularioCerrado = !grupo.formularioCerrado;
          console.log("Respuesta:", res.json());
        },
        (err) => {
          console.log("Error:", err);
        }
      )
  }

}

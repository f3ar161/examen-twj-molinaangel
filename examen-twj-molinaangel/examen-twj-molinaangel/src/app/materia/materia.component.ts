import {Component, OnInit} from '@angular/core';
import {Http, Response} from "@angular/http";
import {MasterUrlService} from "../services/master-url.service";
import {NgForm} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.css']
})
export class MateriaComponent implements OnInit {
  title: string = "Bienvenido a INGRESAR MATERIA";
  private _parametros: any;
  nuevaMateria = {};
  materias = [];
  disabledButtons = {
    NuevaMateriaFormSubmitButton: false
  };

  constructor(private _ActivatedRoute: ActivatedRoute,
              private _http:Http,
              private _masterURL:MasterUrlService) {
  }

  ngOnInit() {
    this._ActivatedRoute
      .params
      .subscribe(parametros => {
        this._parametros = parametros;
        this._http.get(this._masterURL.url + 'Materia?idGrupo=' + this._parametros.idGrupo)
          .subscribe(
            (res: Response) => {
              this.materias = res.json();
            },
            (err) => {
              console.log(err)
            }
          )
      });
  }

  crearMateria(formulario: NgForm) {
    console.log(formulario);
    this.disabledButtons.NuevaMateriaFormSubmitButton = true;
    this._http.post(this._masterURL.url + "Materia", {
      nombreMateria: formulario.value.nombreMateria,
      topicoMateria: formulario.value.topicoMateria,
      fechaCreacion: formulario.value.fechaCreacion,
      idGrupo:this._parametros.idGrupo

    }).subscribe(
      (res) => {
        console.log("No hubo Errores");
        console.log(res);
        this.materias.push(res.json());
        this.nuevaMateria = {};
        this.disabledButtons.NuevaMateriaFormSubmitButton = false;
      },
      (err) => {
        this.disabledButtons.NuevaMateriaFormSubmitButton = false;
        console.log("Ocurrio un err or", err);
      },
      () => {
        console.log("Termino la función vamos a las casa :v")
      }
    );
  }

  borrarMateria(id: number) {
    this._http.delete(this._masterURL.url + "Materia/" + id)
      .subscribe(
        (res) => {
          let materiaBorrado = res.json();
          this.materias = this.materias.filter(value => materiaBorrado.id != value.id);
        },
        (err) => {
          console.log(err);
        }
      )
  }

  actualizarMateria(materia: any) {
    let parametos = {
      nombreMateria: materia.nombreMateria,
      topicoMateria: materia.topicoMateria,
      fechaCreacion: materia.fechaCreacion,

    };
    this.disabledButtons.NuevaMateriaFormSubmitButton = true;
    this._http.put(this._masterURL.url + "Materia/" + materia.id, parametos)
      .subscribe(
        (res: Response) => {
          materia.formularioCerrado = !materia.formularioCerrado;
          console.log("Respuesta:", res.json());
        },
        (err) => {
          console.log("Error:", err);
        }
      )
  }
}

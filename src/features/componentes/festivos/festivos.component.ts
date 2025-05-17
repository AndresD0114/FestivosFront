import { Component, OnInit, ViewChild } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { FormsModule } from '@angular/forms';
import { ColumnMode, DatatableComponent, NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { FESTIVO } from '../../../shared/entidades/FESTIVO';
import { TIPO } from '../../../shared/entidades/TIPO';
import { TIPOService } from '../../../core/servicios/Tipo.service';
import { MatDialog } from '@angular/material/dialog';
import { FESTIVOService } from '../../../core/servicios/Festivos.service';
import { NgFor } from '@angular/common';
import { FestivosEditarComponent } from '../festivos-editar/festivos-editar.component';
import {  FestivoEditarDTO } from '../../../shared/DTO/FestivosEditarDTO';
import { DecidirComponent } from '../../../shared/componentes/decidir/decidir.component';
import { T } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-festivos',
  imports: [
    ReferenciasMaterialModule,
    FormsModule,
    NgxDatatableModule,
    NgFor
  ],
  templateUrl: './festivos.component.html',
  styleUrl: './festivos.component.css'
})
export class FestivosComponent implements OnInit {
@ViewChild(DatatableComponent) tabla!: DatatableComponent;

  public readonly TAMANO: number = 10;
  public opcionBusqueda: number = -1;
  public opcionesBusqueda: string[] = ["nombre","tipo"];
  public textoBusqueda: string = "";
  public fechaavalidar: string = "";
  public R: String="";

  public festivos: FESTIVO[] = [];
  public tipos: TIPO[] = [];
  public columnas = [
    { name: "Nombre", prop: "nombre" },
    { name: "Tipo", prop: "tipo.tipoFestivo" }
  ];
  public modoColumna = ColumnMode;
  public tipoSeleccion = SelectionType;
  public festivoEscogido: FESTIVO | undefined;
  public indiceFestivoEscogido: number = -1;

  constructor(private servicioFestivo: FESTIVOService,
    private servicioTipo: TIPOService,
    private servicioDialogo: MatDialog,
  ) {
    
   }
   ngOnInit(): void {
     this.listar(-1);
     this.listarTipos();

   }
   escoger(event: any) {
     if (event.type == "click") {
       this.festivoEscogido= event.row;
       this.indiceFestivoEscogido = this.festivos.findIndex(FESTIVO => FESTIVO == this.festivoEscogido);
     }
   }
   
   public listarTipos() {
    this.servicioTipo.ObtenerTodos().subscribe({
      next: response => {
        this.tipos = response;
      },
      error: error => {
        window.alert(error.message);
      }
    });
  }
  public listar(idBuscado: number) {
    this.servicioFestivo.ObtenerTodos().subscribe({
      next: response => {
        this.festivos = response;
        if (idBuscado > 0) {
          this.indiceFestivoEscogido = this.festivos.findIndex(festivo => festivo.id == idBuscado);
          this.festivoEscogido = this.festivos[this.indiceFestivoEscogido];
          setTimeout(() => {
            this.tabla.offset = Math.floor(this.indiceFestivoEscogido / this.TAMANO);
          });

        }
      },
      error: error => {
        window.alert(error.message);
      }
    });
  }
  public modificar() {
    if (this.festivoEscogido) {
      const dialogo = this.servicioDialogo.open(FestivosEditarComponent, {
        width: "500px",
        height: "400px",
        data: {
          encabezado: `Modicando el festivo ${this.festivoEscogido.nombre}`,
          festivo: { ...this.festivoEscogido },
          tipos: this.tipos
        },
        disableClose: true,
      });
      dialogo.afterClosed().subscribe({
        next: datos => {
          if (datos) {
            this.servicioFestivo.Actualizar(datos.festivo).subscribe({
              next: response => {
                this.festivos[this.indiceFestivoEscogido] = response;
              },
              error: error => {
                window.alert(error.message);
              }
            });
          }
        },
        error: error => {
          window.alert(error.message);
        }
      });
    }
    else {
      window.alert("Debe escoger el festivo a modificar");
    }
  }

  public verificarEliminar() {
    if (this.festivoEscogido) {
      const dialogo = this.servicioDialogo.open(DecidirComponent, {
        width: "300px",
        height: "200px",
        data: {
          encabezado: `Está seguro de eliminar el festivo ${this.festivoEscogido.nombre} ?`,
          id: this.festivoEscogido.id
        },
        disableClose: true,
      });
      dialogo.afterClosed().subscribe({
        next: datos => {
          if (datos) {
            this.servicioFestivo.Eliminar(datos.id).subscribe({
              next: response => {
                if (response) {
                  this.listar(-1);
                  window.alert("festivo eliminado con éxito");
                } else {
                  window.alert("No se pudo eliminar el festivo");
                }
              },
              error: error => {
                window.alert(error.message);
              }
            });
          }
        },
        error: error => {
          window.alert(error.message);
        }
      });
    }
    else {
      window.alert("Debe escoger el festivo a eliminar");
    }
  }

  public buscar() {
    if (this.textoBusqueda.length > 0) {
      this.servicioFestivo.Buscar(this.opcionBusqueda, this.textoBusqueda).subscribe(
        {
          next: response => {
            this.festivos = response;
          },
          error: error => {
            window.alert(error.message);
          }
        }
      );
    }
    else {
      this.listar(-1);
    }
  }
 

public agregar() {
  const dialogo = this.servicioDialogo.open(FestivosEditarComponent, {
    width: "500px",
    height: "400px",
    data: {
      encabezado: "Agregando un nuevo festivo",
      festivo: <FestivoEditarDTO>{
        id: 0,
        nombre: "",
        dia: 0,
        mes: 0,
        diasPascua: 0,
        tipoId: 0
      },
      tipos: this.tipos
    },
    disableClose: true,
  });

  dialogo.afterClosed().subscribe({
    next: datos => {
      if (datos) {
        console.log("Datos enviados:", datos.festivo); // Útil para depurar

        this.servicioFestivo.Agregar(datos.festivo).subscribe({
          next: response => {
            this.listar(response.id); // o response.nombre, según la API
          },
          error: error => {
            console.error("Error del backend:", error.error);
            window.alert(error.error);
          }
        });
      }
    },
    error: error => {
      window.alert(error.message);
    }
  });
}

public validar() {
  if (this.fechaavalidar.length > 0) {
    this.servicioFestivo.Validar(this.fechaavalidar).subscribe({
      next: response => {
        this.R = response; // El backend retorna un string
        window.alert(this.R);
      },
      error: error => {
        this.R = error.error; // El backend retorna un string
        window.alert(this.R);
      }
    });
  } else {
    window.alert("Debe ingresar una fecha");
  }
}

}
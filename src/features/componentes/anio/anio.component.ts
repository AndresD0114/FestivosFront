import { Component, OnInit, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { FormsModule } from '@angular/forms';
import { FestivoDTO } from '../../../shared/DTO/FestivoDTO.dto';
import { FESTIVOService } from '../../../core/servicios/Festivos.service';

@Component({
  selector: 'app-anio',
  imports: [
    ReferenciasMaterialModule,
    FormsModule,
   NgxDatatableModule,
  
   
  ],
  templateUrl: './anio.component.html',
  styleUrl: './anio.component.css'
})
export class AnioComponent implements OnInit {
@ViewChild(DatatableComponent) tabla!: DatatableComponent;

  public readonly TAMANO: number = 10;
  public anioaencontrar: string = "";

  public festivos: FestivoDTO[] = [];
  public columnas = [
    { name: "Nombre", prop: "nombre" },
    { name: "Fecha", prop: "fecha" }
  ];
  public modoColumna = ColumnMode;

  constructor(private servicioFestivo: FESTIVOService,
  ) {
    
   }
   ngOnInit(): void {
  // Opcional: cargar el año actual al iniciar
  const anioActual = new Date().getFullYear();
  this.anioaencontrar = anioActual.toString();
  this.buscarFestivos();
}

buscarFestivos(): void {
  const anio = Number(this.anioaencontrar);
  if (!anio || isNaN(anio)) {
    this.festivos = [];
    return;
  }
  this.servicioFestivo.ObtenerPorAnio(anio).subscribe({
    next: (data) => this.festivos = data,
    error: () => this.festivos = []
  });
}

}

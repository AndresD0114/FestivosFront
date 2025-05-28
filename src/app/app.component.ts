import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ReferenciasMaterialModule } from '../shared/modulos/referencias-material.module';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ReferenciasMaterialModule,
    RouterModule,
    NgFor
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FestivosFRONT';

  public opciones =[
    {titulo:  "Festivos", url: "festivos", icono: "iconos/festivo.png" },
    {titulo:  "Tipos", url: "tipos", icono: "iconos/tipo.png" },
    {titulo:  "Año", url: "anio", icono: "iconos/anio.png" }
  ]
}

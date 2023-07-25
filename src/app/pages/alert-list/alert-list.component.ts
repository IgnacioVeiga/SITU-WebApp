import { Component } from '@angular/core';

@Component({
  selector: 'app-alert-list',
  templateUrl: './alert-list.component.html',
  styleUrls: ['./alert-list.component.scss']
})
export class AlertListComponent {
  // cargando: boolean = false;
  // alertas: Informacion[] = []; // puede ser filtrado y se muestra en pantalla
  // alertasBackup: Informacion[] = []; // es una copia de seguridad y no se muestra en pantalla

  // constructor() { }

  // ngOnInit() {
  //   this.cargando = true;
  //   setTimeout(() => {
  //     this.generarAlertas();
  //     this.cargando = false;
  //   }, 1000);
  // }

  // generarAlertas() {
  //   for (let i = 0; i < 12; i++) {
  //     const info = new Informacion();
  //     info.titulo = 'Alerta ' + ((i + 1) * 321);
  //     info.subtitulo = 'Lorem ipsum dolor sit amet consectetur adipiscing elit, sem ut vivamus tortor in tincidunt metus...';
  //     info.fecha = new Date();
  //     this.alertas.push(info);
  //   }
  //   this.alertasBackup = [...this.alertas];
  // }

  // buscar(event: { target: { value: any; }; }) {
  //   // "termino" es lo que escribimos en el buscador
  //   const termino = event.target.value;
  //   if (termino.length === 0) {
  //     // vuelve la lista a la normalidad
  //     this.alertas = [...this.alertasBackup];
  //     return;
  //   } else if (termino.trim().length > 1) {
  //     // si escribió al menos 1 caracter, hace la busqueda
  //     this.aplicarBusqueda(termino.trim());
  //   }
  // }

  // private aplicarBusqueda(termino: string): void {
  //   // "termino" es lo que escribimos en el buscador
  //   termino = termino.toLowerCase();
  //   // al "termino" lo hacemos minuscula y buscamos coincidencias
  //   const resultadoFiltrado = this.alertasBackup.filter(item =>
  //     (item.titulo && item.titulo.toLowerCase().indexOf(termino) !== -1)
  //     || (item.subtitulo && item.subtitulo.toLowerCase().indexOf(termino) !== -1)
  //   );
  //   // actualiza la lista
  //   this.alertas = resultadoFiltrado;
  // }
}

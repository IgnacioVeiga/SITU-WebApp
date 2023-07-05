import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Archivo } from 'src/app/models/modelos';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-hacer-denuncia',
  templateUrl: './hacer-denuncia.component.html'
})
export class HacerDenunciaComponent implements OnInit {
  otraFH = false;
  otroLugar = false;
  colectivoEspecifico = false;
  fotos: Archivo[] = [];
  suficientesArchivos = false;

  constructor(
    private router: Router,
    private toastr: ToastrService // Documentación: https://www.npmjs.com/package/ngx-toastr
  ) { }

  ngOnInit() {
  }

  goHome() {
    this.router.navigate(['inicio']);
  }

  cargarFoto() {
    if (!this.suficientesArchivos) {
      const foto = new Archivo();
      const fechaTextoConcatenado = new Date().getFullYear().toString()
        + (new Date().getMonth() + 1).toString()
        + new Date().getDate().toString();
      const numeroAleatorio = this.generarId();

      foto.nombre = 'IMG_' + fechaTextoConcatenado + '_' + numeroAleatorio;

      // tslint:disable-next-line: max-line-length
      foto.miniatura = 'data:image/jpeg;base64,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';
      foto.formato = '.jpg';
      foto.peso = 1.5;
      foto.id = numeroAleatorio;
      this.fotos.push(foto);
      this.suficientesArchivos = this.fotos.length === 3 ? true : false;
    }
  }

  descartarFoto(id: number) {
    this.fotos = this.fotos.filter(a => a.id !== id);
    this.suficientesArchivos = this.fotos.length === 3 ? true : false;
    this.fotos = [...this.fotos];
  }

  generarId(): number {
    let esRepetido = false;
    let numero = Math.round(Math.floor(Math.random() * 200000) + 100000);
    do {
      const algunaFoto = this.fotos.find(a => a.id === numero); // verifico que ese id no esté en uso
      if (algunaFoto) { // si existe alguna foto con ese id, entonces entro al condicional
        esRepetido = true;
        numero = Math.round(Math.floor(Math.random() * 200000) + 100000); // genero otro numero aleatorio
      }
    } while (esRepetido);
    return numero;
  }

  denunciar() {
    this.toastr.success('Denuncia enviada con exito.', 'Exito'); // .success('subtitulo', 'titulo', {opciones})
    this.goHome();
  }
}

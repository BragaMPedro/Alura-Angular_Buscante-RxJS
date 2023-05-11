import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent implements OnDestroy {
  listaLivros: [];
  campoBusca: string = '';
  sub: Subscription;

  constructor(private service: LivroService) {}

  buscarLivros() {
    this.sub = this.service.buscar(this.campoBusca)
      .subscribe({
        next: res => console.log(res), // .then sucesso
        error: error => console.error(error), // .catch encerra Observable
        complete: () => console.log("Observable completado") // .finally encerra Observable após sucesso
      });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}

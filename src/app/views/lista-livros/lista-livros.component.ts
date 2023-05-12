import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Item, Livro } from 'src/app/models/interfaces';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent implements OnDestroy {
  listaLivros: Livro[];
  campoBusca: string = '';
  sub: Subscription;
  livro: Livro;

  constructor(private service: LivroService) {}

  buscarLivros() {
    this.sub = this.service.buscar(this.campoBusca).subscribe({
      next: (items) => {
        this.listaLivros = this.livrosResponseParaLivro(items);
      }, // .then sucesso
      error: (error) => console.error(error), // .catch encerra Observable
      complete: () => console.log('Observable completado'), // .finally encerra Observable após sucesso
    });
  }

  livrosResponseParaLivro(items: Item[]): Livro[] {
    const livros: Livro[] = [];

    items.forEach((item) => {
      livros.push(this.livro = {
        title: item.volumeInfo?.title,
        authors: item.volumeInfo?.authors,
        publisher: item.volumeInfo?.publisher,
        publishedDate: item.volumeInfo?.publishedDate,
        description: item.volumeInfo?.description,
        previewLink: item.volumeInfo?.previewLink,
        thumbnail: item.volumeInfo?.imageLinks?.thumbnail,
      });
    });
    return livros;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

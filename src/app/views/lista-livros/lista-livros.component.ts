import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, share, switchMap, tap } from 'rxjs';
import { Item } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

const PAUSA = 300;
@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent {
  campoBusca = new FormControl();

  constructor(private service: LivroService) {}

  // boa prática se referir a Observable com "$" ao final
  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    filter(valorDigitado => valorDigitado.length >= 3),
    debounceTime(PAUSA),
    tap(() => console.log('Fluxo Inicial')),
    distinctUntilChanged(),
    switchMap((valorDigitado) => this.service.buscar(valorDigitado)),
    tap(res => console.log(res)),
    map((items) => this.livrosResponseParaLivro(items))
  );

  livrosResponseParaLivro(items: Item[]): LivroVolumeInfo[] {
    return items.map((item) => {
      return new LivroVolumeInfo(item);
    });
  }

  // listaLivros: Livro[];
  // livro: Livro;
  // sub: Subscription;

  // buscarLivros() {
  //   this.sub = this.service.buscar(this.campoBusca).subscribe({
  //     next: (items) => {
  //       this.listaLivros = this.livrosResponseParaLivro(items);
  //     }, // .then sucesso
  //     error: (error) => console.error(error), // .catch encerra Observable
  //     complete: () => console.log('Observable completado'), // .finally encerra Observable após sucesso
  //   });
  // }

  // ngOnDestroy() {
  //   this.sub.unsubscribe();
  // }
}

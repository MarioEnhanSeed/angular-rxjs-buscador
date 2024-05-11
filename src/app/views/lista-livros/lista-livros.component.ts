import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Livro } from 'src/app/models/interface';
import { BuscaLivroService } from 'src/app/services/busca-livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent implements OnInit, OnDestroy {
  listaLivros: Livro[] = [];
  campoBusca: string = '';
  subscription: Subscription;

  constructor(private service: BuscaLivroService) {}

  ngOnInit(): void {
    this.buscarLivros();
  }

  buscarLivros() {
    if (
      !this.listaLivros.some((livro) => livro.title.includes(this.campoBusca))
    ) {
      this.subscription = this.service.buscar(this.campoBusca).subscribe({
        next: (items) => {
          this.listaLivros = [
            ...this.listaLivros,
            ...this.resultadoPesquisaLivros(items),
          ];
        },
        error: (error) => console.error(error),
      });
    }
  }

  realizarPesquisa(campoBusca: string) {
    this.campoBusca = campoBusca;
    this.buscarLivros();
  }

  resultadoPesquisaLivros(items): Livro[] {
    return items.map((item) => ({
      title: item.volumeInfo?.title,
      authors: item.volumeInfo?.authors,
      publisher: item.volumeInfo?.publisher,
      publishedDate: item.volumeInfo?.publishedDate,
      description: item.volumeInfo?.description,
      pageCount: item.volumeInfo?.pageCount,
      previewLink: item.volumeInfo?.previewLink,
      thumbnail: item.volumeInfo?.imageLinks?.thumbnail,
    }));
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

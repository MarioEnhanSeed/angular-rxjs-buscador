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
  resultadosPesquisa: Livro[][] = []; // Array para armazenar os resultados de cada pesquisa

  constructor(private service: BuscaLivroService) {}

  ngOnInit(): void {
    this.buscarLivros();
  }

  buscarLivros() {
    this.subscription = this.service.buscar(this.campoBusca).subscribe({
      next: (items) => {
        this.resultadosPesquisa.push(this.resultadoPesquisaLivros(items));
      },
      error: (error) => console.error(error),
    });
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

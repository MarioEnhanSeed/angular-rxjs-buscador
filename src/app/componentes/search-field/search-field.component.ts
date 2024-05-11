import { Component, EventEmitter, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.css'],
})
export class SearchFieldComponent implements OnInit {
  campoBusca: string = '';

  @Output() pesquisaRealizada = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  buscarLivros() {
    this.pesquisaRealizada.emit(this.campoBusca);
  }
}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-resultado-pesquisa',
  templateUrl: './resultado-pesquisa.component.html',
  styleUrls: ['./resultado-pesquisa.component.css'],
})
export class ResultadoPesquisaComponent implements OnInit {
  @Input() listaLivros;
  @Input() telaInicial;

  constructor() {}

  ngOnInit(): void {}
}

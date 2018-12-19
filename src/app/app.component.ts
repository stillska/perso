import { CategorieService } from './categories/categorie.service';
import { CompteService } from './comptes/compte.service';
import { OperationService } from './operations/operation.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(private categorieService: CategorieService,
              private compteService: CompteService,
              private operationService: OperationService) {
  }
}

import { Component, OnInit } from '@angular/core';
import { Operation } from '../operation';
import { ActivatedRoute } from '@angular/router';
import { OperationService } from '../operation.service';
import { DateAvecOperation } from '../date';
import { Compte } from '../../comptes/compte';
import { CategorieService } from '../../categories/categorie.service';
import { Categorie } from '../../categories/categorie';
import * as _ from 'lodash';
import { CompteService } from '../../comptes/compte.service';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss']
})
export class OperationsComponent implements OnInit {

  operations: Operation[] = [];
  categories: Categorie[] = [];
  datesDisplayed: DateAvecOperation[] = [];
  selectedCompte: Compte = null;
  filtre_annee: number;
  filtre_mois: number;
  filtre_categorie: number;
  filtre_compte: number;
  sub: any;

  constructor(private route: ActivatedRoute,
              private operationService: OperationService,
              private categorieService: CategorieService,
              private compteService: CompteService) { }

  ngOnInit() {
    this.getCategories();
    this.sub = this.route.params.subscribe(params => {
      if (params['id_compte']) {
        this.filtre_compte = parseInt(params['id_compte'], 10);
        this.getCompte();
      }
      if (params['id_category']) {
        this.filtre_categorie = parseInt(params['id_category'], 10);
      }
      if (params['annee']) {
        this.filtre_annee = parseInt(params['annee'], 10);
      }
      if (params['mois']) {
        this.filtre_mois = parseInt(params['mois'], 10);
      }
      this.getOperations();
   });
  }

  getCategories(): void {
    this.categorieService.getList().subscribe(data => {
      this.categories = this.categorieService.convertSQLToObject(data);
    });
  }

  getCompte(): void {
    this.compteService.getCompte(this.filtre_compte.toString()).subscribe(data => {
      this.selectedCompte = data;
 });
  }

  public deplierReplierDate(date: DateAvecOperation): void {
    date.deplier = !date.deplier;
  }

  getOperations() {
    this.operationService.getList().subscribe(data => {
      this.operations = this.operationService.convertSQLToObject(data);
      if (this.filtre_compte) {
        this.operations = this.operations.filter(operation => operation.id_compte === this.filtre_compte);
      }
      if (this.filtre_categorie) {
        this.operations = this.operations.filter(operation => operation.id_category === this.filtre_categorie);
      }
      if (this.filtre_annee) {
        this.operations = this.operations.filter(operation => parseInt(operation.date.toString()
                                                  .substring(0, 4), 10) === this.filtre_annee);
        if (this.filtre_mois) {
          this.operations = this.operations.filter(operation => parseInt(operation.date.toString()
                                                    .substring(5, 7), 10) === this.filtre_mois);
        }
      }
      this.datesDisplayed = this.operationService.groupeParDate(this.operations);
      // exemple filtre nombre
      // this.dates = this.dates.filter((item, index) => index < 30);
    });
  }

  getCategorieName(idCategorie): string {
    return this.categories.find(cat => cat.id === idCategorie).title.toString();
  }

  getCategorieIcon(idCategorie) {
    if (idCategorie !== 0) {
      return this.categories.find(cat => cat.id === idCategorie).icon;
    }
  }
}

import { Operation } from '../operation';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categorie } from '../../categories/categorie';
import { CategorieService } from '../../categories/categorie.service';
import { OperationService } from '../operation.service';
import * as _ from 'lodash';
import { CompteService } from '../../comptes/compte.service';
import { Compte } from '../../comptes/compte';

@Component({
  selector: 'app-edit-operations',
  templateUrl: './edit-operations.component.html',
  styleUrls: ['./edit-operations.component.scss']
})
export class EditOperationsComponent implements OnInit {

  operation: Operation = new Operation();
  categories: Categorie[] = [];
  comptes: Compte[] = [];

  private sub: any;

  constructor(private route: ActivatedRoute,
              private categorieService: CategorieService,
              private operationService: OperationService,
              private compteService: CompteService) { }

  ngOnInit() {
    this.getCategories();
    this.getComptes();
    this.sub = this.route.params.subscribe(params => {
       if (params['id'] !== 'new') {
         this.getOperation(params['id']);
       } else if (params['id_category']) {
         this.operation.id_category = parseInt(params['id_category'], 10);
       }
    });
  }

  getOperation(id: Number): void {
    this.operationService.getOperation(id).subscribe(data => {
      this.operation = data;
      this.operation.id_category = parseInt(this.operation.id_category.toString(), 10);
      this.operation.id_compte = parseInt(this.operation.id_compte.toString(), 10);
      this.operation.id = parseInt(this.operation.id.toString(), 10);
      this.operation.amount = parseFloat(this.operation.amount.toString());
    });
  }

  enregistrer() {
    this.operationService.enregistrer(this.operation).subscribe(() => this.handleEnregistrerSuccess(), () => this.handleEnregistrerEchec());
    return false;
  }

  handleEnregistrerSuccess() {
    // TODO
  }

  handleEnregistrerEchec() {
    // TODO
  }

  getCategories(): void {
    this.categorieService.getList().subscribe(data => {
      const catsParent = this.categorieService.convertSQLToObject(data);
      const categories = [];
      this.categories = [];
      catsParent.filter(cat => cat.id_category_parent === 0)
          .forEach(cat => {
          categories.push(cat);
          const children = catsParent.filter(catchild => catchild.id_category_parent === cat.id);
          children.forEach(child => categories.push(child));
      });
      this.categories = categories;
    });
  }

  getComptes(): void {
    this.compteService.getList().subscribe(data => {
      this.comptes = this.compteService.convertSQLToObject(data);
    });
  }

  supprimer() {
    this.operationService.supprimer(this.operation).subscribe(() => this.handleSupprimerSuccess(), () => this.handleSupprimerEchec());
    return false;
  }

  handleSupprimerSuccess() {
    // TODO
  }

  handleSupprimerEchec() {
    // TODO
  }

  getCategorieIcon(idCategorie) {
    if (idCategorie !== 0) {
      return this.categories.find(cat => cat.id === idCategorie).icon;
    }
  }

  getCompteIcon(idCompte) {
    if (idCompte !== 0) {
      return this.comptes.find(c => c.id === idCompte).icon;
    }
  }

  updateType() {
    this.operation.type = this.categories.find(cat => cat.id === this.operation.id_category).default_behavior;
  }
}

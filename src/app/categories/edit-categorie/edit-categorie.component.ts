import { Categorie } from '../categorie';
import { CategorieService } from '../categorie.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-edit-categorie',
  templateUrl: './edit-categorie.component.html',
  styleUrls: ['./edit-categorie.component.scss']
})
export class EditCategorieComponent implements OnInit {

  categorie: Categorie = new Categorie();

  private sub: any;

  items: any;

  categories: Categorie[];

  constructor(private route: ActivatedRoute, private categorieService: CategorieService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       if (params['id'] !== 'new') {
         this.categorie.id = parseInt(params['id'], 10);
         this.getCategorie();
       } else {
         this.categorie.id_category_parent = 0;
       }
       this.getList();
    });
  }
  getList() {
    this.categorieService.getList().subscribe(data => {
      this.categories = this.categorieService.convertSQLToObject(data);
      this.categories = this.categories.filter(cat => cat.id_category_parent === 0)
                                       .filter(cat => cat.id !== this.categorie.id);
    });
  }
  getCategorie() {
    this.categorieService.getCategorie(this.categorie.id.toString()).subscribe(data => {
         this.categorie = data;
         this.categorie.id = parseInt(this.categorie.id.toString(), 10);
         this.categorie.id_category_parent = parseInt(this.categorie.id_category_parent.toString(), 10);
         this.getList();
    });
  }

  enregistrer() {
    this.categorieService.enregistrer(this.categorie).subscribe(() => this.handleEnregistrerSuccess(), () => this.handleEnregistrerEchec());
    return false;
  }

  handleEnregistrerSuccess() {
    // TODO
  }

  handleEnregistrerEchec() {
    // TODO
  }

  supprimer() {
    this.categorieService.supprimer(this.categorie).subscribe(() => this.handleSupprimerSuccess(), () => this.handleSupprimerEchec());
    return false;
  }

  handleSupprimerSuccess() {
    // TODO
  }

  handleSupprimerEchec() {
    // TODO
  }

  getCategorieIcon(idCategorie) {
    if (idCategorie && idCategorie !== 0) {
      return this.categories.find(cat => cat.id === idCategorie).icon;
    }
  }
}

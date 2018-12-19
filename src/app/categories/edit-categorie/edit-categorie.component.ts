import { Categorie } from '../categorie';
import { CategorieService } from '../categorie.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'underscore';

@Component({
  selector: 'app-edit-categorie',
  templateUrl: './edit-categorie.component.html',
  styleUrls: ['./edit-categorie.component.scss']
})
export class EditCategorieComponent implements OnInit {

  categorie: Categorie = new Categorie();

  private sub: any;

  value: any = new Object();

  items: any;

  categories: Object[];

  constructor(private route: ActivatedRoute, private categorieService: CategorieService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       if (params['id'] !== 'new') {
         this.categorie.id = +params['id'];
         this.getCategorie();
       }
    });
  }
  getList() {
    this.categorieService.getList().subscribe(data => {
      this.categories = [];
      this.items = [];
      const self = this;
      _.each(data['category'].records, function(records){
        const temp = _.object(data['category'].columns, records);
        self.categories.push(_.object(data['category'].columns, records));
      });
      const zero = {
        id: '0',
        id_category_parent: '0',
        title: 'Aucune',
        default_behavior: null,
        icon: null,
        description: null
      };
      this.categories.push(zero);
      this.categories = _.sortBy(this.categories, 'title');
      _.each(this.categories, function(cat) {
        if (cat['id_category_parent'] === '0') {
          self.items.push({
            id: cat['id'],
            text: cat['title']
          });
        }
      });
      this.value = this.categorie.id_category_parent;
    });
  }
  getCategorie() {
    this.categorieService.getCategorie(this.categorie.id).subscribe(data => {
         this.categorie = data;
         this.getList();
    });
  }
  enregistrer() {
    this.categorieService.enregistrer(this.categorie);
  }
  supprimer() {
    this.categorieService.supprimer(this.categorie);
  }
}

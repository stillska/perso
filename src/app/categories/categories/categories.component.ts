import { Categorie } from '../categorie';
import { CategorieService } from '../categorie.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'underscore';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories: Categorie[] = [];

  constructor(private route: ActivatedRoute, private categorieService: CategorieService) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categorieService.getList().subscribe(data => {
      this.categories = [];
      const self = this;
      _.each(data['category'].records, function(records){
        self.categories.push(_.object(data['category'].columns, records));
      });
      this.categories = _.sortBy(this.categories, 'title');
    });
  }
}

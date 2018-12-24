import { Categorie } from '../categorie';
import { CategorieService } from '../categorie.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

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
      this.categories = this.categorieService.convertSQLToObject(data);
    });
  }
}

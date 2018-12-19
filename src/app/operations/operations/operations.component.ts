import { Component, OnInit } from '@angular/core';
import { Operation } from '../operation';
import { ActivatedRoute } from '@angular/router';
import { OperationService } from '../operation.service';
import _ = require('underscore');
import { DateAvecOperation } from '../date';
import { Compte } from '../../comptes/compte';
import { CategorieService } from '../../categories/categorie.service';
import { Categorie } from '../../categories/categorie';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss']
})
export class OperationsComponent implements OnInit {

  operations: Operation[] = [];
  categories: Categorie[] = [];
  dates: DateAvecOperation[] = [];
  datesDisplayed: DateAvecOperation[] = [];
  selectedCompte: Compte = null;

  constructor(private route: ActivatedRoute, 
              private operationService: OperationService,
              private categorieService: CategorieService) { }

  ngOnInit() {
    this.getOperations();
    this.getCategories();
  }

  getCategories(): void {
    this.categorieService.getList().subscribe(data => {
      this.categories = [];
      const self = this;
      _.each(data['category'].records, function(records){
        self.categories.push(_.object(data['category'].columns, records));
      });
      this.categories = _.sortBy(this.categories, 'title');
    });
  }

  public deplierReplierDate(date: DateAvecOperation): void {
    date.deplier = !date.deplier;
  }

  getOperations() {
    this.operationService.getList().subscribe(data => {
      this.operations = [];
      const self = this;
      _.each(data['operation'].records, function(records){
        self.operations.push(_.object(data['operation'].columns, records));
      });
      this.operations = _.sortBy(this.operations,'date');
      const operationGroupByDate = _.groupBy(this.operations,'date');
      let incrementalsomme : number = 0; 
      _.each(operationGroupByDate,function(dateElements,index){
        const mydate = new DateAvecOperation();
        mydate.deplier = false;
        mydate.operations = dateElements;
        mydate.datedisplayed = dateElements[0].date;
        mydate.sommeDuJour = 0;
        mydate.operations.forEach(operation => {
          if(operation.type == "recette"){
            operation.amount = new Number(operation.amount).valueOf();
          } else {
            operation.amount = - new Number(operation.amount).valueOf();
          }
          mydate.sommeDuJour = mydate.sommeDuJour.valueOf() + operation.amount.valueOf();
        });
        incrementalsomme = incrementalsomme.valueOf() + mydate.sommeDuJour.valueOf();
        if (self.selectedCompte) {
          mydate.sommeRestantCompte = self.selectedCompte.somme_depart.valueOf() + incrementalsomme.valueOf();
        }
        self.dates.push(mydate);
      });
      this.datesDisplayed = this.dates.reverse();
      // exemple filtre nombre
      // this.dates = this.dates.filter((item, index) => index < 30);
    });
  }

  getCategorieName(idCategorie): string {
    return this.categories.find(cat => cat.id === idCategorie).title.toString();
  }
}

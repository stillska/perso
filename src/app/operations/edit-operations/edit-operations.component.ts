import { Operation } from '../operation';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categorie } from '../../categories/categorie';
import { CategorieService } from '../../categories/categorie.service';
import { OperationService } from '../operation.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-edit-operations',
  templateUrl: './edit-operations.component.html',
  styleUrls: ['./edit-operations.component.scss']
})
export class EditOperationsComponent implements OnInit {

  operation: Operation = new Operation();
  categories: Categorie[] = [];

  private sub: any;

  constructor(private route: ActivatedRoute, 
              private categorieService: CategorieService, 
              private operationService: OperationService) { }

  ngOnInit() {
    this.getCategories();
    this.sub = this.route.params.subscribe(params => {
       if (params['id'] !== 'new') {
         this.getOperation(new Number(params['id']));
       } else if (params['id_category']) {
         this.operation.id_category = +params['id_category'];
       }
    });
  }

  getOperation(id: Number): void {
    this.operationService.getOperation(id).subscribe(data => {
      this.operation = data;
    });
  }

  enregistrer() {
    this.operationService.enregistrer(this.operation).subscribe(() => this.handleEnregistrerSuccess(), () => this.handleEnregistrerEchec());
  }

  handleEnregistrerSuccess(){
    
  }
  handleEnregistrerEchec(){
    
  }

  getCategories(): void {
    this.categorieService.getList().subscribe(data => {
      this.categories = [];
      const self = this;
      const dico = _.zipObject(data['category'].columns, data['category'].records);
      _.each(dico, function(page){
        self.categories.push(page) ;
      });
    });
  }

  supprimer() {
    this.operationService.supprimer(this.operation).subscribe(() => this.handleSupprimerSuccess(), () => this.handleSupprimerEchec());
  }

  handleSupprimerSuccess(){
    
  }
  handleSupprimerEchec(){
    
  }
}

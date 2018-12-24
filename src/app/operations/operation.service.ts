import { Injectable } from '@angular/core';
import { Operation } from './operation';
import { Observable ,  of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { DateAvecOperation } from './date';

@Injectable()
export class OperationService {

  serverUrl: String;

  table = 'operation';

  operations: Operation[];

  constructor(private http: HttpClient) {
    let url = window.location.href;
    url = 'http://localhost:8888';
    const arr = url.split('/');
    this.serverUrl = arr[0] + '//' + arr[2] + '/api.php/' + this.table;
    this.updateList();
  }

  getOperation(idOperation: Number): Observable<Operation> {
    return this.http.get<Operation>(this.serverUrl.toString() + '/' + idOperation);
  }

  getOperations(): Observable<Operation[]> {
    return of(this.operations);
  }

  enregistrer(operation: Operation): Observable<any> {
    if (operation.id) {
      return this.http.put(this.serverUrl.toString() + '/' + operation.id, operation);
    } else {
      return this.http.post(this.serverUrl.toString() + '/' + operation.id, operation);
    }
  }
  supprimer(operation: Operation): Observable<any> {
      return this.http.delete(this.serverUrl.toString() + '/' + operation.id);
  }

  updateList() {
    this.http.get(this.serverUrl.toString()).subscribe(data => {
      this.operations = [];
      const self = this;
      const dico = _.zipObject(data[self.table].columns, data[this.table].records);
      _.each(dico, function(page){
        self.operations.push(page) ;
      });
    });
  }
  getList() {
    return this.http.get(this.serverUrl.toString());
  }

  convertSQLToObject(data: any): Operation[] {
    const operations = [];
    _.each(data['operation'].records, function(records){
      const operation: Operation = _.zipObject(data['operation'].columns, records);
      operation.id = parseInt(operation.id.toString(), 10);
      if (operation.type === 'recette') {
        operation.amount = parseInt(operation.amount.toString(), 10);
      } else {
        operation.amount = - parseInt(operation.amount.toString(), 10);
      }
      operation.id_category = parseInt(operation.id_category.toString(), 10);
      operation.id_compte = parseInt(operation.id_compte.toString(), 10);
      operations.push(operation);
    });
    return _.sortBy(operations, 'title');
  }

  groupeParDate(operations: Operation[]): DateAvecOperation[] {
    const operationGroupByDate = _.groupBy(operations, 'date');
    const dates = [];
    let incrementalsomme = 0;
    _.each(operationGroupByDate, function(dateElements) {
      const mydate = new DateAvecOperation();
      mydate.deplier = false;
      mydate.sommeRestantCompte = 0;
      mydate.operations = dateElements;
      mydate.datedisplayed = dateElements[0].date;
      mydate.sommeDuJour = 0;
      mydate.operations.forEach(operation => {
        mydate.sommeDuJour = mydate.sommeDuJour.valueOf() + operation.amount.valueOf();
      });
      incrementalsomme = incrementalsomme.valueOf() + mydate.sommeDuJour.valueOf();
      dates.push(mydate);
    });
    return dates.reverse();
  }
}

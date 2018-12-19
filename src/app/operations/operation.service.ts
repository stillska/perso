import { Injectable } from '@angular/core';
import { Operation } from './operation';
import { Observable ,  of } from 'rxjs';
import _ = require('underscore');
import { HttpClient } from '@angular/common/http';

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
      _.each(data[this.table].records, function(records){
        self.operations.push(_.object(data[self.table].columns, records));
      });
    });
  }
  getList() {
    return this.http.get(this.serverUrl.toString());
  }
}

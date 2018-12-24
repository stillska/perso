import { Categorie } from './categorie';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Observable, of } from 'rxjs';

@Injectable()
export class CategorieService {

  serverUrl: String;

  constructor(private http: HttpClient) {
    let url = window.location.href;
    url = 'http://localhost:8888';
    const arr = url.split('/');
    this.serverUrl = arr[0] + '//' + arr[2] + '/api.php/' + 'category';
  }

  getCategorie(idCategorie: string): Observable<any> {
    return this.http.get(this.serverUrl.toString() + '/' + idCategorie);
  }

  enregistrer(categorie: Categorie) {
    if (categorie.id) {
      return this.http.put(this.serverUrl.toString() + '/' + categorie.id, categorie);
    } else {
      return this.http.post(this.serverUrl.toString() + '/' + categorie.id, categorie);
    }
  }
  supprimer(categorie: Categorie) {
      return this.http.delete(this.serverUrl.toString() + '/' + categorie.id);
  }

  convertSQLToObject(data: any): Categorie[] {
    const categories = [];
    _.each(data['category'].records, function(records){
      const cat: Categorie = _.zipObject(data['category'].columns, records);
      cat.id = parseInt(cat.id.toString(), 10);
      cat.id_category_parent = parseInt(cat.id_category_parent.toString(), 10);
      categories.push(cat);
    });
    return _.sortBy(categories, 'title');
  }

  getList() {
    return this.http.get(this.serverUrl.toString());
  }
}

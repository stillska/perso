import { Categorie } from './categorie';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'underscore';
import { Observable, of } from 'rxjs';

@Injectable()
export class CategorieService {

  serverUrl: String;

  table = 'category';

  categories: Categorie[];

  constructor(private http: HttpClient) {
    let url = window.location.href;
    url = 'http://localhost:8888';
    const arr = url.split('/');
    this.serverUrl = arr[0] + '//' + arr[2] + '/api.php/' + this.table;
    this.updateList();
  }

  getCategorie(idCategorie: Number): Observable<Categorie> {
    return this.http.get<Categorie>(this.serverUrl.toString() + '/' + idCategorie); 
  }

  getCategories(): Observable<Categorie[]> {
    return of(this.categories);
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
  updateList() {
    this.http.get(this.serverUrl.toString()).subscribe(data => {
      this.categories = [];
      const self = this;
      _.each(data[this.table].records, function(records){
        self.categories.push(_.object(data[self.table].columns, records));
      });
    });
  }
  getList() {
    return this.http.get(this.serverUrl.toString());
  }
}

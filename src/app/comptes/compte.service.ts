import { Injectable } from '@angular/core';
import { Compte } from './compte';
import { HttpClient } from '@angular/common/http';
import { Observable ,  of } from 'rxjs';
import _ = require('underscore');

@Injectable()
export class CompteService {

  serverUrl: String;

  table = 'compte';

  comptes: Compte[];

  constructor(private http: HttpClient) {
    let url = window.location.href;
    url = 'http://localhost:8888';
    const arr = url.split('/');
    this.serverUrl = arr[0] + '//' + arr[2] + '/api.php/' + this.table;
    this.updateList();
  }

  getCompte(idCompte: Number): Observable<Compte> {
    return this.http.get<Compte>(this.serverUrl.toString() + '/' + idCompte);
  }

  getComptes(): Observable<Compte[]> {
    return of(this.comptes);
  }

  enregistrer(compte: Compte) {
    if (compte.id) {
      return this.http.put(this.serverUrl.toString() + '/' + compte.id, compte);
    } else {
      return this.http.post(this.serverUrl.toString() + '/' + compte.id, compte);
    }
  }
  supprimer(compte: Compte) {
      return this.http.delete(this.serverUrl.toString() + '/' + compte.id);
  }
  updateList() {
    this.http.get(this.serverUrl.toString()).subscribe(data => {
      this.comptes = [];
      const self = this;
      _.each(data[this.table].records, function(records){
        self.comptes.push(_.object(data[self.table].columns, records));
      });
    });
  }
  getList() {
    return this.http.get(this.serverUrl.toString());
  }
}

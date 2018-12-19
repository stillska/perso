import { Component, OnInit } from '@angular/core';
import * as _ from 'underscore';
import { Compte } from '../compte';
import { ActivatedRoute } from '@angular/router';
import { CompteService } from '../compte.service';

@Component({
  selector: 'app-comptes',
  templateUrl: './comptes.component.html',
  styleUrls: ['./comptes.component.scss']
})
export class ComptesComponent implements OnInit {

  comptes: Compte[] = [];

  constructor(private route: ActivatedRoute, private compteService: CompteService) { }

  ngOnInit() {
    this.getComptes();
  }

  getComptes() {
    this.compteService.getList().subscribe(data => {
      this.comptes = [];
      const self = this;
      _.each(data['compte'].records, function(records){
        self.comptes.push(_.object(data['compte'].columns, records));
      });
      this.comptes = _.sortBy(this.comptes, 'title');
    });
  }
}

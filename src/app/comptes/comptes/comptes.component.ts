import { Component, OnInit } from '@angular/core';
import { Compte } from '../compte';
import { ActivatedRoute } from '@angular/router';
import { CompteService } from '../compte.service';
import * as _ from 'lodash';

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
      this.comptes = this.compteService.convertSQLToObject(data);
    });
  }
}

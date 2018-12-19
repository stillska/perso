import { Compte } from '../compte';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-compte',
  templateUrl: './edit-compte.component.html',
  styleUrls: ['./edit-compte.component.scss']
})
export class EditCompteComponent implements OnInit {

  compte: Compte = new Compte();

  private sub: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       if (params['id'] !== 'new') {
         this.compte.id = +params['id'];
       }
    });
  }
  enregistrer() {

  }
  supprimer() {

  }
}

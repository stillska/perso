import { Compte } from '../compte';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompteService } from '../compte.service';

@Component({
  selector: 'app-edit-compte',
  templateUrl: './edit-compte.component.html',
  styleUrls: ['./edit-compte.component.scss']
})
export class EditCompteComponent implements OnInit {

  compte: Compte = new Compte();

  private sub: any;

  constructor(private route: ActivatedRoute, private compteService: CompteService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       if (params['id'] !== 'new') {
         this.compte.id = parseInt(params['id'], 10);
         this.getCategorie();
       }
    });
  }
  getCategorie() {
    this.compteService.getCompte(this.compte.id.toString()).subscribe(data => {
         this.compte = data;
         this.compte.id = parseInt(this.compte.id.toString(), 10);
         this.compte.somme_depart = parseFloat(this.compte.somme_depart.toString());
    });
  }
  enregistrer() {
    this.compteService.enregistrer(this.compte).subscribe(() => this.handleEnregistrerSuccess(), () => this.handleEnregistrerEchec());
  }

  handleEnregistrerSuccess() {
    // TODO
  }

  handleEnregistrerEchec() {
    // TODO
  }

  supprimer() {
    this.compteService.supprimer(this.compte).subscribe(() => this.handleSupprimerSuccess(), () => this.handleSupprimerEchec());
    return false;
  }

  handleSupprimerSuccess() {
    // TODO
  }

  handleSupprimerEchec() {
    // TODO
  }
}

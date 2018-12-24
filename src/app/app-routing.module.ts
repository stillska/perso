import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoriesComponent } from './categories/categories/categories.component';
import { EditCategorieComponent } from './categories/edit-categorie/edit-categorie.component';
import { ComptesComponent } from './comptes/comptes/comptes.component';
import { EditCompteComponent } from './comptes/edit-compte/edit-compte.component';
import { OperationsComponent } from './operations/operations/operations.component';
import { EditOperationsComponent } from './operations/edit-operations/edit-operations.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'comptes', component: ComptesComponent },
  { path: 'compte/:id', component: EditCompteComponent },
  { path: 'operations', component: OperationsComponent },
  { path: 'operations/:id_compte', component: OperationsComponent },
  { path: 'operations/:id_compte/:id_category', component: OperationsComponent },
  { path: 'operations/:id_compte/:id_category/:annee', component: OperationsComponent },
  { path: 'operations/:id_compte/:id_category/:annee/:mois', component: OperationsComponent },
  { path: 'operation/:id', component: EditOperationsComponent },
  { path: 'operation/:id/:id_category', component: EditOperationsComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'categorie/:id', component: EditCategorieComponent },
  { path: '', redirectTo: '/operations', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }

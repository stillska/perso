import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'ng2-select';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';

import { AppComponent } from './app.component';
import { CategoriesComponent } from './categories/categories/categories.component';
import { EditCategorieComponent } from './categories/edit-categorie/edit-categorie.component';
import { OperationsComponent } from './operations/operations/operations.component';
import { EditOperationsComponent } from './operations/edit-operations/edit-operations.component';
import { ComptesComponent } from './comptes/comptes/comptes.component';
import { EditCompteComponent } from './comptes/edit-compte/edit-compte.component';
import { CategorieService } from './categories/categorie.service';
import { CompteService } from './comptes/compte.service';
import { OperationService } from './operations/operation.service';
import { AppRoutingModule } from './/app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    EditCategorieComponent,
    OperationsComponent,
    EditOperationsComponent,
    ComptesComponent,
    EditCompteComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    AlertModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    SelectModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr' }, CategorieService, CompteService, OperationService],
  bootstrap: [AppComponent]
})
export class AppModule { 
}

registerLocaleData(localeFr, 'fr');
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MaterialModule } from '../material.module';
import { DishCardComponent } from './dish-card/dish-card.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DishCardsGridComponent } from './dish-cards-grid/dish-cards-grid.component';
import { MenuInformationComponent } from './menu-information/menu-information.component';
import { DishInfoDialogComponent } from './dish-info-dialog/dish-info-dialog.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NavBarComponent,
    DishCardComponent,
    DishCardsGridComponent,
    MenuInformationComponent,
    DishInfoDialogComponent,
    SearchFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  exports:[
    NavBarComponent,
    DishCardComponent,
    DishCardsGridComponent,
    MenuInformationComponent,
    SearchFormComponent
  ]
})
export class ComponentsModule { }

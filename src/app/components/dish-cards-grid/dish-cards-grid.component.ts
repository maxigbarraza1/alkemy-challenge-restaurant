import { Component, Input, OnInit } from '@angular/core';
import { RecipeInformation } from '../../models/recipe-details.model';
import { Recipe } from '../../models/recipes-search.model';

@Component({
  selector: 'app-dish-cards-grid',
  templateUrl: './dish-cards-grid.component.html',
  styleUrls: ['./dish-cards-grid.component.sass']
})
export class DishCardsGridComponent implements OnInit {

  @Input() dishes: RecipeInformation[] | Recipe[] | null= [] ;

  constructor() {}

  ngOnInit(): void {}

  get getGridSize(): number {
    if(this.dishes){
      if(this.dishes.length == 1) return 100;
      if(this.dishes.length == 2) return 50;
      if(this.dishes.length == 3 ) return 33.33;
      return 25;
    }
    return 0;
  }
}

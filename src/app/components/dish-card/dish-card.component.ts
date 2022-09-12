import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RecipeInformation } from '../../models/recipe-details.model';
import { DishInfoDialogComponent } from '../dish-info-dialog/dish-info-dialog.component';
import { Recipe } from '../../models/recipes-search.model';
import { Router } from '@angular/router';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-dish-card',
  templateUrl: './dish-card.component.html',
  styleUrls: ['./dish-card.component.sass']
})
export class DishCardComponent implements OnInit {

  @Input() dish!:RecipeInformation | Recipe

  characteristicsLocalDish: string[] = []

  constructor(private dialog:MatDialog,
              private readonly router:Router,
              private readonly menuService:MenuService) { }

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(DishInfoDialogComponent,{
      data:{
        dishId: this.dish.id
      }
    });
  }

  routeIsHome():boolean{
    return this.router.url === '/home';
  }

  isAnRecipeInfo(obj: any): obj is RecipeInformation {
    return obj;
  }

  loadDishCharacteristics():void{
    if(!this.dish) return;
    if(this.isAnRecipeInfo(this.dish)){
      if(this.dish.vegetarian) this.characteristicsLocalDish.push('vegetarian')
      if(this.dish.vegan) this.characteristicsLocalDish.push('vegan')
      if(this.dish.glutenFree) this.characteristicsLocalDish.push('gluten free')
      if(this.dish.dairyFree) this.characteristicsLocalDish.push('dairy free')
      if(this.dish.cheap) this.characteristicsLocalDish.push('cheap')
      if(this.dish.veryPopular) this.characteristicsLocalDish.push('very popular')
      if(this.dish.sustainable) this.characteristicsLocalDish.push('sustainable')
    }
  }

  addSaucerToMenu(){
    if(!this.dish) return;
    if(this.isAnRecipeInfo(this.dish)){
      this.menuService.addRecipeToMenu(this.dish)
    }
  }

  removeSauceFromMenu(){
    if(!this.dish) return;
    if(this.isAnRecipeInfo(this.dish)){
      this.menuService.removeRecipeFromMenu(this.dish)
    }
  }

  get getDishPrice():number{
    if(!this.dish) return 0
    if(this.isAnRecipeInfo(this.dish)){
      return this.dish.pricePerServing
    }
    return 0;
  }

  get getIngredients():string{
    if(!this.dish) return ''
    if(this.isAnRecipeInfo(this.dish)){
      return this.dish.extendedIngredients.map(ing=>ing.name).join(',  ');
    }else{
      return ''
    }
  }

  get getDishCharacteristics():string[]{
    return this.characteristicsLocalDish;
  }

}

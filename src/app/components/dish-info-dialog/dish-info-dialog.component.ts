import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RecipeInformation } from '../../models/recipe-details.model';
import { MenuService } from '../../services/menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dish-info-dialog',
  templateUrl: './dish-info-dialog.component.html',
  styleUrls: ['./dish-info-dialog.component.sass']
})
export class DishInfoDialogComponent {

  localDish!: RecipeInformation;

  characteristicsLocalDish: string[] = []

  constructor( private readonly menuService:MenuService, 
              private readonly router:Router,
              public dialogRef: MatDialogRef<DishInfoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {
                dishId:number
              }) 
  {
    const id = this.data.dishId

    if(id){
      this.menuService.getRecipeInformation(this.data.dishId).subscribe(resp=>{
        this.localDish = resp;
        this.loadDishCharacteristics();
      })
    }
  }

  routeIsHome():boolean{
    return this.router.url === '/home';
  }

  loadDishCharacteristics():void{
    if(!this.localDish) return;
    if(this.localDish.vegetarian) this.characteristicsLocalDish.push('vegetarian')
    if(this.localDish.vegan) this.characteristicsLocalDish.push('vegan')
    if(this.localDish.glutenFree) this.characteristicsLocalDish.push('gluten free')
    if(this.localDish.dairyFree) this.characteristicsLocalDish.push('dairy free')
    if(this.localDish.cheap) this.characteristicsLocalDish.push('cheap')
    if(this.localDish.veryPopular) this.characteristicsLocalDish.push('very popular')
    if(this.localDish.sustainable) this.characteristicsLocalDish.push('sustainable')
  }

  closeDialog():void{
    this.dialogRef.close();
  }

  get getDishName():string{
    if(!this.localDish) return ''
    return this.localDish.title;
  }

  get getDishImg():string{
    if(!this.localDish) return ''
    return this.localDish.image;
  }

  get getDishPrice():number{
    if(!this.localDish) return 0
    return this.localDish.pricePerServing;
  }

  get getIngredients():string{
    if(!this.localDish) return ''
    return this.localDish.extendedIngredients.map(ing=>ing.name).join(',  ');
  }

  get getDishCharacteristics():string[]{
    return this.characteristicsLocalDish;
  }

  get getMenuTotalPrice():number{
    return this.menuService.getPriceOfMenu();
  }

  get getPricePercent():number{
    const total = this.getMenuTotalPrice
    return (this.getDishPrice/total)*100;
  }

  get getMenuTotalTime():number{
    return this.menuService.getTimeOfMenu();
  }

  get getTimePercent():number{
    const total = this.getMenuTotalTime
    return (this.localDish.readyInMinutes/total)*100;
  }

  get getMenuTotalHealthScore():number{
    return this.menuService.getHealthScoreOfMenu();
  }

  get getHealthScorePercent():number{
    const total = this.getMenuTotalHealthScore
    return (this.localDish.healthScore/total)*100;
  }


}

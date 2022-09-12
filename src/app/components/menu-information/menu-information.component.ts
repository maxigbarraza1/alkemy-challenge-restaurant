import { Component, OnInit, Input } from '@angular/core';
import { RecipeInformation } from '../../models/recipe-details.model';

@Component({
  selector: 'app-menu-information',
  templateUrl: './menu-information.component.html',
  styleUrls: ['./menu-information.component.sass']
})
export class MenuInformationComponent implements OnInit {
  
  @Input() dishes: RecipeInformation[] | null = [];

  constructor() { }

  ngOnInit(): void {
  }

  get MenuPrice():number{
    let total = 0;
    if(this.dishes){
      this.dishes.forEach(saucer => {
        total += saucer.pricePerServing;
      });
    }
    return total;
  }

  get MenuTime():number{
    if(this.dishes){
      if(this.dishes.length < 1) return 0;
      let total = 0;
      this.dishes.forEach(saucer => {
        total += saucer.readyInMinutes;
      });
      return total / this.dishes.length;
    }
    return 0;
  }

  get MenuHealtScore():number{
    if(this.dishes){

      if(this.dishes.length < 1) return 0;
      let total = 0;
      this.dishes.forEach(saucer => {
        total += saucer.healthScore;
      });
      return total / this.dishes.length;
    }
    return 0;
  }

}

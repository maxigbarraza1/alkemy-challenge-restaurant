import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MenuService } from '../../services/menu.service';
import { Recipe } from '../../models/recipes-search.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass']
})
export class CartComponent implements OnInit {

  searchForm: FormGroup = this.fb.group({
    search: ['', [
              Validators.required,
              Validators.minLength(2),
              Validators.maxLength(20)
            ],],
  })

  recipes: Recipe[] = [];

  recipeRequestSended:boolean=false;

  constructor(private readonly fb:FormBuilder,
              private readonly menuService:MenuService) { }

  ngOnInit(): void {
    this.menuService.searchResults.subscribe((recipes)=>{
      
      this.recipeRequestSended=true;
      console.log(recipes)
      this.recipes = recipes;
    });
  }

  get getRecipesLength():number{
    return this.recipes.length
  }

  get requestSended():Observable<boolean>{
    return this.menuService.searchRequestSended
  }

}

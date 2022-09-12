import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { RecipeInformation } from '../models/recipe-details.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { RecipeResults, Recipe } from '../models/recipes-search.model';
import Swal from 'sweetalert2';

const API_URL = environment.API_URL;


@Injectable({
    providedIn: 'root'
})
export class MenuService {

    localMenu: BehaviorSubject<RecipeInformation[]> = new BehaviorSubject<RecipeInformation[]>([]);

    searchResults: BehaviorSubject<Recipe[]> = new BehaviorSubject<Recipe[]>([]);

    searchRequestSended:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    
    constructor(private http:HttpClient) {}

    getRecipeInformation(id:number):Observable<RecipeInformation>{
        return this.http.get<RecipeInformation>
        (`${API_URL}/${id}/information?${environment.API_KEY}`)
    }

    searchRecipes(query:string):Observable<RecipeResults>{
        return this.http.get<RecipeResults>
        (`${API_URL}/complexSearch?${environment.API_KEY}&query=${query}&number=3`);
    }

    addRecipeToMenu(recipe:Recipe){
        if(this.localMenu.value.length >= 4){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You can only add 4 saucers to your menu!',
        })
        return;
        } //Show error
        if(this.localMenu.value.find(saucer=>saucer.id === recipe.id)){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'This saucer is already in your menu!',
        })
        return;
        } //Show error

        const recipeInformation = this.getRecipeInformation(recipe.id);
        recipeInformation.subscribe((recipeInfo)=>{
        if(recipeInfo.vegan && 
            this.getNumbersOfVeganSaucers() >= 2){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You can only add 2 vegan saucers to your menu!',
            })
            return;
            }
        if(!recipeInfo.vegan && 
            this.getNumbersOfNonVeganSaucers() >= 2) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You can only add 2 non vegan saucers to your menu!',
            })
            return;
            }
        this.localMenu.next([...this.localMenu.value, recipeInfo]);
        Swal.fire(
            'Saucer added to menu!',
            'You can see your menu in the menu tab!',
            'success'
        )
        })
    }

    removeRecipeFromMenu(recipe:RecipeInformation){
        if(this.localMenu.value.length <= 0) return;
        const newMenu = this.localMenu.value.filter(saucer=>saucer.id !== recipe.id);
        this.localMenu.next(newMenu);
        Swal.fire(
        'Good job!',
        'You clicked the button!',
        'success'
        )
    }

    getPriceOfMenu():number{
        let total = 0;
        this.localMenu.value.forEach(saucer => {
        total += saucer.pricePerServing;
        });
        return total;
    }

    getTimeOfMenu():number{
        let total = 0;
        this.localMenu.value.forEach(saucer => {
        total += saucer.readyInMinutes;
        });
        return total;
    }

    getHealthScoreOfMenu():number{
        let total = 0;
        this.localMenu.value.forEach(saucer => {
        total += saucer.healthScore;
        });
        return total;
    }

    getNumbersOfVeganSaucers():number{
        let total = 0;
        this.localMenu.value.forEach(saucer => {
        if(saucer.vegan) total++;
        });
        return total;
    }

    getNumbersOfNonVeganSaucers():number{
        let total = 0;
        this.localMenu.value.forEach(saucer => {
        if(!saucer.vegan) total++;
        });
        return total;
    }


}

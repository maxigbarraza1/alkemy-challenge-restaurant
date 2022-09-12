import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { RecipeInformation } from '../../models/recipe-details.model';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

    dishes: Observable<RecipeInformation[]> = new Observable();
    saucersLength:number = 0;

    constructor(private readonly menuService:MenuService) { }

    ngOnInit(): void {
        this.dishes = this.menuService.localMenu;
        this.dishes.subscribe((data) => {
            this.saucersLength = data.length;
        });

    }



}

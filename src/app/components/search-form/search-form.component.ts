import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { debounce, interval, map } from 'rxjs';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.sass']
})
export class SearchFormComponent implements OnInit {

  searchForm: FormGroup = this.fb.group({
    search: ['', [
              Validators.required,
              Validators.maxLength(20)
            ],],
  })

  constructor(private readonly fb:FormBuilder,
              private readonly menuService:MenuService) { }

  ngOnInit(): void {
    this.searchForm.valueChanges
    .pipe(debounce(() => interval(500)))
    .subscribe((resp)=>{
      this.menuService.searchRequestSended.next(false);
      if(resp.search.length > 2){
        this.menuService.searchRecipes(resp.search).
          subscribe(({results})=>{
            this.menuService.searchRequestSended.next(true);
            if(results.length>0){
              this.menuService.searchResults.next(results);
            }
          })
      }
    })
  }
}

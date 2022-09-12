import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishCardsGridComponent } from './dish-cards-grid.component';

describe('DishCardsGridComponent', () => {
  let component: DishCardsGridComponent;
  let fixture: ComponentFixture<DishCardsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DishCardsGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DishCardsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

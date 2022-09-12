import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishInfoDialogComponent } from './dish-info-dialog.component';

describe('DishInfoDialogComponent', () => {
  let component: DishInfoDialogComponent;
  let fixture: ComponentFixture<DishInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DishInfoDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DishInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

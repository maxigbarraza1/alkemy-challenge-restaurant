import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuInformationComponent } from './menu-information.component';

describe('MenuInformationComponent', () => {
  let component: MenuInformationComponent;
  let fixture: ComponentFixture<MenuInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

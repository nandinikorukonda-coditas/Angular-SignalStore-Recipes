import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeDescription } from './recipe-description';

describe('RecipeDescription', () => {
  let component: RecipeDescription;
  let fixture: ComponentFixture<RecipeDescription>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeDescription]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeDescription);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

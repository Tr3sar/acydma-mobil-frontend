import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClassificationPage } from './classification.page';

describe('ClassificationPage', () => {
  let component: ClassificationPage;
  let fixture: ComponentFixture<ClassificationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

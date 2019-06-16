import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubemissoesComponent } from './submissoes.component';

describe('SubemissoesComponent', () => {
  let component: SubemissoesComponent;
  let fixture: ComponentFixture<SubemissoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubemissoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubemissoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

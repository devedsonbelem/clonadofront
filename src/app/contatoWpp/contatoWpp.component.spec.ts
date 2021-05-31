import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContatoWppComponent } from './contatoWpp.component';

describe('ContatoWppComponent', () => {
  let component: ContatoWppComponent;
  let fixture: ComponentFixture<ContatoWppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContatoWppComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContatoWppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

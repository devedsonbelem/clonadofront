import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificarContatosComponent } from './notificar-contatos.component';

describe('NotificarContatosComponent', () => {
  let component: NotificarContatosComponent;
  let fixture: ComponentFixture<NotificarContatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotificarContatosComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificarContatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

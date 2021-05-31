import { TestBed } from '@angular/core/testing';

import { NumerosClonadosService } from './numeros-clonados.service';

describe('NumerosClonadosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NumerosClonadosService = TestBed.get(NumerosClonadosService);
    expect(service).toBeTruthy();
  });
});

import { TestBed, inject } from '@angular/core/testing';

import { CadminService } from './cadmin.service';

describe('CadminService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CadminService]
    });
  });

  it('should be created', inject([CadminService], (service: CadminService) => {
    expect(service).toBeTruthy();
  }));
});

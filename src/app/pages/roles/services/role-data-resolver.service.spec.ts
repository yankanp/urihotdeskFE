import { TestBed } from '@angular/core/testing';

import { RoleDataResolverService } from './role-data-resolver.service';

describe('RoleDataResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoleDataResolverService = TestBed.get(RoleDataResolverService);
    expect(service).toBeTruthy();
  });
});

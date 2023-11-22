import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { CountryService } from '../shared/services/country.service';

import { CountryResolver } from '../shared/resolvers/country.resolver';
import { Country } from '../shared/models/country.model';


const COUNTRIES: Country[] = [
  { cca2: 'BE', translations: { fra: { common: 'Belgique' } }, continents: ['Europe'] },
  { cca2: 'FR', translations: { fra: { common: 'France' } }, continents: ['Europe']  },
  { cca2: 'JP', translations: { fra: { common: 'Japon' } }, continents: ['Asia']  },
];


describe('CountryResolver', () => {
  let resolver: CountryResolver;
  let activatedRouteSnapshot: ActivatedRouteSnapshot;
  let routerStateSnapshot: RouterStateSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ 
        provide: CountryService, 
        useValue: {
          get: () => of(COUNTRIES)
        } 
      }],
      imports: []
    });
    
    resolver = TestBed.inject(CountryResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it('should resolve european countries', done => {
    resolver.resolve(activatedRouteSnapshot, routerStateSnapshot).subscribe(data => {
      expect(data).toEqual([
        { cca2: 'BE', translations: { fra: { common: 'Belgique' } }, continents: ['Europe'] },
        { cca2: 'FR', translations: { fra: { common: 'France' } }, continents: ['Europe']  },
      ]);
      done();
    });
  });
});

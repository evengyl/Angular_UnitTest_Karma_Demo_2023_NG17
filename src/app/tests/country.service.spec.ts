import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Country } from '../shared/models/country.model';
import { CountryService } from '../shared/services/country.service';
import { environment } from '../../environments/environment';


describe('CountryService', () => {
  let httpController: HttpTestingController;
  let service: CountryService;

  const COUNTRIES: Country[] = [
    { cca2: 'FR', translations: { fra: { common: 'France' } }, continents: ['Europe']  },
    { cca2: 'JP', translations: { fra: { common: '¨Japon' } }, continents: ['Asia']  },
    { cca2: 'BE', translations: { fra: { common: 'Belgique' } }, continents: ['Europe'] },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
      imports: [
        HttpClientTestingModule
      ]
    });
    httpController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CountryService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return ordered countries', done => {
    service.get().subscribe((data : any) => {
      expect(data).toEqual([
        { cca2: 'BE', translations: { fra: { common: 'Belgique' } }, continents: ['Europe'] },
        { cca2: 'FR', translations: { fra: { common: 'France' } }, continents: ['Europe']  },
        { cca2: 'JP', translations: { fra: { common: '¨Japon' } }, continents: ['Asia']  },
      ]);
      done();
    });

    const req = httpController.expectOne(environment.countryAPI + '/all');
    req.flush(COUNTRIES);
  });
});

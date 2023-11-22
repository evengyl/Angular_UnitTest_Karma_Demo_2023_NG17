import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { CountryService } from '../services/country.service';
import { Country } from '../models/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountryResolver implements Resolve<Country[]> {

  constructor(
    private countryService: CountryService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Country[]> {
    return this.countryService.get().pipe(map(countries => countries.filter(
      country => country.continents.includes('Europe')
    )));
  }
}

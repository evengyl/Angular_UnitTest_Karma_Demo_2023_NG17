import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Country } from '../models/country.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<Country[]> {
    return this.http.get<Country[]>(environment.countryAPI + '/all').pipe(
      map(countries => countries.sort((c1, c2) => c1.translations.fra.common < c2.translations.fra.common ? -1 : 1 ))
    );
  }
}

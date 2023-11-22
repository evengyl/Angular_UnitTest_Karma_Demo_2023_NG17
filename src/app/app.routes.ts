import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { CountryResolver } from './shared/resolvers/country.resolver';

export const routes: Routes = [
    { path :"", component: HomeComponent},
    { path: 'register', component: RegisterComponent, resolve: { countries: CountryResolver } }
];

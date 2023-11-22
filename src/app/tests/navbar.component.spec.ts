import { ComponentFixture, TestBed, inject } from '@angular/core/testing';

import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';
import { NavbarComponent } from '../shared/compos/navbar/navbar.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';



describe('NavbarComponent', () => {
    let component: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NavbarComponent, RouterTestingModule],
        })
            .compileComponents();

        fixture = TestBed.createComponent(NavbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

    });

    it('should create', () => {
        expect(component).toBeTruthy();
    }
    )
});

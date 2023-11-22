import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from '../app.component';
import { RouterTestingModule } from '@angular/router/testing';


describe('AppComponent', () => {

    let fixture: ComponentFixture<AppComponent>;
    let component: AppComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppComponent, RouterTestingModule],
        }).compileComponents();
    });


    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
      });

    it('should create the app', () => {
        expect(component).toBeTruthy();
    });

    it(`should have the 'demo_test' title`, () => {
        expect(component.title).toEqual('demo_test');
    });


});

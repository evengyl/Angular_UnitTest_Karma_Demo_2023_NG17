import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { UserService } from '../shared/services/user.service';
import { environment } from '../../environments/environment';

const USER = { email: 'lykhun@gmail.com', ssn: '82.05.06-203.16', nationality: 'BE' };

describe('UserService', () => {
  let service: UserService;
  let testController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(UserService);
    testController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return object with id', () => {
    service.post(USER)
    spyOn(service, 'post').and.returnValue(true);
  });
});

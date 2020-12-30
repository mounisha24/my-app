import { of } from 'rxjs';
import { EnrollmentService } from './enrollment.service';

describe('EnrollmentService', () => {
  let httpClientSpy: { get: jasmine.Spy; put: jasmine.Spy };
  let enrollmentService: EnrollmentService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'put']);
    enrollmentService = new EnrollmentService(httpClientSpy as any);
  });

  it('should return enrollees', () => {
    const expectedData = [
      {
        id: 'one',
        active: true,
        name: 'Astring',
        dateOfBirth: 'string',
      },
      {
        id: 'two',
        active: false,
        name: 'Bstring',
        dateOfBirth: 'string',
      },
    ];
    httpClientSpy.get.and.returnValue(of(expectedData));

    enrollmentService
      .getEnrollees()
      .subscribe((enrollees) => expect(enrollees).toEqual(expectedData));
  });

  it('should update enrollee', () => {
    const expectedData = {
      id: 'one',
      active: true,
      name: 'Astring',
      dateOfBirth: 'string',
    };

    httpClientSpy.put.and.returnValue(of(expectedData));
    const payload = {
      active: false,
      name: 'TEST',
    };
    enrollmentService
      .updateEnrollee('two', payload)
      .subscribe((enrollees) => expect(enrollees).toEqual(expectedData));
  });
});

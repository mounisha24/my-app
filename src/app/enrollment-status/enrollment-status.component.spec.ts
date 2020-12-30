import { HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { EnrollmentService } from '../services/enrollment.service';
import { EnrollmentStatusRenderer } from './enrollment-status.component';

describe('EnrollmentStatusRenderer', () => {
  const enrollmentServiceSpy = jasmine.createSpyObj('EnrollmentService', [
    'updateEnrollee'
  ]);
  const toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['error']);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnrollmentStatusRenderer],
      providers: [
        { provide: EnrollmentService, useValue: enrollmentServiceSpy },
        { provide: ToastrService, useValue: toastrServiceSpy },
      ],
    }).compileComponents();
  });

  it('should render component', () => {
    const fixture = TestBed.createComponent(EnrollmentStatusRenderer);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should update enrollee', () => {
    const fixture = TestBed.createComponent(EnrollmentStatusRenderer);
    const component = fixture.componentInstance;
    component.value = false;
    component.data = {
      id: 'two',
      active: false,
      name: 'Bstring',
      dateOfBirth: 'string',
    };

    const dataExpected = {
      id: 'two',
      active: true,
      name: 'Bstring',
      dateOfBirth: 'string',
    };

    const payloadExpected = {
      active: true,
      name: 'Bstring',
    };

    enrollmentServiceSpy.updateEnrollee.and.returnValue(of(new HttpResponse({ status: 200, body: [] })));
    enrollmentServiceSpy.rowValueChange$ = new BehaviorSubject(null);
    const nextSpy = spyOn(enrollmentServiceSpy.rowValueChange$, "next");
    

    component.changeStatus();
    expect(component.data).toEqual(dataExpected);
    expect(enrollmentServiceSpy.updateEnrollee).toHaveBeenCalledWith(
      'two',
      payloadExpected
    );
    expect(component.loading).toBe(false);
    expect(nextSpy).toHaveBeenCalledWith(dataExpected);
  });

  it('should update enrollee failed', () => {
    const fixture = TestBed.createComponent(EnrollmentStatusRenderer);
    const component = fixture.componentInstance;
    component.value = false;
    component.data = {
      id: 'two',
      active: false,
      name: 'Bstring',
      dateOfBirth: 'string',
    };

    const dataExpected = {
      id: 'two',
      active: true,
      name: 'Bstring',
      dateOfBirth: 'string',
    };

    const payloadExpected = {
      active: true,
      name: 'Bstring',
    };

    enrollmentServiceSpy.updateEnrollee.and.returnValue(throwError(new HttpResponse({ status: 400, body: [] })));
    

    component.changeStatus();
    expect(component.data).toEqual(dataExpected);
    expect(enrollmentServiceSpy.updateEnrollee).toHaveBeenCalledWith(
      'two',
      payloadExpected
    );
    expect(component.loading).toBe(false);
    expect(toastrServiceSpy.error).toHaveBeenCalledWith(`Row ID two`, 'Status Update Failed')
  });
  it('test agInit', () => {
    const fixture = TestBed.createComponent(EnrollmentStatusRenderer);
    const component = fixture.componentInstance;
    const params = { value: false, data: {
      id: 'two',
      active: false,
      name: 'Bstring',
      dateOfBirth: 'string',
    }}
    component.agInit(params);
    expect(component.value).toBe(false);
    expect(component.data).toEqual({
      id: 'two',
      active: false,
      name: 'Bstring',
      dateOfBirth: 'string',
    });
  });
});

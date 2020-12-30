import { HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { EnrollmentService } from '../services/enrollment.service';
import { EnrolleeNameEditor } from './enrollee-name-editor.component';

describe('EnrolleeNameEditor', () => {
  const enrollmentServiceSpy = jasmine.createSpyObj('EnrollmentService', [
    'updateEnrollee',
  ]);
  const toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['error']);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnrolleeNameEditor],
      providers: [
        { provide: EnrollmentService, useValue: enrollmentServiceSpy },
        { provide: ToastrService, useValue: toastrServiceSpy },
      ],
    }).compileComponents();
  });

  it('should render component', () => {
    const fixture = TestBed.createComponent(EnrolleeNameEditor);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should update name', () => {
    const fixture = TestBed.createComponent(EnrolleeNameEditor);
    const component = fixture.componentInstance;
    const event = { target: { value: 'TEST' } };
    component.value = 'STRING';
    component.data = {
      id: 'two',
      active: false,
      name: 'Bstring',
      dateOfBirth: 'string',
    };

    const dataExpected = {
      id: 'two',
      active: false,
      name: 'TEST',
      dateOfBirth: 'string',
    };

    const payloadExpected = {
      active: false,
      name: 'TEST',
    };

    enrollmentServiceSpy.updateEnrollee.and.returnValue(
      of(new HttpResponse({ status: 200, body: [] }))
    );
    enrollmentServiceSpy.rowValueChange$ = new BehaviorSubject(null);
    const nextSpy = spyOn(enrollmentServiceSpy.rowValueChange$, 'next');

    component.changeName(event);
    expect(component.data).toEqual(dataExpected);
    expect(enrollmentServiceSpy.updateEnrollee).toHaveBeenCalledWith(
      'two',
      payloadExpected
    );
    expect(component.loading).toBe(false);
    expect(nextSpy).toHaveBeenCalledWith(dataExpected);
  });

  it('should update name failed', () => {
    const fixture = TestBed.createComponent(EnrolleeNameEditor);
    const component = fixture.componentInstance;
    const event = { target: { value: 'TEST' } };
    component.value = 'STRING';
    component.data = {
      id: 'two',
      active: false,
      name: 'Bstring',
      dateOfBirth: 'string',
    };

    const dataExpected = {
      id: 'two',
      active: false,
      name: 'TEST',
      dateOfBirth: 'string',
    };

    const payloadExpected = {
      active: false,
      name: 'TEST',
    };

    enrollmentServiceSpy.updateEnrollee.and.returnValue(
      throwError(new HttpResponse({ status: 400, body: [] }))
    );

    component.changeName(event);
    expect(component.data).toEqual(dataExpected);
    expect(enrollmentServiceSpy.updateEnrollee).toHaveBeenCalledWith(
      'two',
      payloadExpected
    );
    expect(component.loading).toBe(false);
    expect(toastrServiceSpy.error).toHaveBeenCalledWith(
      `Row ID two`,
      'Name Update Failed'
    );
  });

  it('test getValue', () => {
    const fixture = TestBed.createComponent(EnrolleeNameEditor);
    const component = fixture.componentInstance;
    component.value = 'TEST';
    expect(component.getValue()).toBe('TEST');
  });
  it('test agInit', () => {
    const fixture = TestBed.createComponent(EnrolleeNameEditor);
    const component = fixture.componentInstance;
    const params = { value: "TEST", data: {
      id: 'two',
      active: false,
      name: 'Bstring',
      dateOfBirth: 'string',
    }}
    component.agInit(params);
    expect(component.value).toBe('TEST');
    expect(component.data).toEqual({
      id: 'two',
      active: false,
      name: 'Bstring',
      dateOfBirth: 'string',
    });
  });
});

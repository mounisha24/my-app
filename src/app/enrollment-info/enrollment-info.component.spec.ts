import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { EnrollmentService } from '../services/enrollment.service';
import { GridUtilService } from '../services/grid-util.service';
import { EnrollmentInfoComponent } from './enrollment-info.component';

describe('EnrollmentInfoComponent', () => {
    const enrollmentServiceSpy = jasmine.createSpyObj('EnrollmentService', [
        'getEnrollees',
    ]);
    enrollmentServiceSpy.rowValueChange$ = new BehaviorSubject(null);
    const gridUtilServiceSpy = jasmine.createSpyObj('GridUtilService', [
        'getColumns',
    ]);
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EnrollmentInfoComponent],
            providers: [
                { provide: EnrollmentService, useValue: enrollmentServiceSpy },
                { provide: GridUtilService, useValue: gridUtilServiceSpy },
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    });

    it('should render component', () => {
        const fixture = TestBed.createComponent(EnrollmentInfoComponent);
        const component = fixture.componentInstance;
        gridUtilServiceSpy.getColumns.and.returnValue([
            { field: 'id', headerName: 'ID' },
            {
                field: 'name',
                headerName: 'NAME',
                editable: true,
                cellEditor: 'enrolleeNameEditor',
                sortable: true,
            },
            { field: 'dateOfBirth', headerName: 'DOB' },
            {
                field: 'active',
                headerName: 'STATUS',
                cellRenderer: 'enrollmentStatusRenderer',
                sortable: true,
            },
        ]);
        expect(component).toBeTruthy();
        expect(component.columnDefs.length).toBe(0);
        fixture.detectChanges();
        expect(component.columnDefs.length).toBe(4);
    });

    it('test onGridReady', () => {
        const fixture = TestBed.createComponent(EnrollmentInfoComponent);
        const component = fixture.componentInstance;
        const params = {
            api: { sizeColumnsToFit: () => { } },
            columnApi: {},
        };
        enrollmentServiceSpy.getEnrollees.and.returnValue(
            of([
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
            ]
            )
        );
        const sizeToFitSpy = spyOn(component, 'sizeToFit');
        component.onGridReady(params);
        expect(enrollmentServiceSpy.getEnrollees).toHaveBeenCalled();
        expect(component.rowData.length).toBe(2);
        expect(sizeToFitSpy).toHaveBeenCalled();
    });

    it('test changeStatus', () => {
        const fixture = TestBed.createComponent(EnrollmentInfoComponent);
        const component = fixture.componentInstance;
        const row = {
            id: 'one',
            active: true,
            name: 'Astring',
            dateOfBirth: 'string',
        };
        component.gridApi = {
            getRowNode: (id: string) => { },
        };
        const getRowNodeSpy = spyOn(
            component.gridApi,
            'getRowNode'
        ).and.returnValue({
            setData: (row: any) => { },
        });
        component.changeStatus(row);

        expect(getRowNodeSpy).toHaveBeenCalledWith('one');
    });
    it('test getRowNodeId', () => {
        const fixture = TestBed.createComponent(EnrollmentInfoComponent);
        const component = fixture.componentInstance;
        const row = {
            id: 'one',
            active: true,
            name: 'Astring',
            dateOfBirth: 'string',
        };
        expect(component.getRowNodeId(row)).toBe('one');
    });
    it('test sizeToFit', () => {
        const fixture = TestBed.createComponent(EnrollmentInfoComponent);
        const component = fixture.componentInstance;
        component.gridApi = {
            sizeColumnsToFit: () => { },
        };
        const sizeColumnsToFitSpy = spyOn(
            component.gridApi,
            'sizeColumnsToFit'
        );
        component.sizeToFit();
        expect(sizeColumnsToFitSpy).toHaveBeenCalled()
    });
});

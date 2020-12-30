import { Component, OnInit } from '@angular/core';
import { EnrolleeNameEditor } from '../enrollee-name-editor/enrollee-name-editor.component';
import { EnrollmentStatusRenderer } from '../enrollment-status/enrollment-status.component';
import { EnrollmentService } from '../services/enrollment.service';
import { GridUtilService } from '../services/grid-util.service';

@Component({
  selector: 'app-enrollment-info',
  templateUrl: './enrollment-info.component.html',
  styleUrls: ['./enrollment-info.component.scss'],
})
export class EnrollmentInfoComponent implements OnInit {
  columnDefs = [];
  rowData = [];
  gridApi;
  gridColumnApi;
  frameworkComponents;

  constructor(
    private enrollmentService: EnrollmentService,
    private gridUtilService: GridUtilService
  ) {
    this.frameworkComponents = {
      enrollmentStatusRenderer: EnrollmentStatusRenderer,
      enrolleeNameEditor: EnrolleeNameEditor,
    };
    this.enrollmentService.rowValueChange$.subscribe((row) => {
      if (row) {
        this.changeStatus(row);
      }
    });
  }

  ngOnInit() {
    this.columnDefs = this.gridUtilService.getColumns();
  }

  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.enrollmentService.getEnrollees().subscribe((response: any) => { 
        console.log(response)     
      this.rowData = response;
      this.sizeToFit();
    });
  }

  changeStatus(row: any) {
    const { id } = row;
    const rowNode = this.gridApi.getRowNode(id);
    rowNode.setData(row);
  }

  getRowNodeId(data) {
    return data.id;
  }
}

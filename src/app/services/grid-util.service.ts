import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GridUtilService {
  getColumns(){
    return [
      { field: 'id', headerName: 'ID' },
      {
        field: 'name',
        headerName: 'NAME',
        editable: true,
        cellEditor: 'enrolleeNameEditor',
        sortable: true
      },
      { field: 'dateOfBirth', headerName: 'DOB' },
      {
        field: 'active',
        headerName: 'STATUS',
        cellRenderer: 'enrollmentStatusRenderer',
        sortable: true
      },
    ]
  }
}

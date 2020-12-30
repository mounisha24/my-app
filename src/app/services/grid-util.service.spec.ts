import { GridUtilService } from './grid-util.service';

describe('GridUtilService', () => {
  let service: GridUtilService;
  beforeEach(() => {
    service = new GridUtilService();
  });

  it('should return columns', () => {
    expect(service.getColumns()).toEqual([
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
  });
});

import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ToastrService } from 'ngx-toastr';
import { EnrollmentService } from '../services/enrollment.service';

@Component({
  selector: 'app-enrollment-status-cell',
  templateUrl: './enrollment-status.component.html',
  styleUrls: ['./enrollment-status.component.scss'],
})
export class EnrollmentStatusRenderer implements ICellRendererAngularComp {
  public value: boolean;
  public data: any = {};
  public loading = false;

  constructor(
    private enrollmentService: EnrollmentService,
    private toastrService: ToastrService
  ) { }

  agInit(params: any): void {
    const { value, data } = params;
    this.value = value;
    this.data = data;
  }

  public changeStatus() {
    this.loading = true;
    this.data = {
      ...this.data,
      active: !this.value,
    };
    const { id, active, name } = this.data;
    const payload = {
      active,
      name,
    };

    this.enrollmentService.updateEnrollee(id, payload).subscribe(
      () => {
        this.loading = false;
        this.enrollmentService.rowValueChange$.next(this.data);
      },
      () => {
        this.loading = false;
        this.toastrService.error(`Row ID ${id}`, 'Status Update Failed');
      }
    );

  }

  refresh(): boolean {
    return false;
  }
}

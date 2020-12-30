import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { ToastrService } from 'ngx-toastr';
import { EnrollmentService } from '../services/enrollment.service';

@Component({
  selector: 'app-enrollee-name-editor',
  templateUrl: './enrollee-name-editor.component.html',
  styleUrls: ['./enrollee-name-editor.component.scss'],
})
export class EnrolleeNameEditor implements ICellEditorAngularComp, AfterViewInit {
  public value: string;
  public data: any = {};
  public loading = false;
  @ViewChild('inputElm') public inputElm;

  constructor(
    private enrollmentService: EnrollmentService,
    private toastrService: ToastrService
  ) {}

  agInit(params: any): void {
    const { value, data } = params;
    this.value = value;
    this.data = data;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.inputElm.nativeElement.focus();
    });
  }

  public changeName($event) {
    const { value } = $event.target;    
    this.data = {
      ...this.data,
      name: value,
    };
    this.loading = true;
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
        this.toastrService.error(`Row ID ${id}`, 'Name Update Failed');
      }
    );
  }

  refresh(): boolean {
    return false;
  }

  getValue(): any {
    return this.value;
  }
}

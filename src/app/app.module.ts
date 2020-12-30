import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EnrollmentInfoComponent } from './enrollment-info/enrollment-info.component';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { EnrollmentStatusRenderer } from './enrollment-status/enrollment-status.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EnrolleeNameEditor } from './enrollee-name-editor/enrollee-name-editor.component';
import { PageHeaderComponent } from './page-header/page-header.component';

@NgModule({
  declarations: [
    AppComponent,
    EnrollmentInfoComponent,
    EnrollmentStatusRenderer,
    EnrolleeNameEditor,
    PageHeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AgGridModule.withComponents([
      EnrollmentStatusRenderer,
      EnrolleeNameEditor
    ]),
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

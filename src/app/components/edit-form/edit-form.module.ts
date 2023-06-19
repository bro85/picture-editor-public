import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditFormComponent } from './edit-form.component';
import { ImagePreviewModule } from './image-preview/image-preview.module';
import { FileBtnModule } from './file-btn/file-btn.module';
import { TranslateModule } from '@ngx-translate/core';
import { NiceCheckModule } from '../nice-check/nice-check.module';
import { CropperPicModule } from './cropper-pic/cropper-pic.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { UploadedPicModule } from './uploaded-pic/uploaded-pic.module';
import { FormatWrapModule } from './format-wrap/format-wrap.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    EditFormComponent
  ],
  exports: [
    EditFormComponent
  ],
  imports: [
    CommonModule,
    ImagePreviewModule,
    FileBtnModule,
    TranslateModule,
    NiceCheckModule,
    CropperPicModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    UploadedPicModule,
    FormatWrapModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class EditFormModule { }

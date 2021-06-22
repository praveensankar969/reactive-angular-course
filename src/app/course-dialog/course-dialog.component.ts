import {AfterViewInit, Component, ElementRef, Inject, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {Course} from "../model/course";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import * as moment from 'moment';
import {catchError, tap} from 'rxjs/operators';
import {throwError} from 'rxjs';
import { CoursesService } from '../services/courses.services';
import { EventEmitter } from 'events';
import { LoadingService } from '../loading/loading.services';

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css'],
    providers : [LoadingService]
})
export class CourseDialogComponent implements AfterViewInit {

    form: FormGroup;

    course:Course;
    
   

    constructor(
        private loadingService :LoadingService,
        private courseService :CoursesService,
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) course:Course) {

        this.course = course;

        this.form = fb.group({
            description: [course.description, Validators.required],
            category: [course.category, Validators.required],
            releasedAt: [moment(), Validators.required],
            longDescription: [course.longDescription,Validators.required]
        });

    }

    ngAfterViewInit() {

    }

    save() {

      const changes = this.form.value;
      this.courseService.updateCourse(this.course.id, changes).subscribe(res=> 
        {
            this.dialogRef.close(res);
        });

    }

    close() {
        this.dialogRef.close();
    }

}

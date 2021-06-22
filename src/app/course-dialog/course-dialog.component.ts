import { AfterViewInit, Component, ElementRef, Inject, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Course } from "../model/course";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import * as moment from 'moment';
import { catchError, tap, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { EventEmitter } from 'events';
import { LoadingService } from '../loading/loading.services';
import { MessagesService } from '../messages/messages.service';
import { CoursesStore } from '../services/courses.store';

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css'],
    providers: [LoadingService, MessagesService]
})
export class CourseDialogComponent implements AfterViewInit {

    form: FormGroup;

    course: Course;



    constructor(
        private messageService: MessagesService,
        private courseStore: CoursesStore,
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) course: Course) {

        this.course = course;

        this.form = fb.group({
            description: [course.description, Validators.required],
            category: [course.category, Validators.required],
            releasedAt: [moment(), Validators.required],
            longDescription: [course.longDescription, Validators.required]
        });

    }

    ngAfterViewInit() {

    }

    save() {
        const changes = this.form.value;
        const obs$ = this.courseStore.updateCourse(this.course.id, changes).pipe
                (
                catchError(err => {
                    this.messageService.showError("Error saving changes!!");
                    return throwError(err)
                }
                )).subscribe();

         this.dialogRef.close(changes);

    }

    close() {
        this.dialogRef.close();
    }

}

import { Component, OnInit } from '@angular/core';
import { Course, sortCoursesBySeqNo } from '../model/course';
import { interval, noop, Observable, of, throwError, timer } from 'rxjs';
import { catchError, delay, delayWhen, filter, finalize, map, retryWhen, shareReplay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { CoursesService } from '../services/courses.services';
import { EventEmitter } from 'events';
import { LoadingService } from '../loading/loading.services';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;

  constructor(private courseService: CoursesService, private dialog: MatDialog, private loadingService : LoadingService) {

  }

  ngOnInit() {
    this.fetchDetail();
  }

  fetchDetail() {
    const courses$ = this.courseService.getAllCourses().pipe(map(x => x.sort(sortCoursesBySeqNo)));

    const loadedCourses = this.loadingService.untilcompletedLoading(courses$);

    this.beginnerCourses$ = loadedCourses.pipe(map(
      res => res.filter(x => x.category == "BEGINNER")
    ));

    this.advancedCourses$ = loadedCourses.pipe(map(
      res => res.filter(x => x.category == "ADVANCED")
    ));
  }

  editCourse(course: Course) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "400px";

    dialogConfig.data = course;

    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);

    dialogRef.afterClosed().pipe(filter(val=> val!=null)).subscribe(()=>{
      this.fetchDetail();
    })  
  }

}





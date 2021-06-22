import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Course, sortCoursesBySeqNo } from "../model/course";
import { HttpClient } from '@angular/common/http';
import { MessagesService } from '../messages/messages.service';
import { LoadingService } from '../loading/loading.services';
import { map, shareReplay, catchError, tap, filter } from 'rxjs/operators';

@Injectable({providedIn : "root"})
export class CoursesStore{

    private SaveCourses = new BehaviorSubject<Course[]>([]);
    viewCoursesObs = this.SaveCourses.asObservable();

    constructor (private http : HttpClient, private messageService : MessagesService, private loadingService : LoadingService){

        const courses$ = this.http.get<Course[]>("/api/courses").pipe(
            map(res=> res["payload"]),
            catchError(err=>{
                this.messageService.showError("Couldn't fetch courses from server!!")
                return throwError(err);
              }),
            tap(courses => this.SaveCourses.next(courses))
        );

        this.loadingService.untilcompletedLoading(courses$).subscribe();

    }

    onFilterCategory(category : string) :  Observable<Course[]>{
        return this.viewCoursesObs.pipe(map(courses=> courses.filter(course => course.category == category).sort(sortCoursesBySeqNo)));
    }

    updateCourse(courseId: string, changes : Partial<Course>) : Observable<any>{
        const inMemoryCourses = this.SaveCourses.getValue();
        const courseIndex = inMemoryCourses.findIndex(x=> x.id == courseId);

        const newCourse : Course = {
            ...inMemoryCourses[courseIndex],
            ...changes
        };

        const newCourses : Course[] = inMemoryCourses.slice(0);
        newCourses[courseIndex] = newCourse;
        this.SaveCourses.next(newCourses);

        return this.http.put("/api/courses/"+courseId, changes).pipe(catchError(err=>{
            this.messageService.showError("Couldn't fetch courses from server!!")
            return throwError(err);
          }), shareReplay());

        

    }


}

function sort(): import("rxjs").OperatorFunction<any, unknown> {
    throw new Error("Function not implemented.");
}

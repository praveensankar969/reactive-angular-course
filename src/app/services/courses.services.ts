import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { Course } from "../model/course";

@Injectable({providedIn : 'root'})
export class CoursesService{
    constructor(private http: HttpClient)  {

    }

    getAllCourses() : Observable<Course[]>{
        return this.http.get<Course[]>("/api/courses").pipe(
            map(res=> res["payload"]),
            shareReplay()
        );
    }

    updateCourse(courseId : string, course :Course) : Observable<Course[]>{
        return this.http.put<Course[]>("/api/courses/"+courseId, course).pipe(shareReplay());
    }
}
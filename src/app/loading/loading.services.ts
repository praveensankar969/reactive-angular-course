import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from 'rxjs';
import { concatMap, tap, finalize } from 'rxjs/operators';

@Injectable()
export class LoadingService{
    private loadingObservable$ = new BehaviorSubject<boolean>(false);
    public loading$ : Observable<boolean> = this.loadingObservable$.asObservable();

    untilcompletedLoading<T>($obs : Observable<T>) : Observable<T>{
        return of(null)
            .pipe(
                tap(()=> this.loadingOn()),
                concatMap(()=> $obs),
                finalize(()=> this.loadingOff())
            );
    }
   
    loadingOn(){
        this.loadingObservable$.next(true);
    }

    loadingOff(){
        this.loadingObservable$.next(false);
    }
}
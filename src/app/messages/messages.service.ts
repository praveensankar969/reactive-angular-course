import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, Observable, of } from 'rxjs';
import { tap, concatMap, finalize, filter } from 'rxjs/operators';

@Injectable()
export class MessagesService{

    showMessage$ = new BehaviorSubject<string[]>([]);

    showMessageObs$ = this.showMessage$.asObservable().pipe(filter(val=>
        val.length>=1
    ));

    showError(...err : string[]){
        this.showMessage$.next(err);
    }
    
}
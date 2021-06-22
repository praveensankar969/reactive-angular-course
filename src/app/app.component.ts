import {Component, OnInit} from '@angular/core';
import { LoadingService } from './loading/loading.services';
import { MessagesService } from './messages/messages.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers : []
})
export class AppComponent implements  OnInit {

    constructor() {

    }

    ngOnInit() {


    }

  logout() {

  }

}

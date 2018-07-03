import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  participants: Array<any>;

  constructor(private http: HttpClient) {
    http
      .get('http://localhost:3000/participants?maxRecords=3&view=Grid%20view')
      .subscribe((result: any) => this.participants = result.records);
  }
}

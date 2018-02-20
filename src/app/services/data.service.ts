import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  // constructor(private http: Http) {
  //   // var obj;
  //   // this.getJSON().subscribe(data => obj=data, error => console.log(error));
  // }

  // getData(): Observable<any> {
  //   const FILE_PATH = '../../assets/data/list_data.json';
  //   return this.http.get(FILE_PATH)
  //                   .map((res: any) => res.json())
  //                   .catch((error: any) => console.log(error));
  // }

  blogs$: Observable<Array<Blog>>;
  blogsError$: Observable<Response>;
  private blogsSubject: Subject<Array<Blog>>;
  private blogsErrorSubject: Subject<Response>;

  constructor(private http: Http) {
    this.blogsSubject = new Subject();
    this.blogs$ = this.blogsSubject.asObservable();
    this.blogsErrorSubject = new Subject();
    this.blogsError$ = this.blogsErrorSubject.asObservable();
  }

  getData(): void {
    const FILE_PATH = '../../assets/data/list_data.json';

    this.http.get(FILE_PATH)
              .map(res => res.json())
              .subscribe(
                blogs => this.blogsSubject.next(blogs),
                error => this.blogsErrorSubject.next(error)
              );
  }
}

export class Blog {
  title: string;
  description: string;
}

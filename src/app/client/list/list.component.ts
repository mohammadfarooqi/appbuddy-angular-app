import { Component, OnInit } from '@angular/core';
import { DataService, Blog } from '../../services/data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getData();

    this.dataService.blogs$.subscribe((blogs: Array<Blog>) => console.log(blogs));

    // this.dataService.blogsError$.subscribe((error: Response) => console.log(error));
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DataService, Blog } from '../../services/data.service';
import { Subscription } from 'rxjs';

declare var jQuery: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription;

  blogs: Array<Blog> = [];
  error: Boolean = false;

  constructor(private dataService: DataService, private router: Router) {
    this.subscriptions = new Subscription();
  }

  ngOnInit() {
    this.dataService.getBlogs();

    const blogsSubscription = this.dataService.blogs$.subscribe((blogs: Array<Blog>) => {
      console.log('Blogs Retrieved: ', blogs);
      this.blogs = blogs;
      this.error = false;
    });

    const blogsErrorSubscription = this.dataService.blogsError$.subscribe((error: Response) => {
      console.log('Error Retrieving Blogs: ', JSON.stringify(error));
      this.error = true;
    });

    this.subscriptions.add(blogsSubscription);
    this.subscriptions.add(blogsErrorSubscription);
  }

  shortenString(str) {
    const MAX_CHARS = 100;
    return str.length > MAX_CHARS ? str.substring(0, MAX_CHARS) + '...' : str;
  }

  editBlog(blog_id) {
    console.log('Clicked Blog ID = ', blog_id);
    this.router.navigate(['/edit', blog_id]);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

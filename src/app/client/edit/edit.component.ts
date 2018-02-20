import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, Blog } from '../../services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription;

  blog_id: Number = null;
  edit_blog: Blog = { title: '', description: '' };
  blogs: Array<Blog> = [];
  error: Boolean = false;

  constructor(private route: ActivatedRoute, private dataService: DataService, private router: Router) {
    this.subscriptions = new Subscription();
  }

  ngOnInit() {
    this.blog_id = parseInt(this.route.snapshot.paramMap.get('id'));
    console.log('Navigated to Blog ID ', this.blog_id);

    this.dataService.getBlogs();

    const blogsSubscription = this.dataService.blogs$.subscribe((blogs: Array<Blog>) => {
      console.log('Blogs Retrieved: ', blogs);
      this.blogs = blogs;
      this.error = false;

      this.edit_blog = this.blogs.filter((item, index) => this.blog_id === index)[0];
    });

    const blogsErrorSubscription = this.dataService.blogsError$.subscribe((error: Response) => {
      console.log('Error Retrieving Blogs: ', JSON.stringify(error));
      this.error = true;
    });

    this.subscriptions.add(blogsSubscription);
    this.subscriptions.add(blogsErrorSubscription);
  }

  submit(form) {
    console.log(form);
    this.router.navigate(['/list']);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

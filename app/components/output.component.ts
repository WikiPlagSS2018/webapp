import { Component } from '@angular/core';
import { PostsService } from '../services/posts.service'

@Component({
  selector: 'output-comp',
  templateUrl: './app/components/output.component.html',
  providers: [PostsService]
})
export class OutputComponent  {
  constructor(private postsService: PostsService){
    this.postsService.getPosts().subscribe(posts => console.log(posts));
  }

}

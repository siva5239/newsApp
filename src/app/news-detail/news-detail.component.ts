import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../news.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-news-detail',
  standalone: true,
  imports: [DatePipe,CommonModule],
  templateUrl: './news-detail.component.html',
  styleUrl: './news-detail.component.css'
})
export class NewsDetailComponent {
  
  newsItem: any;

  constructor(private route: ActivatedRoute, private newsService: NewsService) {}

  ngOnInit(): void {
    const index = +this.route.snapshot.paramMap.get('index')!;
    this.newsService.getNewsById(index).subscribe(news => {
      this.newsItem = news;  // Assign the news item to a local variable
    });
    console.log(this.newsItem)
  }

  
}

import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import { FormsModule, NgModel, ValueChangeEvent } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.css'
})
export class NewsListComponent implements OnInit {
  newsData:any[]=[];
  newsList: any[] = [];
  filteredNews: any[] = [];
  countries = ['USA', 'UK', 'India', 'Australia'];
  selectedCountry: string = '';
  searchQuery: string = '';
  fromDate: Date | null = null;
  toDate: Date | null = null;
  constructor(public newsService:NewsService,private router: Router){}
 ngOnInit(): void {
   this.getNewsData();
 }
 getNewsData(){
    this.newsService.fetchNews().subscribe((res:any)=>{
     
      // console.log(res.articles)
      this.newsData=res;
      // this.filteredNews=res.articles;
      console.log(this.newsData,'NEWS DATA')
    })
 }

 filterNews() {

  // this.newsData = this.newsData.filter(news => {
  //   return (
  //     (!this.selectedCountry || news.country === this.selectedCountry) &&
  //     (!this.fromDate || new Date(news.date) >= this.fromDate) &&
  //     (!this.toDate || new Date(news.date) <= this.toDate) &&
  //     (!this.searchQuery || news.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
  //   );
  // });
  if(this.searchQuery==''){
    this.getNewsData();
  }
  this.newsData = this.newsData.filter(news => {
    const matchesSearchQuery = news.title.toLowerCase().includes(this.searchQuery.toLowerCase());
    return  matchesSearchQuery;
  });

  console.log('Filtered News:', this.newsData);
 
}

filterByDate(): void {
  
  if (this.fromDate && this.toDate) {
    const from = new Date(this.fromDate).setHours(0, 0, 0, 0);
    const to = new Date(this.toDate).setHours(23, 59, 59, 999);

   const filtered  = this.newsData.filter(news => {
      const newsDate = new Date(news.publishedAt).getTime();
      return newsDate >= from && newsDate <= to;
    });
    
    this.newsData = filtered.length > 0 ? filtered : this.newsData;
    
    
  } else {
    this.newsData = this.newsData;
  }
}



navigateToDetail(index: number) {
  this.router.navigate(['/news', index]);
}

}

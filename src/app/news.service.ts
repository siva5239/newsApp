import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  public apiUrl="https://newsapi.org/v2/everything?q=tesla&from=2024-07-20&sortBy=publishedAt&apiKey=11d74a1bddad42eb9dbfcee572819cbd"
  private newsData: any[] = [];
  constructor(public https:HttpClient) { }

  // getNews(){
  //  return  this.https.get(this.apiUrl);
  // }

  fetchNews(): Observable<any[]> {
    return this.https.get<any>(this.apiUrl).pipe(
      map((response:any) => {
        this.newsData = response.articles;
        return this.newsData;
      })
    );
  }

  getNewsById(index: number): Observable<any> {
    const news = this.newsData[index];  
    return of(news);  
  }
  

  getNewsIndexById(id: number): Observable<number> {
    const index = this.newsData.findIndex(item => item.id === id);
    return of(index);
  }



  
}

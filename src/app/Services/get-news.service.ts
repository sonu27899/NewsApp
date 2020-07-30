import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetNewsService {

  api_key = '5c083635b38944afa9b1fe41adbb30d4';

  constructor(private _http:HttpClient) { }

  getNewsByCountry(country_name)
  {
    return this._http.get('https://newsapi.org/v2/top-headlines?pageSize=100&country='+ country_name + '&apiKey='+this.api_key);
  }
  getNewsByTopic(topic,starting_date,ending_date)
  {

    return this._http.get('https://newsapi.org/v2/everything?q=' + topic + '&from=' + starting_date + '&to=' + ending_date + '&apiKey=' + this.api_key);
  }
}

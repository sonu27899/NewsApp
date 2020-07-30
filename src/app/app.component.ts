import { Component, OnInit } from '@angular/core';
import { GetNewsService } from './Services/get-news.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'NewsApp';
  selectFormControl = new FormControl('', Validators.required)
  news_arr:Array<any>=[];
  flag:number=0;
  country_name:string="us";
  from_date=new Date(Date.now());
  to_date=new Date(Date.now());
  description_arr:Array<any>=[];
  show_news:boolean=true;
  show_description:boolean=false;
  starting_date:string;
  ending_date:string;
  topic:string;
  constructor(private _newsser:GetNewsService) { }

  OnSelect(item)
  {
    this._newsser.getNewsByCountry(item.value).subscribe(
      (data:any)=>{
        this.news_arr=data.articles;
      }
    )
  }
  dateformat(item)
  {
    var day=item.getDate();
    var month=item.getMonth()+1;
    var year=item.getFullYear();

    return year + '-' + month + '-' + day;
  }
  OnSubmit()
  {

    this.starting_date=this.dateformat(this.from_date);

    this.starting_date=this.dateformat(this.from_date);
    this.ending_date=this.dateformat(this.to_date);
    this._newsser.getNewsByTopic(this.topic,this.starting_date,this.ending_date).subscribe(
       (data:any)=>
       {

         this.news_arr=data.articles;

       }
     )
  }
  ngOnInit(): void {

    this._newsser.getNewsByCountry(this.country_name).subscribe(
      (data:any)=>{

        this.news_arr=data.articles;

      }
    )


  }
  OnDescription(item)
  {
    this.description_arr[0]=item;
     this.flag=1;
     this.show_news=false;
     this.show_description=true;
  }
  OnBack()
  {
    this.show_news=true;
    this.show_description=false;
  }
}

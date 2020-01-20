import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: [ './chart.component.css' ]
})
export class ChartComponent implements OnInit, OnDestroy {
  public values = '';
  public selectChart = false;
  public selectedLabel = '';
  public selectedValue = 0;
  subscription: Subscription;
  statSubscription: Subscription;
  message: any = '';
  trendingTweetStat: any;

//   public pieChartColors: Array < any > = [{
//     backgroundColor: ['red', 'yellow', 'rgba(148,159,177,0.2)'],
//     borderColor: ['rgba(135,206,250,1)', 'rgba(106,90,205,1)', 'rgba(148,159,177,1)']
//  }];
  public pieChartLabels = [];
  public pieChartData = [];
  public pieChartType = 'pie';

  constructor(private dataService: DataService) {
    this.subscription = this.dataService.getTrendingTweetStat().subscribe(message => {
      if (message === undefined || message === '') {
        this.selectChart = false;
      } else {
        console.log(message);
        this.message = message.selectedTweet;
        message.promise.then(
          (trendingTweetStat) => {
            const trendingTweetStatJson =  JSON.parse(JSON.stringify(trendingTweetStat));
            // tslint:disable-next-line: forin
            for (const i in trendingTweetStatJson) {
              const wordCount = trendingTweetStatJson[i];
              this.pieChartLabels.push(wordCount[0]);
              this.pieChartData.push(wordCount[1]);
            }
            console.log(this.pieChartLabels);
            console.log(this.pieChartData);
            this.trendingTweetStat = trendingTweetStat;
      });
        this.selectChart = true;
      }
    });

    this.statSubscription = this.dataService.getStatFlag().subscribe(flag => {
       this.selectChart = flag;
       this.message = '';
       this.pieChartLabels = [];
       this.pieChartData = [];
      });
   }

  ngOnInit() {
  }

searchTweetStat() {
  if (this.message === '' || this.message === undefined) {
    this.selectChart = false;
  } else {
    this.dataService.sendTrendingTweet(this.message);
  }
}
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    chartHovered(event: any) {
      console.log(event);
    }

    chartClicked(event: any) {
      console.log(event);
    }
}

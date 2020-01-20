import { Component, OnInit } from '@angular/core';
import { CountryList } from '../country-list';
import { DataService } from '../data.service';

@Component({
  selector: 'app-trending-tweet',
  templateUrl: './trending-tweet.component.html',
  styleUrls: ['./trending-tweet.component.css']
})
export class TrendingTweetComponent implements OnInit {
  selectedCountry: string;
  countries: any[];
  cities: any[];
  tweets: any;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.countries = this.dataService.getCountryList();
  }

  onSelectCountry(selectedCountry) {
    this.cities = this.dataService.getCityList(selectedCountry);
    this.tweets = [];
  }

  onSelectState(selectedCity) {
      this.dataService.getTweets(selectedCity, this.selectedCountry).then(
        (trendingList: {}) => {
              this.tweets = trendingList;
        }
      );
  }

  selectedTrendingTweet(selectedTweet: string) {
    console.log(selectedTweet);
    this.dataService.sendTrendingTweet(selectedTweet);
  }
}

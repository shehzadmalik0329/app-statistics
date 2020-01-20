import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { CountryList } from './country-list';


@Injectable()
export class DataService {


    private trendingTweetUrl = 'http://localhost:8080/getTrends';
    private trendingTweetStats = 'http://localhost:8080/getCommonWords';

  private tweetSubject = new Subject<any>();
  private statFlagSubject = new Subject<any>();

  public resp: any;

  constructor(private http: HttpClient) { }

  public getCountryList() {
    const countrySet = new Set();
    for (const country in CountryList) {
      if (CountryList[country].country !== '') {
        countrySet.add(CountryList[country].country);
      }
    }
    return Array.from(countrySet).sort();
  }

public getCityList(selectedCountry: string) {
    const citySet = new Set();
    for (const country in CountryList) {
    if (CountryList[country].country === selectedCountry &&
    CountryList[country].name !== selectedCountry) {
    citySet.add(CountryList[country].name);
    }
    }
    this.statFlagSubject.next(false);
    return Array.from(citySet).sort();
}

  getTweets(selectedCity: any, selectedCountry: string) {
    if (selectedCity !== 0 ) {
      const countryCity = CountryList.filter(countryCityData => {
        if (countryCityData.country === selectedCountry
        && countryCityData.name === selectedCity) {
          return countryCityData;
        }
      });

      const requestBody = {
        woeid: countryCity[0].woeid
      };
      return this.getResponseFromServer(this.trendingTweetUrl, requestBody);
    }
  }

    sendTrendingTweet(tweet: string) {

        const requestBody = {
            query: tweet
          };

        const responseBody = {
            selectedTweet: tweet,
            promise: this.getResponseFromServer(this.trendingTweetStats, requestBody)
        };

        this.tweetSubject.next(responseBody);
    }

    clearMessage() {
        this.tweetSubject.next();
    }

    getTrendingTweetStat(): Observable<any> {
        return this.tweetSubject.asObservable();
    }

    getStatFlag(): Observable<any> {
        return this.statFlagSubject.asObservable();
    }

    getResponseFromServer(url, requestBody) {
        return this.http.post(url, requestBody).toPromise();
    }
}

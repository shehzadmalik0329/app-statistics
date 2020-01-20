import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingTweetComponent } from './trending-tweet.component';

describe('TrendingTweetComponent', () => {
  let component: TrendingTweetComponent;
  let fixture: ComponentFixture<TrendingTweetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrendingTweetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendingTweetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

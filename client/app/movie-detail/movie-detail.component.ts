import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { Subscription } from "rxjs/Subscription"
import { Movie } from "../shared/models/movie.model"
import { QuotesApiService } from "../shared/services/quotes-api.service"

@Component({
    selector: "movie-detail-component",
    template: `
        <br>
        <section *ngIf="movie" class="movie-detail-component text-center">
            <div class="inline-block"></div>
            <div class="image-frame inline-block">
                <img src="{{movie.image}}">
            </div>
            <div class="inline-block"></div>
            <div class="movie-title italic-em">Title: {{movie.title}}</div>
            <div>Year: {{movie.year}}</div>
            <br>
            <div>Director: {{movie.director}}</div>
            <br>
            <div>
                <a class="underlined" routerLink="/categories/{{movie.category.id}}">
                    Category: {{movie.category.title}}
                </a>
            </div>
            <br><br>
            <div>List of quotes in this category:</div>
            <br>
            <ul>
                <li *ngFor="let quote of movie.quotes">
                    <a routerLink="/quotes/{{quote.id}}">
                        <div class="quote-text">"{{quote.text}}"</div>
                        <div class="quote-character">-{{quote.character}}</div>
                    </a>
                </li>
            </ul>
        </section>
    `
})

export class MovieDetailComponent implements OnInit {

    movie: Movie

    constructor(private _route: ActivatedRoute, private _api: QuotesApiService) {}

    private _routeSubscription: Subscription
    
    ngOnInit() {
        this._routeSubscription = this._route.params.subscribe(async param => {
            try {
                this.movie = await this._api.getMovieById(param.id)
            } catch(err) {
                console.error(err)
            }
        })
    }

    ngOnDestroy() {
        this._routeSubscription.unsubscribe()
    }

}

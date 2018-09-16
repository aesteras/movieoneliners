import { Component, OnInit } from "@angular/core"
import { Quote } from "../shared/models/quote.model"
import { ActivatedRoute } from "@angular/router"
import { QuotesApiService } from "../shared/services/quotes-api.service"
import { Subscription } from "rxjs/Subscription"
import { Movie } from "../shared/models/movie.model"
// import { Category } from "../shared/models/category.model"

@Component({
    selector: "quote-detail-component",
    template: `
        <section *ngIf="quote" class="quote-detail-component text-center">
            <div class="quote-text"><span class="normal-text">Quote:</span> "{{quote.text}}"</div>
            <div class="quote-character">Character: {{quote.character}}</div>
            <div class="quote-character quote-movie">
                <a class="underlined" routerLink="/movies/{{quote.movie.id}}">
                    Movie: {{quote.movie.title}}
                </a>
            </div>
            <div *ngIf="movie" class="quote-character quote-category">
                <a class="underlined" routerLink="/categories/{{movie.category.id}}">Category: {{movie.category.title}}</a>
            </div>
            <div class="quote-character quote-year">Year: {{quote.movie.year}}</div>
        </section>
    `
})

export class QuoteDetailComponent implements OnInit {

    quote: Quote
    movie: Movie

    constructor(private _route: ActivatedRoute, private _api: QuotesApiService) {}

    private _routeSubscription: Subscription
    
    ngOnInit() {
        this._routeSubscription = this._route.params.subscribe(async param => {
            try {
                this.quote = await this._api.getQuoteById(param.id)
                this.movie = await this._api.getMovieById(this.quote.movie.id)
            } catch(err) {
                console.error(err)
            }
        })
    }

    ngOnDestroy() {
        this._routeSubscription.unsubscribe()
    }

}

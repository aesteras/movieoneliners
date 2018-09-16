import { Component, OnInit } from "@angular/core"
import { Quote } from "../models/quote.model"
import { QuotesApiService } from "../services/quotes-api.service"

@Component({
    selector: "random-quote-component",
    template: `
        <div class="random-quote-component" *ngIf="randomQuote">
            <div class="quote-text"><a routerLink="/quotes/{{randomQuote.id}}">"{{ randomQuote.text }}"</a></div>
            <div class="quote-character">- {{ randomQuote.character }}</div>
            <a (click)="onShowRandomQuote()" class="btn btn-next">
                <span>Next</span> 
            </a>
        </div>
    `
})


export class RandomQuoteComponent implements OnInit{
    
    quotes: Quote[]
    randomQuote: Quote

    constructor(private _api: QuotesApiService) {}
    
    async ngOnInit() {
        try {
            this.quotes = await this._api.getQuotes()
        } catch(err) {
            console.error(err)
        }
        this.onShowRandomQuote()
    }

    onShowRandomQuote() {
        this.randomQuote = this.quotes[Math.floor(Math.random() * this.quotes.length)]
    }

}

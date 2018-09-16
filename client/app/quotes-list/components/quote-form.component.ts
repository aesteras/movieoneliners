import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core"
import { Quote } from "../../shared/models/quote.model"
import { QuotesApiService } from "../../shared/services/quotes-api.service"
import { Movie } from "../../shared/models/movie.model";

@Component({
    selector: "quote-form-component",
    template: `
        <div class="popup" *ngIf="isOpened">
            <div class="popup-body">
                <h2 class="text-center form-title">Create a new quote</h2>
                <form novalidate #quoteForm="ngForm">
                    <div class="form-field">
                        <label>Text:</label>
                        <textarea
                            type="text"
                            placeholder="Quote text"
                            [(ngModel)] = "quote.text"
                            maxlength="200"
                            minlength="1"
                            required="true"
                            name="text"
                            #text="ngModel"
                        >
                        </textarea>
                        <div *ngIf="text.invalid && text.dirty">This field is required.</div>
                    </div>
                    <div class="form-field">
                        <label>Character:</label>
                        <input 
                            type="text"
                            placeholder="Quote character"
                            [(ngModel)] = "quote.character"
                            maxlength="50"
                            minlength="1"
                            required="true"
                            name="character"
                            #character="ngModel"
                        >
                        <div *ngIf="character.invalid && character.dirty">This field is required.</div>
                    </div>
                    <div class="form-field">
                        <label>Movie:</label>
                        <select
                            required="true"
                            name="movie"
                            [(ngModel)]="quote.movie_id"
                            #movie="ngModel"
                        >
                            <option
                                *ngFor="let movie of movies"
                                [value]="movie.id"
                            >
                                {{movie.title}}
                            </option>
                        </select>
                        <div *ngIf="movie.invalid && movie.dirty">This field is required.</div>
                    </div>
                    <div class="form-field text-right">
                        <a
                            class="btn"
                            (click)="onCancelQuote()"
                        >
                            Cancel
                        </a>
                        <a
                            class="btn"
                            (click)="onSendQuote()"
                            [class.inactive]="quoteForm.form.invalid"
                        >
                            Submit
                        </a>
                    </div>
                </form>
            </div>
            <div class="backdrop"></div>
        </div>
    `
})

export class QuoteFormComponent {
    
    private quote: Quote = new Quote()
    private movies: Movie[] = []

    private isOpened: boolean = false
    private isEditing: boolean = false

    @Output() private onSubmitted = new EventEmitter<Quote>()
    @Output() private onUpdated = new EventEmitter<Quote>()

    constructor(private _api: QuotesApiService) {}

    async init() {
        if (this.movies.length > 0) return
        try {
            this.movies = await this._api.getMovies()
        } catch(err) {
            console.error(err)
        }
    }

    private async onSendQuote() {
        try {
            if (!this.isEditing) {
                this.quote = await this._api.postQuote(this.quote)
                this.onSubmitted.emit(this.quote)
            } else {
                await this._api.putQuote(this.quote)
                this.onUpdated.emit(this.quote)
            }
        } catch(err) {
            console.error(err)
        }
    }

    private onCancelQuote() {
        this.close()
    }

    // PUBLIC

    public open(quote?: Quote) {
        this.isOpened = true
        if (quote) {
            this.quote = quote
            this.isEditing = true
        } else {
            this.quote = new Quote()
            this.isEditing = false
        }
        this.init()
    }

    public close() {
        this.isOpened = false
    }

}

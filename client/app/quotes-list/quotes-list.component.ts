import { Component, OnInit, ViewChild, Input } from "@angular/core"
import { Quote } from "../shared/models/quote.model"
import { QuotesApiService } from "../shared/services/quotes-api.service"
import { QuoteFormComponent } from "./components/quote-form.component"
import { AuthService } from "../shared/services/auth.service"

@Component({
    selector: "quotes-list-component",
    template: `
        <section class="quote-list-component">
            <div class="text-center list-quotes">List of quotes</div>
            <ul>
                <li *ngFor="let quote of quotes">
                    <div class="quote-frame">
                        <div class="quote-text">
                            <a class="quote-link" routerLink="/quotes/{{quote.id}}">
                                "{{quote.text}}"
                                &nbsp;
                            </a>
                        </div>
                        <div class="quote-character">- {{quote.character}}</div>
                    </div>
                    <div  *ngIf="isAuthorized" class="edit-frame">
                        <a class="btn btn-edit" (click)="onEditQuote(quote)" title="Edit quote">
                            <span class="edit-icon">&#x270e;</span>
                        </a>
                    </div>
                </li>
            </ul>
            <br>
            <div class="text-center add-frame">
                <a *ngIf="isAuthorized" (click)="onAddNewQuote()" class="btn btn-add">
                    <span>Add</span> 
                </a>
            </div>
            <quote-form-component
                #quoteForm
                (onSubmitted)="onNewQuoteAdded($event)"
                (onUpdated)="onQuoteUpdated($event)"
            >
            </quote-form-component>
        </section>
    `
})

export class QuotesListComponent implements OnInit {
    
    quotes: Quote[]
    isAuthorized: boolean = false
    
    @ViewChild(QuoteFormComponent)
    quoteForm: QuoteFormComponent

    constructor(private _api: QuotesApiService, private _auth: AuthService) {}
    
    async ngOnInit() {
        this.isAuthorized = this._auth.isAuthorized()
        try {
            this.quotes = await this._api.getQuotes()
        } catch(err) {
            console.error(err)
        }
    }

    onAddNewQuote() {
        this.quoteForm.open()
    }

    onEditQuote(quote: Quote) {
        this.quoteForm.open(quote)
    }

    onNewQuoteAdded(newQote: Quote) {
        this.quotes.push(newQote)
        this.quoteForm.close()
    }

    onQuoteUpdated(quote: Quote) {
        let i = this.quotes.findIndex(q => q.id == quote.id)
        this.quotes[i] = quote
        this.quoteForm.close()
    }

}

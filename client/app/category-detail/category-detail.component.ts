import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { Subscription } from "rxjs/Subscription"
import { Category } from "../shared/models/category.model"
import { QuotesApiService } from "../shared/services/quotes-api.service"

@Component({
    selector: "category-detail-component",
    template: `
        <section *ngIf="category" class="category-detail-component text-center">
            <div class="category-title">Title: {{category.title}}</div>
            <div>Description: {{category.description}}</div>
            <br><br>
            <div>List of movies in this category:</div>
            <br>
            <ul>
                <li *ngFor="let movie of category.movies">
                    <a routerLink="/movies/{{movie.id}}">
                        <div class="quote-text">{{movie.title}} ({{movie.year}})</div>
                    </a>
                </li>
            </ul>
        </section>
    `
})

export class CategoryDetailComponent implements OnInit {

    category: Category

    constructor(private _route: ActivatedRoute, private _api: QuotesApiService) {}

    private _routeSubscription: Subscription
    
    ngOnInit() {
        this._routeSubscription = this._route.params.subscribe(async param => {
            try {
                this.category = await this._api.getCategoryById(param.id)
            } catch(err) {
                console.error(err)
            }
        })
    }

    ngOnDestroy() {
        this._routeSubscription.unsubscribe()
    }

}

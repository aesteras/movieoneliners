import { Component, OnInit } from "@angular/core"
import { Category } from "../shared/models/category.model"
import { QuotesApiService } from "../shared/services/quotes-api.service"

@Component({
    selector: "categories-list-component",
    template: `
        <section class="category-list-component">
            <div class="text-center">
            <div class="select-category">List of categories</div>
                <ul class="categories-frame">
                    <li *ngFor="let category of categories">
                        <a routerLink="/categories/{{category.id}}">
                            {{ category.title }}
                        </a>
                    </li>
                </ul>
            </div>
        </section>
    `
})

export class CategoriesListComponent implements OnInit{

    categories: Category[]

    constructor(private _api: QuotesApiService) {}
    
    async ngOnInit() {
        try {
            this.categories = await this._api.getCategories()
        } catch(err) {
            console.error(err)
        }
    }

}

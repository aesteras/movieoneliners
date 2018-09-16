import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core"
import { Movie } from "../../shared/models/movie.model"
import { QuotesApiService } from "../../shared/services/quotes-api.service"
import { Category } from "../../shared/models/category.model"

@Component({
    selector: "movie-form-component",
    template: `
        <div class="popup" *ngIf="isOpened">
            <div class="popup-body">
                <h2 class="text-center form-title">Create a new movie</h2>
                <form novalidate #movieForm="ngForm">
                    <div class="form-field">
                        <label>Title:</label>
                        <input
                            type="text"
                            placeholder="Movie title"
                            [(ngModel)] = "movie.title"
                            maxlength="200"
                            minlength="1"
                            required="true"
                            name="title"
                            #title="ngModel"
                        >
                        <div *ngIf="title.invalid && title.dirty">This field is required.</div>
                    </div>
                    <div class="form-field">
                        <label>Year:</label>
                        <input
                            type="number"
                            placeholder="Movie year"
                            [(ngModel)] = "movie.year"
                            max="9999"
                            min="1"
                            required="true"
                            name="year"
                            #year="ngModel"
                        >
                        <div *ngIf="year.invalid && year.dirty">This field is required.</div>
                    </div>
                    <div class="form-field">
                        <label>Director:</label>
                        <input
                            type="text"
                            placeholder="Movie director"
                            [(ngModel)] = "movie.director"
                            maxlength="50"
                            minlength="1"
                            required="true"
                            name="director"
                            #director="ngModel"
                        >
                        <div *ngIf="director.invalid && director.dirty">This field is required.</div>
                    </div>
                    <div class="form-field">
                        <label>Category:</label>
                        <select
                            required="true"
                            name="category"
                            [(ngModel)] = "movie.category_id"
                            #category="ngModel"
                        >
                            <option
                                *ngFor="let category of categories"
                                [value] = "category.id"
                            >
                                {{category.title}}
                            </option>
                        </select>
                        <div *ngIf="category.invalid && category.dirty">This field is required.</div>
                    </div>
                    <div class="form-field text-right">
                        <a
                            class="btn"
                            (click)="onCancelMovie()"
                        >
                            Cancel
                        </a>
                        <a
                            class="btn"
                            (click)="onSendMovie()"
                            [class.inactive]="movieForm.form.invalid"
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

export class MovieFormComponent {
    
    private movie: Movie = new Movie()
    private categories: Category[] = []

    private isOpened: boolean = false
    private isEditing: boolean = false

    @Output() private onSubmitted = new EventEmitter<Movie>()
    @Output() private onUpdated = new EventEmitter<Movie>()

    constructor(private _api: QuotesApiService) {}

    async init() {
        if (this.categories.length > 0) return
        try {
            this.categories = await this._api.getCategories()
        } catch(err) {
            console.error(err)
        }
    }

    private async onSendMovie() {
        try {
            if (!this.isEditing) {
                if (!this.movie.image) this.movie.image = "/api/images/noimage.png"
                this.movie = await this._api.postMovie(this.movie)
                this.onSubmitted.emit(this.movie)
            } else {
                await this._api.putMovie(this.movie)
                this.onUpdated.emit(this.movie)
            }
        } catch(err) {
            console.error(err)
        }
    }

    private onCancelMovie() {
        this.close()
    }

    // PUBLIC

    public open(movie?: Movie) {
        this.isOpened = true
        if (movie) {
            this.movie = movie
            this.isEditing = true
        } else {
            this.movie = new Movie()
            this.isEditing = false
        }
        this.init()
    }

    public close() {
        this.isOpened = false
    }

}

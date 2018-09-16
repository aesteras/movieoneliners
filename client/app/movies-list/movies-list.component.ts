import { Component, OnInit, ViewChild, Input } from "@angular/core"
import { Movie } from "../shared/models/movie.model"
import { QuotesApiService } from "../shared/services/quotes-api.service"
import { MovieFormComponent } from "./components/movie-form.component"
import { AuthService } from "../shared/services/auth.service"

@Component({
    selector: "movies-list-component",
    template: `
        <section class="movie-list-component">
            <div class="text-center list-movies">List of movies</div>
            <ul>
                <li *ngFor="let movie of movies">
                    <div class="movie-frame">
                        <div class="movie-title">
                            <a class="movie-link italic-em" routerLink="/movies/{{movie.id}}">
                                {{movie.title}} ({{movie.year}})
                            </a>
                        </div>
                    </div>
                    <div  *ngIf="isAuthorized" class="edit-frame">
                        <a class="btn btn-edit" (click)="onEditMovie(movie)" title="Edit movie">
                            <span class="edit-icon">&#x270e;</span>
                        </a>
                    </div>
                </li>
            </ul>
            <br>
            <div class="text-center add-frame">
                <a *ngIf="isAuthorized" (click)="onAddNewMovie()" class="btn btn-add">
                    <span>Add</span> 
                </a>
            </div>
            <movie-form-component
                #movieForm
                (onSubmitted)="onNewMovieAdded($event)"
                (onUpdated)="onMovieUpdated($event)"
            >
            </movie-form-component>
        </section>
    `
})

export class MoviesListComponent implements OnInit {
    
    movies: Movie[]
    isAuthorized: boolean = false
    
    @ViewChild(MovieFormComponent)
    movieForm: MovieFormComponent

    constructor(private _api: QuotesApiService, private _auth: AuthService) {}
    
    async ngOnInit() {
        this.isAuthorized = this._auth.isAuthorized()
        try {
            this.movies = await this._api.getMovies()
        } catch(err) {
            console.error(err)
        }
    }

    onAddNewMovie() {
        this.movieForm.open()
    }

    onEditMovie(movie: Movie) {
        this.movieForm.open(movie)
    }

    onNewMovieAdded(newQote: Movie) {
        this.movies.push(newQote)
        this.movieForm.close()
    }

    onMovieUpdated(movie: Movie) {
        let i = this.movies.findIndex(q => q.id == movie.id)
        this.movies[i] = movie
        this.movieForm.close()
    }

}

import { Injectable } from "@angular/core"
import { Http } from "@angular/http"
import { Quote } from "../models/quote.model"
import { User } from "../models/user.model"
import { Router } from "@angular/router"
import { Movie } from "../models/movie.model"
import { Category } from "../models/category.model"

@Injectable()

export class QuotesApiService {

    constructor(private _http: Http, private _router: Router) {}

    private _throwError(error) {
        if(error.status === 401) {
            this._router.navigate(["login"])
        }
        throw error
    }

    private _get(url): Promise<any> {
        return this._http.get("/api/" + url)
            .toPromise()
            .then(response => response.json())
            .catch(error => this._throwError(error))
    }

    private _post(url, data): Promise<any> {
        return this._http.post("/api/" + url, data)
            .toPromise()
            .then(response => response.json())
            .catch(error => {
                if (url === "login") {
                    this._throwError(error)
                } else {
                    this._router.navigate(["signin"])
                    throw error
                }
            })
    }

    private _put(url, data): Promise<any> {
        return this._http.put("/api/" + url, data)
            .toPromise()
            .then(response => response.json())
            .catch(error => this._throwError(error))
    }

    // PUBLIC

    // QUOTES

    public getQuotes(): Promise<any> {
        return this._get("quotes")
    }

    public getQuoteById(id: number): Promise<any> {
        return this._get("quotes/" + id)
    }

    public postQuote(quote: Quote) {
        return this._post("quotes", quote)
    }

    public putQuote(quote: Quote): Promise<any> {
        return this._put("quotes/" + quote.id, quote)
    }

    // CATEGORIES

    public getCategories(): Promise<any> {
        return this._get("categories")
    }

    public getCategoryById(id: number): Promise<any> {
        return this._get("categories/" + id)
    }

    public postCategory(category: Category) {
        return this._post("categories", category)
    }

    public putCategory(category: Category): Promise<any> {
        return this._put("categories/" + category.id, category)
    }

    // MOVIES

    public getMovies(): Promise<any> {
        return this._get("movies")
    }

    public getMovieById(id: number): Promise<any> {
        return this._get("movies/" + id)
    }

    public postMovie(movie: Movie) {
        return this._post("movies", movie)
    }

    public putMovie(movie: Movie): Promise<any> {
        return this._put("movies/" + movie.id, movie)
    }

    // AUTH

    public login(user: User) {
        return this._post("login", user)
    }

    public signin(user: User) {
        return this._post("signin", user)
    }

    public logout() {
        return this._post("logout", null)
    }

}

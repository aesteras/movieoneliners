import { Routes } from "@angular/router"
import { CategoriesListComponent } from "./categories-list/categories-list.component"
import { RandomQuoteComponent } from "./shared/components/random-quote.component"
import { QuoteDetailComponent } from "./quote-detail/quote-detail.component"
import { CategoryDetailComponent } from "./category-detail/category-detail.component"
import { NotFoundComponent } from "./errors/not-found.component"
import { QuotesListComponent } from "./quotes-list/quotes-list.component"
import { UnderConstructionComponent } from "./shared/components/under-construction.component"
import { HomePageComponent } from "./home-page/home-page.component"
import { LoginComponent } from "./login/login.component"
import { SigninComponent } from "./signin/signin.component"
import { MoviesListComponent } from "./movies-list/movies-list.component"
import { MovieDetailComponent } from "./movie-detail/movie-detail.component"
import { ProfileComponent } from "./profile/profile-component"
import { AboutComponent } from "./about/about-component"

export const appRoutes: Routes = [
    { path: "", component: HomePageComponent },
    { path: "login", component: LoginComponent },
    { path: "signin", component: SigninComponent },
    { path: "profile", component: ProfileComponent },
    { path: "quotes/random", component: RandomQuoteComponent },
    { path: "quotes", component: QuotesListComponent },
    { path: "quotes/:id", component: QuoteDetailComponent },
    { path: "categories", component: CategoriesListComponent },
    { path: "categories/:id", component: CategoryDetailComponent },
    { path: "movies", component: MoviesListComponent },
    { path: "movies/:id", component: MovieDetailComponent },
    { path: "underconstruction", component: UnderConstructionComponent },
    { path: "about", component: AboutComponent },
    { path: "**", pathMatch: "full", component: NotFoundComponent }
]

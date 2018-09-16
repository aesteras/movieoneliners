import { NgModule } from "@angular/core"
import { HttpModule } from "@angular/http"
import { BrowserModule } from "@angular/platform-browser"
import { FormsModule } from "@angular/forms"

import { AppComponent } from "./app.component"
import { RandomQuoteComponent } from "./shared/components/random-quote.component"
import { QuotesApiService } from "./shared/services/quotes-api.service"
import { CategoriesListComponent } from "./categories-list/categories-list.component"
import { RouterModule } from "@angular/router"
import { appRoutes } from "./routes"
import { CategoryDetailComponent } from "./category-detail/category-detail.component"
import { NotFoundComponent } from "./errors/not-found.component"
import { NavBarComponent } from "./shared/components/nav-bar.component"
import { QuotesListComponent } from "./quotes-list/quotes-list.component"
import { QuoteDetailComponent } from "./quote-detail/quote-detail.component"
import { QuoteFormComponent } from "./quotes-list/components/quote-form.component"
import { UnderConstructionComponent } from "./shared/components/under-construction.component"
import { HomePageComponent } from "./home-page/home-page.component"
import { LoginComponent } from "./login/login.component"
import { AuthService } from "./shared/services/auth.service"
import { SigninComponent } from "./signin/signin.component"
import { MoviesListComponent } from "./movies-list/movies-list.component"
import { MovieFormComponent } from "./movies-list/components/movie-form.component"
import { MovieDetailComponent } from "./movie-detail/movie-detail.component"
import { ProfileComponent } from "./profile/profile-component"
import { InfoBarComponent } from "./shared/components/info-bar-component"
import { AboutComponent } from "./about/about-component"

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes),
        BrowserModule,
        HttpModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        SigninComponent,
        RandomQuoteComponent,
        QuotesListComponent,
        QuoteDetailComponent,
        QuoteFormComponent,
        CategoriesListComponent,
        CategoryDetailComponent,
        NotFoundComponent,
        NavBarComponent,
        InfoBarComponent,
        UnderConstructionComponent,
        HomePageComponent,
        MoviesListComponent,
        MovieFormComponent,
        MovieDetailComponent,
        ProfileComponent,
        AboutComponent
    ],
    providers: [
        AuthService,
        QuotesApiService
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule {}

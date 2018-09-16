import { Component, OnInit, OnDestroy } from "@angular/core"
import { AuthService } from "../services/auth.service"
import { Subscription } from "rxjs/Subscription"
import { QuotesApiService } from "../services/quotes-api.service"
import { Router } from "@angular/router"

@Component({
    selector: "nav-bar-component",
    template: `
        <div class="nav-bar">
            <div class="top-banner">
                <a routerLink="/" class="web-title">Movie One-Liners</a>
            </div>
            <div class="bottom-bar">
                <a class="btn btn-nav" routerLink="/categories">Categories List</a>
                <a class="btn btn-nav" routerLink="/movies">Movies List</a>
                <a class="btn btn-nav" routerLink="/quotes">Quotes List</a>
                <a class="btn btn-nav" routerLink="/quotes/random">Random Quote</a>
                <a *ngIf="!isLogged" class="btn btn-nav" routerLink="/signin">Sign in</a>
                <a *ngIf="!isLogged" class="btn btn-nav" routerLink="/login">Log in</a>
                <a *ngIf="isLogged" class="btn btn-nav" routerLink="/profile">Profile</a>
                <a *ngIf="isLogged" class="btn btn-nav" (click)="onLogout()">Log out</a>
            </div>
        </div>
    `
})

export class NavBarComponent implements OnInit, OnDestroy {
    
    constructor(private _auth: AuthService, private _api: QuotesApiService, private _router: Router) {}

    isLogged: boolean = false
    private _isLoggedSubscription: Subscription

    ngOnInit() {
        this._auth.isLogged$.subscribe(isLogged => {
            this.isLogged = isLogged
        })
    }

    ngOnDestroy() {
        this._isLoggedSubscription.unsubscribe()
    }

    async onLogout() {
        try{
            let token = await this._api.logout()
            this._auth.announceIsLogged()
            this._router.navigate(["/"])
        } catch(err) {
            console.error(err)
        }
    }

}

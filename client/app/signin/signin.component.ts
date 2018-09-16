import { Component, OnInit } from "@angular/core"
import { User } from "../shared/models/user.model"
import { QuotesApiService } from "../shared/services/quotes-api.service"
import { AuthService } from "../shared/services/auth.service"
import { Router } from "@angular/router"

@Component({
    selector:"signin-component",
    template: `
        <section class="signin-component container">
            <h1 class="text-center">Sign in</h1>
            <div class="form-field">
                <label for="email">Username:</label>
                <input
                    placeholder="Email"
                    type="text"
                    name="email"
                    [(ngModel)] = "user.email"
                >
                <label for="Password">Password:</label>
                <input
                    placeholder="Password"
                    type="password"
                    name="password"
                    [(ngModel)] = "user.password"
                >
                <label for="Repeat password">Repeat password:</label>
                <input
                    placeholder="Password"
                    type="password"
                    name="password2"
                    [(ngModel)] = "user.password2"
                >
            </div>
            <div class="text-center">
                <a class="btn btn-signin" (click)="onSendSignin(user)">Sign in</a>
            </div>
        </section>
    `
})

export class SigninComponent {
    
    user: User = new User()

    constructor(private _api: QuotesApiService, private _router: Router, private _auth: AuthService) {}

    async onSendSignin() {
        try{
            let token = await this._api.signin(this.user)
            this._auth.announceIsLogged()
            this._router.navigate(["/"])
        } catch(err) {
            console.error(err)
        }
    }

}

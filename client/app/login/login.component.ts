import { Component, OnInit } from "@angular/core"
import { User } from "../shared/models/user.model"
import { QuotesApiService } from "../shared/services/quotes-api.service"
import { AuthService } from "../shared/services/auth.service"
import { Router } from "@angular/router"

@Component({
    selector:"login-component",
    template: `
        <section class="login-component container">
            <h1 class="text-center">Log in</h1>
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
            </div>
            <div class="text-center">
                <a class="btn btn-login" (click)="onSendLogin(user)">Log in</a>
            </div>
        </section>
    `
})

export class LoginComponent {
    
    user: User = new User()

    constructor(private _api: QuotesApiService, private _router: Router, private _auth: AuthService) {}

    async onSendLogin() {
        try{
            let token = await this._api.login(this.user)
            this._auth.announceIsLogged()
            this._router.navigate(["/"])
        } catch(err) {
            console.error(err)
        }
    }

}

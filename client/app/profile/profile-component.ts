import { Component, OnInit } from "@angular/core"
import { User } from "../shared/models/user.model"

@Component({
    selector: "profile-component",
    template: `
        <section class="profile-component">
            <div class="text-center profile-info">Profile information</div>
            <ul>
                <li class="text-center">e-mail: <span class="text-right">{{user.email}}placeholder@email.com</span></li>
            </ul>
            <br>
            <div class="buttons">
                <a routerLink="/underconstruction" (click)="onChangeEmail()" class="btn btn-email">
                        <span>Change e-mail</span> 
                </a>
                <a routerLink="/underconstruction" (click)="onChangePassword()" class="btn btn-pwd">
                        <span>Change password</span> 
                </a>
                <a routerLink="/underconstruction" (click)="onDeleteAccount()" class="btn btn-pwd">
                        <span>Delete account</span> 
                </a>
            </div>
        </section>
    `
})

export class ProfileComponent implements OnInit {

    user: User

    ngOnInit(): void {
        // if not logged in (url entered manually), redirect to login
        this.user = {
            email: "asd",
            password: "asd",
            password2: "asd"
        }
    }

    onChangeEmail() {
        //
    }

    onChangePassword() {
        //
    }

    onDeleteAccount() {
        //
    }

}

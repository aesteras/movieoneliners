import { Component, OnInit } from "@angular/core"
import { AuthService } from "../services/auth.service"
import { Subscription } from "rxjs/Subscription"
import { QuotesApiService } from "../services/quotes-api.service"
import { Router } from "@angular/router"

@Component({
    selector: "info-bar-component",
    template: `
        <div class="info-bar">
            <div class="top-bar text-center">
                <a routerLink="/about" class="info-top">About</a>
                <span> - </span>
                <a href="mailto:andreu.esteras.casasola@gmail.com" class="info-top">Contact</a>
            </div>
            <div class="bottom-bar text-center">
                <span class="info-bottom">Last updated: 2017-07-09</span>
            </div>
        </div>
    `
})

export class InfoBarComponent {}

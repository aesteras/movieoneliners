import { Component, OnInit } from "@angular/core"

@Component({
    selector: "main-app",
    template: `
        <div>
            <nav-bar-component></nav-bar-component><br>
            <router-outlet></router-outlet><br><br>
            <info-bar-component></info-bar-component>
            <br>
        </div>
    `
})


export class AppComponent {}

import { Component, OnInit } from "@angular/core"

@Component({
    selector: "not-found-component",
    template: `
        <section class="not-found-component container">
            <h1 class="text-center">404 - Page not found</h1>
        </section>
    `
})

export class NotFoundComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}

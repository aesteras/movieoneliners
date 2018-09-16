import { Component } from "@angular/core"

@Component({
    selector: "under-construction-component",
    template: `
        <section class="under-construction-component text-center">
            <div class="page-title">Page under construction...</div>
            <div class="quote-character">Sorry!</div>
            <br>
            <a routerLink="/" class="btn btn-next">
                <span>Back</span> 
            </a>
        </section>
    `
})


export class UnderConstructionComponent {}

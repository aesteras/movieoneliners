import { Component } from "@angular/core"

@Component({
    selector: "about-component",
    template: `
        <section class="about-component text-center">
            <div class="about-title">About</div>
            <div class="text-left">Movie One-Liners is a practice website created by Andreu Esteras Casasola in 2017 during the MEAN Stack Web Development summer course organized by <a class="ul" href="https://www.jediupc.com">JediUPC</a> and taught by <a class="ul" href="http://www.itequia.com/en/">Itequia</a>.</div>
        </section>
    `
})

export class AboutComponent {}

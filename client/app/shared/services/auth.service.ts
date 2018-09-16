import { Injectable } from "@angular/core"
import { NgXCookies } from "ngx-cookies"
import { BehaviorSubject } from "rxjs/BehaviorSubject"
import { Observable } from "rxjs/Observable"

@Injectable()
export class AuthService {

    private isLoggedSource: BehaviorSubject<boolean>
    isLogged$: Observable<boolean>

    constructor() {
        let isLogged = this.isAuthorized()
        this.isLoggedSource = new BehaviorSubject<boolean>(isLogged)
        this.isLogged$ = this.isLoggedSource.asObservable()
    }

    isAuthorized(): boolean {
        return NgXCookies.exists("api-token")
    }

    announceIsLogged() {
        let isLogged = this.isAuthorized()
        this.isLoggedSource.next(isLogged)
    }

}

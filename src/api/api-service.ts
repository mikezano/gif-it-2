import { autoinject } from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
//import 'whatwg-fetch';
//import 'promise-polyfill';

@autoinject()
export class ApiService {

    constructor(private http: HttpClient) {
        this.http.configure(config => {
            config
                .withDefaults({
                    credentials: 'same-origin',
                    headers: {
                        'Accept': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                });
        });
    }

    public get<T>(url: string, done: (response) => T): Promise<T> {

        return this.http.fetch(url)
            .then(response => response.json())
            .then(response => { return done(response); });
    }
}
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class AbsenceService {
    private url: string = "http://localhost:8080/api/absences";

    constructor(private httpClient: HttpClient) {}

    public getAllAbsences() {
        return this.httpClient.get(this.url + "/all")
    }
}
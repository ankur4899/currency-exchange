import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  API_URL = `${environment.host}/api/currency`;

  constructor(private http: HttpClient) { }

  getCurrencyList(): Observable<any> {

    return this.http.get(this.API_URL);

  }

  updateCurrencyExchangeRates(from, to): Observable<any> {

    const body = {
      from,
      to
    }
    return this.http.put(`${this.API_URL}`, body);
  }
}

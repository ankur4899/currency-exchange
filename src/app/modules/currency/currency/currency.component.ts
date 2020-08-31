import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {

  currencyList = [];
  currencyForm: FormGroup;
  result;
  refreshedRates;
  constructor(private currencyService: CurrencyService, private snakbar: MatSnackBar) { }

  ngOnInit(): void {
    this.createForm();
    this.getCurrencyList();
  }

  getCurrencyList(): void {
    this.currencyService.getCurrencyList().subscribe((data) => {
      this.currencyList = data;
    });
  }

  createForm(): void {
    this.currencyForm = new FormGroup({
      from: new FormControl('', Validators.required),
      to: new FormControl('', Validators.required),
      amount: new FormControl('', [Validators.required])
    });
  }

  convert(): void {
    const data = this.currencyForm.value;
    const conversionRate = data.from.rates[data.to];
    this.result = conversionRate * data.amount + ' ' + data.to;
  }

  refreshRates(): void {
    const data = this.currencyForm.value;

    if (data.from !== '' && data.to !== '') {
      this.currencyService.updateCurrencyExchangeRates(data.from.code, data.to).subscribe((result) => {

        this.refreshedRates = result;
      });
    } else {
      this.snakbar.open('Please select Currency From and To', 'Alert', {
        duration: 1000
      });
    }

  }

}

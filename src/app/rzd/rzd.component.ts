import { Component, OnInit } from '@angular/core';
import {IInputData, IResults} from "../shared/interfaces";
import {Subscription} from "rxjs";
import {StoreService} from "../_services/store.service";

@Component({
  selector: 'app-rzd',
  templateUrl: './rzd.component.html',
  styleUrls: ['./rzd.component.scss']
})
export class RzdComponent implements OnInit {
  inputData!: IInputData;
  result:IResults | undefined
  allSub: Subscription | undefined
  economy = { distanceCoast: 0.5, baggageCoastPerKg: 50, childDiscount: 0.5, childAgeForDiscount: 5}
  advanced = { distanceCoast: 2, baggageCoastPerKg: 50, childDiscount: 0.7, childAgeForDiscount: 8}
  lux = { distanceCoast: 4, childDiscount: 0.8, childAgeForDiscount: 16}

  constructor(private store: StoreService) { }

  ngOnInit(): void {
    const dSub = this.store.inputData$.subscribe(value => {
      if (value) {
        this.inputData = value
        this.calcAll()
      }
    })
    this.allSub?.add(dSub)
  }

  ngOnDestroy(): void {
    if (this.allSub) {
      this.allSub.unsubscribe()
    }
  }

  calcAll() {
    this.result = {
      economy: this.calcEconomy(),
      adv: this.calcAdvanced(),
      lux: this.calcLux(),
      unavailableMsg: 'Тариф не доступен!'
    }
  }

  calcEconomy(): number {
    if (this.inputData.baggage > 50) {
      return 0
    }
    let total = this.inputData.distance * this.economy.distanceCoast

    if (this.inputData.age < this.economy.childAgeForDiscount) {
      total = total * this.economy.childDiscount
    }

    if (this.inputData.baggage > 15) {
      total += this.inputData.baggage * this.economy.baggageCoastPerKg
    }
    return total
  }

  calcAdvanced(): number {
    if (this.inputData.baggage > 60) {
      return 0
    }

    let total = this.inputData.distance * this.lux.distanceCoast

    if (this.inputData.age < this.advanced.childAgeForDiscount) {
      total = total * this.advanced.childDiscount
    }

    if (this.inputData.baggage > 20) {
      total += this.inputData.baggage * this.advanced.baggageCoastPerKg
    }
    return total
  }

  calcLux(): number {
    if (this.inputData.baggage > 60) {
      return 0
    }

    let total = this.inputData.distance * this.lux.distanceCoast

    if (this.inputData.age < this.lux.childAgeForDiscount) {
      total = total * this.lux.childDiscount
    }
    return total
  }

}

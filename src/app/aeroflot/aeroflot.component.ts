import {Component, OnDestroy, OnInit} from '@angular/core';
import {IInputData, IResults} from "../shared/interfaces";
import {Subscription} from "rxjs";
import {StoreService} from '../_services/store.service';

@Component({
  selector: 'app-aeroflot',
  templateUrl: './aeroflot.component.html',
  styleUrls: ['./aeroflot.component.scss']
})
export class AeroflotComponent implements OnInit, OnDestroy {
  inputData!: IInputData;
  result:IResults | undefined
  allSub: Subscription | undefined
  economy = { distanceCoast: 4, baggageCoast: 4000}
  advanced = { distanceCoast: 8, baggageCoast: 5000, childDiscount: 0.7, childAgeForDiscount: 7}
  lux = { distanceCoast: 15, baggageCoast: 5000, childDiscount: 0.7, childAgeForDiscount: 16}

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
    if (this.inputData.baggage > 20) {
        return 0
    }
    let total = this.inputData.distance * this.economy.distanceCoast
    if (this.inputData.baggage > 5) {
        total += this.economy.baggageCoast
    }
    return total
  }

  calcAdvanced(): number {
    if (this.inputData.baggage > 50) {
      return 0
    }

    let total = this.inputData.distance * this.lux.distanceCoast

    if (this.inputData.age < this.advanced.childAgeForDiscount) {
        total = total * this.advanced.childDiscount
    }

    if (this.inputData.baggage > 20) {
      total += this.advanced.baggageCoast
    }
    return total
  }

  calcLux(): number {
    if (this.inputData.baggage > 50) {
      return 0
    }

    let total = this.inputData.distance * this.lux.distanceCoast

    if (this.inputData.age < this.lux.childAgeForDiscount) {
      total = total * this.lux.childDiscount
    }
    return total
  }

}

import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {StoreService} from "../_services/store.service";

@Component({
  selector: 'app-input-data',
  templateUrl: './input-data.component.html',
  styleUrls: ['./input-data.component.scss']
})
export class InputDataComponent implements OnInit {
  inputForm: FormGroup = new FormGroup({
      distance: new FormControl(
        '',
        [
          Validators.required,
          Validators.pattern(/\d/),
          Validators.min(1),
          Validators.max(10000)
        ]),
      age: new FormControl(
        '',
        [
          Validators.required,
          Validators.pattern(/\d/),
          Validators.min(1),
          Validators.max(100)
        ]),
      baggage: new FormControl(
        '',
        [
          Validators.required,
          Validators.pattern(/\d/),
          Validators.min(1),
          Validators.max(60)
        ]),

    }
  )

  constructor(
    private store: StoreService,
  ) {
  }

  ngOnInit(): void {
  }

  submit() {
    if (this.inputForm.invalid) {
        return
    }
    this.store.inputData$.next(this.inputForm.value)
    this.inputForm.reset()
  }
}

import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {IInputData} from "../shared/interfaces";

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  inputData$: Subject<IInputData> = new Subject<IInputData>()

  constructor() { }
}

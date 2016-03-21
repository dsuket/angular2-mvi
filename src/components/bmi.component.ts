import {Component} from "angular2/core";
import * as Rx from 'rxjs';
import {FORM_DIRECTIVES, Control} from "angular2/common";

@Component({
  selector: 'bmi',
  styles: [require('./bmi.component.scss')],
  template:`
    <div class="bmi-calc">
      <div class="weight">
        <div class="label">Weight: </div>        
        <input id="#weight" type="range" min="40" max="140" [ngFormControl]="weightCtrl">
        {{weight$ | async}} kg
      </div>
      <div class="height">
        <div class="label">Height: </div>        
        <input id="#height" type="range" min="140" max="210" [ngFormControl]="heightCtrl">
        {{height$ | async}} cm
      </div>
      <h3>BMI is {{bmi$ | async}}</h3>
    </div>
  `,
  directives: [FORM_DIRECTIVES],
})

export class BmiComponent {

  // Models
  private weight$;
  private height$;
  private bmi$;

  // Controls
  private weightCtrl = new Control();
  private heightCtrl = new Control();

  constructor() {
    // Intents
    const weightChanges = this.weightCtrl.valueChanges;
    const heightChanges = this.heightCtrl.valueChanges;

    // Bind intents to models
    this.weight$ = weightChanges.map(Number).startWith(60);
    this.height$ = heightChanges.map(Number).startWith(170);
    this.bmi$ = this.weight$.combineLatest(this.height$).map(this.calcBmi);
  }

  calcBmi(data) {
    const [weight, height] = data;
    const heightMeters = height * 0.01;
    return Math.round(weight / (heightMeters * heightMeters));
  }

}

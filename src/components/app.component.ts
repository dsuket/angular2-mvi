import {Component} from "angular2/core";
import {BmiComponent} from "./bmi.component";

@Component({
  selector: 'my-app',
  template:`
    <h2>Angular2 MVI Sample</h2>
    <div class="components">
      <bmi></bmi>
    </div>
  `,
  directives: [BmiComponent],
})

export class AppComponent {}

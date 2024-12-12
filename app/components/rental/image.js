import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class RentalImage extends Component {
  // constructor(...args) {
  //     super(...args);
  //     this.isLarge = false;
  // }
  // isLarge = false;
  @tracked isLarge = false;
  @action toggleSize() {
    this.isLarge = !this.isLarge;
  }
}

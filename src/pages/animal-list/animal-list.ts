import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AnimalListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-animal-list',
  templateUrl: 'animal-list.html',
})

class Animal {
  img : string
  width: number
  constructor(img) {
    this.img = img;
  }
}

export class AnimalListPage {
  icons: string[];
  items: Array<{title: string, info: Animal}>;
  keys: { [index: string]: Animal } = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.items = [];
    this.items.push({
      title: 'Chimpanzee',
      info: new Animal('img/chimp.jpg'),
    });
    this.items.push({
        title: 'Giraffe',
        info: new Animal('img/giraffe.jpg'),
      });
    this.items.push({
        title: 'Grizzly Bear',
        info: new Animal('img/grizzly.jpg'),
      });
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad AnimalListPage');
  }

  itemTapped(event, item) {
    // this.navCtrl.push(ItemDetailsPage, {
    //   item: item
    // });
    console.log('Item was pushed');
  }

  swipe(event) {
    if(event.direction === 2) {
      this.navCtrl.parent.select(1);
    }
  }

}

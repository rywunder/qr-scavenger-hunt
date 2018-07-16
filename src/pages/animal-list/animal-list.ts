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
export class AnimalListPage {
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.icons = []
  	this.items = []
  	for(let i = 1; i < 11; i++) {
  	  this.icons.push('flask')
      this.items.push({
        title: 'MyItem ' + i,
        note: 'This is item #' + i,
        icon: this.icons[i]
      });
    }
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

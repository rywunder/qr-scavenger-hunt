import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

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
  items: Array<{title: string, key: string, info: AnimalInfo}>;
  animals: { [index: string]: AnimalInfo } = {}; // key-animal pairing

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private storage: Storage) {
    // Create animals objects
    this.animals['chimp'] = new AnimalInfo('img/chimp.jpg');
    this.animals['bear'] = new AnimalInfo('img/grizzly.jpg');
    this.animals['giraffe'] = new AnimalInfo('img/giraffe.jpg')
    this.animals['defualt'] = new AnimalInfo('img/defualt.png')

    this.items = [];
    this.items.push({
      title: 'Chimpanzee',
      key: 'defualt',
      info: this.animals['defualt'],

    });
    this.items.push({
        title: 'Giraffe',
        key: 'defualt',
        info: this.animals['defualt'],
      });
    this.items.push({
        title: 'Grizzly Bear',
        key: 'defualt',
        info: this.animals['defualt'],
      });
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad AnimalListPage');
  }

  itemTapped(event, item) {
    // this.navCtrl.push(ItemDetailsPage, {
    //   item: item
    // });
    console.log(item.title + " was pushed")
  }

  swipe(event) {
    if(event.direction === 2) {
      this.navCtrl.parent.select(1);
    }
  }

}

class AnimalInfo {
  img : string;
  width: number;
  constructor(img) {
    this.img = img;
  }
}
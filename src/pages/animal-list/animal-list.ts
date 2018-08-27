import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { FoundAnimalProvider } from "../../providers/found-animal/found-animal";
import { AnimalApiProvider } from "../../providers/animal-api/animal-api";

import { IAnimal } from "../../interface/IAnimal";
import { AnimalDetailPage } from "../animal-detail/animal-detail";


@IonicPage()
@Component({
  selector: 'page-animal-list',
  templateUrl: 'animal-list.html',
})

export class AnimalListPage {
  foundAnimals: IAnimal[] = [];

  // items: Array<{title: string, key: string, info: AnimalInfo}>;
  // animals: { [index: string]: AnimalInfo } = {}; // key-animal pairing

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private storage: Storage,
              private foundAnimalProvider: FoundAnimalProvider,
              private animalApiProvider: AnimalApiProvider) {
  //   // Create animals objects
  //   this.animals['chimp'] = new AnimalInfo('img/chimp.jpg');
  //   this.animals['bear'] = new AnimalInfo('img/grizzly.jpg');
  //   this.animals['giraffe'] = new AnimalInfo('img/giraffe.jpg')
  //   this.animals['defualt'] = new AnimalInfo('img/defualt.png')

  //   this.items = [];
  //   this.items.push({
  //     title: 'Chimpanzee',
  //     key: 'defualt',
  //     info: this.animals['defualt'],

  //   });
  //   this.items.push({
  //       title: 'Giraffe',
  //       key: 'defualt',
  //       info: this.animals['defualt'],
  //     });
  //   this.items.push({
  //       title: 'Grizzly Bear',
  //       key: 'defualt',
  //       info: this.animals['defualt'],
  //     });
  }
  

  // Display all animals from the JSON that we found
  ionViewDidLoad() {
    console.log('ionViewDidLoad AnimalListPage');
    this.animalApiProvider.getAnimals().subscribe(data => {
      this.foundAnimals = data;
    })
  }

  // ionViewWillEnter() {
  //   this.initFoundAnimals();
  // }

  // Initializes our found animals, the HTML will display them
  // private initFoundAnimals() {
  //   this.foundAnimalProvider
  //     .getFoundAnimals()
  //     .then(found => (this.foundAnimals = found));
  // }

  goToDetail(animal: IAnimal) {
    this.navCtrl.push(AnimalDetailPage, animal);
    console.log(animal.name + " was pushed")
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
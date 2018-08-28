import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { FoundAnimalProvider } from "../../providers/found-animal/found-animal";
import { AnimalApiProvider } from "../../providers/animal-api/animal-api";

import { IAnimal } from "../../interface/IAnimal";
import { AnimalDetailPage } from "../animal-detail/animal-detail";
import { ToastController } from "ionic-angular";


@IonicPage()
@Component({
  selector: 'page-animal-list',
  templateUrl: 'animal-list.html',
  providers: [AnimalApiProvider]
})

export class AnimalListPage {
  foundAnimals: IAnimal[] = [];
  notFoundAnimals: IAnimal[] = [];
  totalAnimals: IAnimal[]= [];
  private animalSub: any ;

  // items: Array<{title: string, key: string, info: AnimalInfo}>;
  // animals: { [index: string]: AnimalInfo } = {}; // key-animal pairing

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private storage: Storage,
              private foundAnimalProvider: FoundAnimalProvider,
              private animalApiProvider: AnimalApiProvider,
              public toastCtrl: ToastController) {
  }
  

  // Load all the animals from the api
  ionViewDidLoad() {
    console.log('ionViewDidLoad AnimalListPage');
    this.loadTotalAnimals();
  }

  ionViewWillEnter() {
    this.initFoundAnimals();
  }
  private loadTotalAnimals() {
    console.log('Load animal');
    this.animalSub = this.animalApiProvider.getAnimals().subscribe(data => {
      console.log('called')
      this.totalAnimals = data;
    })
  }
  //Initializes found animals and not found, the HTML will display them
  private initFoundAnimals() {
    this.foundAnimalProvider
      .getFoundAnimals()
      .then(found => (this.foundAnimals = found));

    var count = 0;
    // fill the notFoundAnimals array
    for (var i = 0; i < this.totalAnimals.length; i++) {
      var found = false;
      for (var j = this.foundAnimals.length - 1; j >= 0; j--) {
        if (this.totalAnimals[i].id === this.foundAnimals[j].id)
        {
          found = true;
        }
      }

      if(!found){
        this.notFoundAnimals[count] = JSON.parse(
          JSON.stringify(this.totalAnimals[i]));
        count += 1
      }
    }

    console.log("Size of notFoundAnimals " + this.notFoundAnimals.length)
    console.log("Size of foundAnimals " + this.foundAnimals.length)
    console.log("Size of totalAnimals " + this.totalAnimals.length)
    console.log(this.notFoundAnimals[0].id)
  }

  goToDetail(animal: IAnimal) {
    this.navCtrl.push(AnimalDetailPage, animal);
    console.log(animal.name + " was pushed")
  }

  presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Find the QR code to unlock the animal',
      duration: 3000
    });
    toast.present();
  }
  ionViewWillLeave(){
    if (this.animalSub)
    {
       this.animalSub.unsubscribe();
       console.log("unsubbed")
    }  
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
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FoundAnimalProvider } from "../../providers/found-animal/found-animal";
import { IAnimal } from "../../interface/IAnimal";

@IonicPage()
@Component({
  selector: 'page-animal-detail',
  templateUrl: 'animal-detail.html',
})
export class AnimalDetailPage {
  animal: IAnimal
  isFound: boolean = false;

  constructor(public navCtrl: NavController, 
  			  public navParams: NavParams,
  			  private foundAnimalProvider: FoundAnimalProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnimalDetailPage');
    this.animal = this.navParams.data;
    this.foundAnimalProvider
      .isFoundAnimal(this.animal)
      .then(value => (this.isFound = value))
  }

  toggleFound(): void {
    this.isFound = !this.isFound;
    this.foundAnimalProvider.toggleFoundAnimal(this.animal);
  }
}
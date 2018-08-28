import { Component } from '@angular/core';
import {ModalController, NavController, ToastController} from 'ionic-angular';
import {QRScanner, QRScannerStatus} from "@ionic-native/qr-scanner";
import { AnimalApiProvider } from "../../providers/animal-api/animal-api";
import { IAnimal } from "../../interface/IAnimal";
import { FoundAnimalProvider } from "../../providers/found-animal/found-animal";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ AnimalApiProvider ]
})
export class HomePage {
  totalAnimals: IAnimal[] = [];
  keyToAnimal: { [index: string]: IAnimal }  = {};
  private scanSub: any ;
  private animalSub: any ;

  constructor(public navCtrl: NavController,
              private qrScanner: QRScanner,
              private modalController: ModalController,
              private toastCtrl: ToastController,
              private animalApiProvider: AnimalApiProvider,
              private foundAnimalProvider: FoundAnimalProvider) {

  }

  swipe(event) {
    if(event.direction === 2) {
      this.navCtrl.parent.select(2);
    }
    if(event.direction === 4) {
      this.navCtrl.parent.select(0);
    }
  }

  // Load all the animals from the api
  // Load all keys to pair to the animals
  ionViewDidLoad() {
    console.log('ionViewDidLoad HOME');
    this.loadTotalAnimals();
  }

  private loadTotalAnimals() {
    console.log('Load animal');
    this.animalSub = this.animalApiProvider.getAnimals().subscribe(data => {
      console.log('called')
      this.totalAnimals = data;
      console.log(this.totalAnimals)
      this.loadKeys();
    })
  }

  private loadKeys(){
    for (var i = this.totalAnimals.length - 1; i >= 0; i--) {
      this.keyToAnimal[this.totalAnimals[i].id.toString()] = this.totalAnimals[i];
    }
    console.log("Keys:")
    console.log(Object.keys(this.keyToAnimal))

  }

  ionViewWillEnter(){
    // this.loadTotalAnimals();
    this.showCamera();
    // Optionally request the permission early
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted
          console.log('Camera Permission Given');

          // start scanning
           this.scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);
           // The scan must be a key to some animal type.
            this.presentToast(text);
            if(this.keyToAnimal[text])
            {
               this.foundAnimalProvider.toggleFoundAnimal(this.keyToAnimal[text]);
               this.presentToast("Key is valid");
            }
            else
            {
              this.presentToast("Sorry, key is invalid!");
            }
          });

          // show camera preview
          this.qrScanner.show();

          // wait for user to scan something, then the observable callback will be called

        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
          console.log('Camera permission denied');
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
          console.log('Permission denied for this runtime.');
        }
      })
      .catch((e: any) => console.log('Error is', e));
  }


  scanOnclick() {
    let modal = this.modalController.create('ScanQrPage', {showBackdrop: false});
    modal.present();
  }


  presentToast(text:string) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  ionViewWillLeave(){
    this.qrScanner.hide(); // hide camera preview
    if (this.scanSub)
    {
       this.scanSub.unsubscribe(); // stop scanning
    }  
    if (this.animalSub)
    {
       this.animalSub.unsubscribe(); // stop scanning
    }  
    this.hideCamera();
  }

  showCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
  }

  hideCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
  }

}

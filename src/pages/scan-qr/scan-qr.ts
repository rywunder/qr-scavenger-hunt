import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {QRScanner, QRScannerStatus} from "@ionic-native/qr-scanner";
import {Subscriber} from "rxjs/Subscriber";
import { Storage } from '@ionic/storage';
import { AnimalApiProvider } from "../../providers/animal-api/animal-api";
import { IAnimal } from "../../interface/IAnimal";
import { FoundAnimalProvider } from "../../providers/found-animal/found-animal";

/**
 * Scan QR codes and store the animal that is found
 *
 */

@IonicPage()
@Component({
  selector: 'page-scan-qr',
  templateUrl: 'scan-qr.html',
})
export class ScanQrPage {
  private isBackMode: boolean = true;
  private isFlashLightOn: boolean = false;
  private scanSub: any;
  totalAnimals: IAnimal[]= [];
  keyToAnimal: { [index: string]: IAnimal }  = {};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewController: ViewController,
              public qrScanner: QRScanner,
              public toastCtrl: ToastController,
              private storage: Storage,
              private animalApiProvider: AnimalApiProvider,
              private foundAnimalProvider: FoundAnimalProvider) {
  }

  // Load all the animals from the api
  // Load all keys to pair to the animals
  ionViewDidLoad() {
    console.log('ionViewDidLoad ScanQR');
    this.animalApiProvider.getAnimals().subscribe(data => {
      this.totalAnimals = data;
    })

    for (var i = this.totalAnimals.length - 1; i >= 0; i--) {
      this.keyToAnimal[this.totalAnimals[i].id.toString()] = this.totalAnimals[i];
    }
    console.log(this.totalAnimals)
    console.log(Object.keys(this.keyToAnimal))
  }

  ionViewWillEnter(){
    this.showCamera();
    // Optionally request the permission early
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted
          console.log('Camera Permission Given');

          // start scanning
          this.scanSub = this.qrScanner.scan().subscribe((text: string) => {
            // The scan must be a key to some animal type.
            this.presentToast(text);
            if(this.keyToAnimal[text])
            {
               this.foundAnimalProvider.toggleFoundAnimal(this.keyToAnimal[text]);
               this.presentToast("You have found the " + this.keyToAnimal[text].name);
            }
            else
            {
              this.presentToast("Sorry, code is invalid!");
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

  closeModal() {
    this.viewController.dismiss();
  }


  toggleFlashLight(){

    /** Default isFlashLightOn is false ,
     * enable it if false **/

    this.isFlashLightOn = !this.isFlashLightOn;
    if(this.isFlashLightOn){
      this.qrScanner.enableLight();
    }
    else{
      this.qrScanner.disableLight();
    }

  }
  toggleCamera(){
    /** Toggle Camera , Default is isBackMode is true , toggle
     * to false to enable front camera and vice versa.
     *
     * @type {boolean}
     */
    this.isBackMode =  !this.isBackMode;
    if(this.isBackMode){
      this.qrScanner.useFrontCamera();
    }
    else{
      this.qrScanner.useBackCamera();
    }
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
    this.scanSub.unsubscribe(); // stop scanning
    this.hideCamera();
  }
  showCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
  }

  hideCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
  }
}

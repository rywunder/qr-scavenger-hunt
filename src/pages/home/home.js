var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { ModalController, NavController, ToastController } from 'ionic-angular';
import { QRScanner } from "@ionic-native/qr-scanner";
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, qrScanner, modalController, toastCtrl) {
        this.navCtrl = navCtrl;
        this.qrScanner = qrScanner;
        this.modalController = modalController;
        this.toastCtrl = toastCtrl;
    }
    HomePage.prototype.swipe = function (event) {
        if (event.direction === 2) {
            this.navCtrl.parent.select(2);
        }
        if (event.direction === 4) {
            this.navCtrl.parent.select(0);
        }
    };
    HomePage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.showCamera();
        // Optionally request the permission early
        this.qrScanner.prepare()
            .then(function (status) {
            if (status.authorized) {
                // camera permission was granted
                console.log('Camera Permission Given');
                // start scanning
                _this.scanSub = _this.qrScanner.scan().subscribe(function (text) {
                    console.log('Scanned something', text);
                    // this.qrScanner.hide(); // hide camera preview
                    // scanSub.unsubscribe(); // stop scanning
                    _this.presentToast(text);
                });
                // show camera preview
                _this.qrScanner.show();
                // wait for user to scan something, then the observable callback will be called
            }
            else if (status.denied) {
                // camera permission was permanently denied
                // you must use QRScanner.openSettings() method to guide the user to the settings page
                // then they can grant the permission from there
                console.log('Camera permission denied');
            }
            else {
                // permission was denied, but not permanently. You can ask for permission again at a later time.
                console.log('Permission denied for this runtime.');
            }
        })
            .catch(function (e) { return console.log('Error is', e); });
    };
    HomePage.prototype.scanOnclick = function () {
        var modal = this.modalController.create('ScanQrPage', { showBackdrop: false });
        modal.present();
    };
    HomePage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    HomePage.prototype.ionViewWillLeave = function () {
        this.qrScanner.hide(); // hide camera preview
        if (this.scanSub) {
            this.scanSub.unsubscribe(); // stop scanning
        }
        this.hideCamera();
    };
    HomePage.prototype.showCamera = function () {
        window.document.querySelector('ion-app').classList.add('cameraView');
    };
    HomePage.prototype.hideCamera = function () {
        window.document.querySelector('ion-app').classList.remove('cameraView');
    };
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        }),
        __metadata("design:paramtypes", [NavController,
            QRScanner,
            ModalController,
            ToastController])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map
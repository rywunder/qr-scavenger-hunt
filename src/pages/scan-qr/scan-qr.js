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
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { QRScanner } from "@ionic-native/qr-scanner";
import { Storage } from '@ionic/storage';
/**
 * Generated class for the ScanQrPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ScanQrPage = /** @class */ (function () {
    function ScanQrPage(navCtrl, navParams, viewController, qrScanner, toastCtrl, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewController = viewController;
        this.qrScanner = qrScanner;
        this.toastCtrl = toastCtrl;
        this.storage = storage;
        this.isBackMode = true;
        this.isFlashLightOn = false;
    }
    ScanQrPage.prototype.ionViewWillEnter = function () {
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
    ScanQrPage.prototype.closeModal = function () {
        this.viewController.dismiss();
    };
    ScanQrPage.prototype.toggleFlashLight = function () {
        /** Default isFlashLightOn is false ,
         * enable it if false **/
        this.isFlashLightOn = !this.isFlashLightOn;
        if (this.isFlashLightOn) {
            this.qrScanner.enableLight();
        }
        else {
            this.qrScanner.disableLight();
        }
    };
    ScanQrPage.prototype.toggleCamera = function () {
        /** Toggle Camera , Default is isBackMode is true , toggle
         * to false to enable front camera and vice versa.
         *
         * @type {boolean}
         */
        this.isBackMode = !this.isBackMode;
        if (this.isBackMode) {
            this.qrScanner.useFrontCamera();
        }
        else {
            this.qrScanner.useBackCamera();
        }
    };
    ScanQrPage.prototype.presentToast = function (text) {
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
    ScanQrPage.prototype.ionViewWillLeave = function () {
        this.qrScanner.hide(); // hide camera preview
        this.scanSub.unsubscribe(); // stop scanning
        this.hideCamera();
    };
    ScanQrPage.prototype.showCamera = function () {
        window.document.querySelector('ion-app').classList.add('cameraView');
    };
    ScanQrPage.prototype.hideCamera = function () {
        window.document.querySelector('ion-app').classList.remove('cameraView');
    };
    ScanQrPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-scan-qr',
            templateUrl: 'scan-qr.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            ViewController,
            QRScanner,
            ToastController,
            Storage])
    ], ScanQrPage);
    return ScanQrPage;
}());
export { ScanQrPage };
//# sourceMappingURL=scan-qr.js.map
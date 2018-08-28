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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FoundAnimalProvider } from "../../providers/found-animal/found-animal";
import { AnimalApiProvider } from "../../providers/animal-api/animal-api";
import { AnimalDetailPage } from "../animal-detail/animal-detail";
import { ToastController } from "ionic-angular";
var AnimalListPage = /** @class */ (function () {
    // items: Array<{title: string, key: string, info: AnimalInfo}>;
    // animals: { [index: string]: AnimalInfo } = {}; // key-animal pairing
    function AnimalListPage(navCtrl, navParams, storage, foundAnimalProvider, animalApiProvider, toastCtrl) {
        //   // Create animals objects
        //   this.animals['chimp'] = new AnimalInfo('img/chimp.jpg');
        //   this.animals['bear'] = new AnimalInfo('img/grizzly.jpg');
        //   this.animals['giraffe'] = new AnimalInfo('img/giraffe.jpg')
        //   this.animals['defualt'] = new AnimalInfo('img/defualt.png')
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.foundAnimalProvider = foundAnimalProvider;
        this.animalApiProvider = animalApiProvider;
        this.toastCtrl = toastCtrl;
        this.foundAnimals = [];
        this.notFoundAnimals = [];
        // Could replace these with a list of indices or of pointers
        this.totalAnimals = [];
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
    // Load all the animals from the api
    AnimalListPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad AnimalListPage');
        this.animalApiProvider.getAnimals().subscribe(function (data) {
            _this.totalAnimals = data;
        });
    };
    AnimalListPage.prototype.ionViewWillEnter = function () {
        this.initFoundAnimals();
    };
    // Helper function for comparing equality on IAnimals
    AnimalListPage.prototype.helper_search = function (array1, value) {
        for (var i = array1.length - 1; i >= 0; i--) {
            if (array1[i].id == value.id) {
                return true;
            }
        }
        return false;
    };
    //Initializes found animals and not found, the HTML will display them
    AnimalListPage.prototype.initFoundAnimals = function () {
        var _this = this;
        this.foundAnimalProvider
            .getFoundAnimals()
            .then(function (found) { return (_this.foundAnimals = found); });
        var count = 0;
        // fill the notFoundAnimals array
        for (var i = this.totalAnimals.length - 1; i >= 0; i--) {
            var found = false;
            for (var j = this.foundAnimals.length - 1; j >= 0; j--) {
                if (this.totalAnimals[i].id === this.foundAnimals[j].id) {
                    found = true;
                }
            }
            if (!found) {
                Object.assign(this.notFoundAnimals[count], this.totalAnimals[j]);
                count += 1;
            }
        }
        console.log("Test true:" + this.helper_search(this.totalAnimals, 0));
        console.log("Size of notFoundAnimals " + this.notFoundAnimals.length);
        console.log("Size of foundAnimals " + this.foundAnimals.length);
        console.log("Size of totalAnimals " + this.totalAnimals.length);
        console.log(this.notFoundAnimals[0].id);
    };
    AnimalListPage.prototype.goToDetail = function (animal) {
        this.navCtrl.push(AnimalDetailPage, animal);
        console.log(animal.name + " was pushed");
    };
    AnimalListPage.prototype.presentToast = function () {
        var toast = this.toastCtrl.create({
            message: 'Find the QR code to unlock the animal',
            duration: 3000
        });
        toast.present();
    };
    AnimalListPage.prototype.swipe = function (event) {
        if (event.direction === 2) {
            this.navCtrl.parent.select(1);
        }
    };
    AnimalListPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-animal-list',
            templateUrl: 'animal-list.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            Storage,
            FoundAnimalProvider,
            AnimalApiProvider,
            ToastController])
    ], AnimalListPage);
    return AnimalListPage;
}());
export { AnimalListPage };
var AnimalInfo = /** @class */ (function () {
    function AnimalInfo(img) {
        this.img = img;
    }
    return AnimalInfo;
}());
//# sourceMappingURL=animal-list.js.map
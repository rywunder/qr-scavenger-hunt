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
import { FoundAnimalProvider } from "../../providers/found-animal/found-movie";
var AnimalListPage = /** @class */ (function () {
    // items: Array<{title: string, key: string, info: AnimalInfo}>;
    // animals: { [index: string]: AnimalInfo } = {}; // key-animal pairing
    function AnimalListPage(navCtrl, navParams, storage, foundAnimalProvider) {
        //   // Create animals objects
        //   this.animals['chimp'] = new AnimalInfo('img/chimp.jpg');
        //   this.animals['bear'] = new AnimalInfo('img/grizzly.jpg');
        //   this.animals['giraffe'] = new AnimalInfo('img/giraffe.jpg')
        //   this.animals['defualt'] = new AnimalInfo('img/defualt.png')
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.foundAnimalProvider = foundAnimalProvider;
        this.foundAnimals = [];
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
    AnimalListPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AnimalListPage');
    };
    AnimalListPage.prototype.ionViewWillEnter = function () {
        this.initFoundAnimals();
    };
    AnimalListPage.prototype.initFoundAnimals = function () {
        var _this = this;
        this.foundAnimalProvider
            .getFoundAnimals()
            .then(function (found) { return (_this.foundAnimals = found); });
    };
    AnimalListPage.prototype.goToDetail = function (animal) {
        this.navCtrl.push(AnimalDetailPage, movie);
        console.log(item.title + " was pushed");
    };
    AnimalListPage.prototype.swipe = function (event) {
        if (event.direction === 2) {
            this.navCtrl.parent.select(1);
        }
    };
    var _a;
    AnimalListPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-animal-list',
            templateUrl: 'animal-list.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            Storage, typeof (_a = typeof FoundAnimalProvider !== "undefined" && FoundAnimalProvider) === "function" ? _a : Object])
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
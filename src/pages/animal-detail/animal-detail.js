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
import { FoundAnimalProvider } from "../../providers/found-animal/found-animal";
var AnimalDetailPage = /** @class */ (function () {
    function AnimalDetailPage(navCtrl, navParams, foundAnimalProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.foundAnimalProvider = foundAnimalProvider;
        this.isFound = false;
    }
    AnimalDetailPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad AnimalDetailPage');
        this.animal = this.navParams.data;
        this.foundAnimalProvider
            .isFoundAnimal(this.animal)
            .then(function (value) { return (_this.isFound = value); });
    };
    AnimalDetailPage.prototype.toggleFound = function () {
        this.isFound = !this.isFound;
        this.foundAnimalProvider.toggleFoundAnimal(this.animal);
    };
    AnimalDetailPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-animal-detail',
            templateUrl: 'animal-detail.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            FoundAnimalProvider])
    ], AnimalDetailPage);
    return AnimalDetailPage;
}());
export { AnimalDetailPage };
//# sourceMappingURL=animal-detail.js.map
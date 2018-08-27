var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
var ANIMAL_KEY = "animal_";
var FoundAnimalProvider = /** @class */ (function () {
    function FoundAnimalProvider(storage) {
        this.storage = storage;
        console.log("Hello CapturedAnimalProvider Provider");
    }
    FoundAnimalProvider.prototype.addFoundAnimal = function (animal) {
        this.storage.set(this.getAnimalKey(animal), JSON.stringify(animal));
    };
    FoundAnimalProvider.prototype.removeFoundAnimal = function (animal) {
        this.storage.remove(this.getAnimalKey(animal));
    };
    FoundAnimalProvider.prototype.isFoundAnimal = function (animal) {
        return this.storage.get(this.getAnimalKey(animal));
    };
    FoundAnimalProvider.prototype.toggleFoundAnimal = function (animal) {
        var _this = this;
        this.isFoundAnimal(animal).then(function (isFound) {
            return isFound
                ? _this.removeFoundAnimal(animal)
                : _this.addFoundAnimal(animal);
        });
    };
    FoundAnimalProvider.prototype.getAnimalKey = function (animal) {
        return ANIMAL_KEY + animal.id.toString();
    };
    FoundAnimalProvider.prototype.getFoundAnimals = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var results = [];
            _this.storage
                .keys()
                .then(function (keys) {
                return keys
                    .filter(function (key) { return key.includes(ANIMAL_KEY); })
                    .forEach(function (key) {
                    return _this.storage.get(key).then(function (data) { return results.push(JSON.parse(data)); });
                });
            });
            return resolve(results);
        });
    };
    FoundAnimalProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Storage])
    ], FoundAnimalProvider);
    return FoundAnimalProvider;
}());
export { FoundAnimalProvider };
//# sourceMappingURL=found-animal.js.map
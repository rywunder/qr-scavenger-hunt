import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { IAnimal } from "../../interface/IAnimal";
 
const ANIMAL_KEY = "animal_";
 
@Injectable()
export class FoundAnimalProvider {
  constructor(private storage: Storage) {
    console.log("Hello CapturedAnimalProvider Provider");
  }
 
  addFoundAnimal(animal: IAnimal) {
    this.storage.set(this.getAnimalKey(animal), JSON.stringify(animal));
  }
 
  removeFoundAnimal(animal: IAnimal) {
    this.storage.remove(this.getAnimalKey(animal));
  }
 
  isFoundAnimal(animal: IAnimal) {
    return this.storage.get(this.getAnimalKey(animal));
  }
 
  toggleFoundAnimal(animal: IAnimal) {
    this.isFoundAnimal(animal).then(
      isFound =>
        isFound
          ? this.removeFoundAnimal(animal)
          : this.addFoundAnimal(animal)
    );
  }
 
  getAnimalKey(animal: IAnimal) {
    return ANIMAL_KEY + animal.id.toString();
  }
 
  getFoundAnimals(): Promise<IAnimal[]> {
    return new Promise(resolve => {
      let results: IAnimal[] = [];
      this.storage
        .keys()
        .then(keys =>
          keys
            .filter(key => key.includes(ANIMAL_KEY))
            .forEach(key =>
              this.storage.get(key).then(data => results.push(JSON.parse(data)))
            )
        );
      return resolve(results);
    });
  }
}
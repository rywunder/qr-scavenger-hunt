import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Platform } from "ionic-angular";
import { Observable } from "rxjs/Rx";
import { IAnimal } from "../../interface/IAnimal";
 
@Injectable()
export class AnimalApiProvider {
  private baseUrl: string = "../../assets/api/animals.json";
 
  movies: IAnimal[];
 
    constructor(
    private readonly http: HttpClient,
    private readonly platform: Platform
  ) {
    console.log("Hello AnimalApiProvider Provider");
    if (this.platform.is("cordova") && this.platform.is("android")) {
      this.baseUrl = "/android_asset/www/assets/api/animals.json";
    }
  }
 
  getAnimals(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
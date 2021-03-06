# qr-scavenger-hunt
Ionic mobile app for custom scavenger hunts

## Motivation
I came up with this idea as I was walking in the San Diego zoo. I love the zoo, but I found myself wishing I could learn more  about each animal at the exhibits without having to google it myself. I thought that having a QR code on each exhibit could be a way to add more information while keeping the zoo fun!  You can walk around a zoo with the app and "collect" all the animals by scanning their QR codes. It's like a real life pokedex.

## Future plans for project
Right now the JSON file containing all the information for animals is stored locally. The next step will be to get animal data from a service like the [Encyclopedia of Life](http://eol.org/api). That way users can create animal collections for each zoo. 

## Using the project
After cloning the project, plug in your smartphone with a usb to your computer. Make sure the phone has developer mode enabled. Then use the command below to run on your physical device
```
ionic cordova run android
```
Next scan the QR code below to see it in action. The QR codes must match the ids in `src/assets/api/animals.json`

<img src="https://github.com/rywunder/qr-scavenger-hunt/blob/master/docs/images/qr-monkey.png" hspace="20" width="200" align="middle">


## Screenshots
<div class="row">
  <div class="column">
    <img src="https://github.com/rywunder/qr-scavenger-hunt/blob/master/docs/images/animalList.png" hspace="20" width="200">
  </div>
  <div class="column">
    <img src="https://github.com/rywunder/qr-scavenger-hunt/blob/master/docs/images/animalDetail.png" hspace="20" width="200">
  </div>
  <div class="column">
    <img src="https://github.com/rywunder/qr-scavenger-hunt/blob/master/docs/images/aboutScreen.png" hspace="20" width="200">
  </div>
</div>

## Built With

* [Ionic3](https://ionicframework.com/docs/) - The web framework used
* [Cordova](https://cordova.apache.org/) - Integration with mobile

## Authors

* **Ryan Wunderly** - *Initial work* - [rywunder](https://github.com/rywunder)

## Acknowledgments

* I learned how to develop in Ionic thanks to the wonderful blog post [HERE](http://blog.soat.fr/2017/12/ionic-3-creez-votre-application-mobile/)
* Shoutout to QR scanner post [HERE](https://medium.com/@piashsarker/native-qr-scanner-implementation-in-ionic-6e1ef01335ea)

import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  
  constructor() {}
  public loadingController: LoadingController

  
  TEST_PM_URL = 'http://192.168.0.89:55165'
  POST_URL = 'http://192.168.43.118:80/input'
  IMG_URL_LOCAL = 'http://192.168.0.3:5940/results/frame.png'
  NEW_PHOTO_URL_LOCAL = 'http://192.168.0.3:11111/input?not=SIB'

  IMG_URL = 'http://5.53.145.215:5940/results/frame.png'
  NEW_PHOTO_URL = 'http://5.53.145.215:11111/input?not=SIB'
  
  startAlarm = true;
  alarmText = "Start Alarm"
  alarmColor = "danger"
  showLoading = false;
  newPhotoColor = "primary"
  newPhoto = true

  newPhotoBtn(){
    this.newPhoto = !this.newPhoto;
    if(this.newPhoto){
      this.newPhotoColor = 'primary'
    }
    else{
      this.newPhotoColor = 'secondary'
    }
    this.getNewPhoto();
  }

  getNewPhoto() {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
      console.log(xhr.responseText);
    });
    xhr.open('GET', this.NEW_PHOTO_URL);
    xhr.send();
    setTimeout(function() {
      location.reload();
    }, 5000);
  }
  
  alarmButtonClick(){
    console.log("alarm button clicked");
    this.startAlarm = !this.startAlarm;
    if(this.startAlarm){
      this.alarmText = "Start Alarm";
      this.alarmColor = "danger";
      this.postAlarmOff();
    }
    else{
      this.alarmText = "Stop Alarm";
      this.alarmColor = "medium";
      this.postAlarmOn();
    }
  }

  onImgError(){
    console.log("Img error. not loading");
    setTimeout(function() {
      location.reload();
    }, 5000);
  }

  postAlarmOn(){
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
      console.log(xhr.responseText);
    });
    xhr.open('GET', this.POST_URL + '?command=alarmOn');
    xhr.send();
  }

  postAlarmOff(){
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
      console.log(xhr.responseText);
    });
    xhr.open('GET', this.POST_URL + '?command=alarmOff');
    xhr.send();
  }

  postDoorUnlock(){
    this.postAlarmOff();
    this.alarmColor = "danger";
    this.alarmText = "Start Alarm";
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
      console.log(xhr.responseText);
    });
    xhr.open('GET', this.POST_URL + '?command=unlock');
    xhr.send();
  }

}

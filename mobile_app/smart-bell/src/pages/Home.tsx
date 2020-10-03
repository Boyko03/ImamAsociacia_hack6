import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonImg, IonCard, IonCardContent, IonCardHeader, IonIcon, IonList, IonItem, IonToggle, IonLabel, IonLoading, IonRefresher, IonRefresherContent } from '@ionic/react';
import React, { useState } from 'react';
import './Home.css';
import { FCM } from '../components/FCM'


const Home: React.FC = () => {
  const fcm = new FCM('io.ionic.starter');
  // const TEST_PM_URL = 'http://192.168.0.89:50728'
  const POST_URL = 'https://cors-anywhere.herokuapp.com/http://192.168.0.58:80'
  const IMG_URL = 'http://192.168.0.3:5940/results/frame.png'
  // const LOCAL_IMG_URL = 'http://192.168.0.3:5940/results/frame.png'


  const [startAlarm, setStartAlarm] = useState<boolean>(false);
  const [alarmText, setAlarmText] = useState<string>("Start alarm");
  const [alarmColor, setAlarmColor] = useState<string>("danger");
  const [showLoading, setShowLoading] = useState<boolean>(false);
  
  function postAlarmOn(){
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
      console.log(xhr.responseText);
    });
    xhr.open('GET', POST_URL + '?command=alarmOn');
    xhr.send();
  }

  function postAlarmOff(){
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
      console.log(xhr.responseText);
    });
    xhr.open('GET', POST_URL + '?command=alarmOff');
    xhr.send();
  }

  function postDoorUnlock(){
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
      console.log(xhr.responseText);
    });
    xhr.open('GET', POST_URL + '?command=doorUnlock');
    xhr.send();
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Smart Bell</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Smart Bell</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
          <IonCardHeader>
            <IonImg src={IMG_URL}></IonImg>
          </IonCardHeader>
          <IonCardContent>
            <IonButton expand="block" onClick={() => {
              setShowLoading(true);
              //window.location.reload();
            }}>Send photo again</IonButton>
            <IonLoading
              cssClass='my-custom-class'
              isOpen={showLoading}
              onDidDismiss={() => setShowLoading(false)}
              message={'Please wait...'}
              duration={5000}
            />
            <IonButton expand="block" color={alarmColor} onClick={() => {
              setStartAlarm(!startAlarm);
              if(startAlarm){
                setAlarmText("Start Alarm");
                setAlarmColor("danger");
                postAlarmOff();
              }
              else{
                setAlarmText("Stop Alarm");
                setAlarmColor("medium");
                postAlarmOn();
              }
              }}>
              {alarmText}
            </IonButton>
            <IonButton expand="block" color="warning" onClick={postDoorUnlock}>
              Unlock door
            </IonButton>
          </IonCardContent>
        </IonCard>
        <IonButton onClick={() => fcm.push()}>FCM Push</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;

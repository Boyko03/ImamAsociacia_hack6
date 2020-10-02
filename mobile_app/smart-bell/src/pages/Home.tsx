import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonImg, IonCard, IonCardContent, IonCardHeader, IonIcon, IonList, IonItem, IonToggle, IonLabel } from '@ionic/react';
import React, { constructor, useState } from 'react';
import './Home.css';


const Home: React.FC = () => {
  const [startAlarm, setStartAlarm] = useState<boolean>(true);
  const [alarmText, setAlarmText] = useState<string>("Start alarm");

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
            <IonImg src="http://aif.guide.bg/images/bg.jpg"></IonImg>
          </IonCardHeader>
          <IonCardContent>
            <IonButton expand="block">Send photo again</IonButton>
            <IonButton expand="block" color="danger" onClick={() => {
              setStartAlarm(!startAlarm);
              if(startAlarm){
                setAlarmText("Start Alarm");
              }
              else{
                setAlarmText("Stop Alarm");
              }
              }}>
              {alarmText}
            </IonButton>
            <IonButton expand="block" color="warning">
              Open door
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;

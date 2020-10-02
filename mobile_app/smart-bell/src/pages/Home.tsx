import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonImg, IonCard, IonCardContent, IonCardHeader, IonIcon, IonList, IonItem, IonToggle, IonLabel } from '@ionic/react';
import React, { constructor, useState } from 'react';
import './Home.css';


const Home: React.FC = () => {
  const [startAlarm, setStartAlarm] = useState<boolean>(false);
  const [alarmText, setAlarmText] = useState<string>("Start alarm");
  const [alarmColor, setAlarmColor] = useState<string>("danger");

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
            <IonImg src="https://static-cdn.jtvnw.net/jtv_user_pictures/asmongold-profile_image-f7ddcbd0332f5d28-300x300.png"></IonImg>
          </IonCardHeader>
          <IonCardContent>
            <IonButton expand="block">Send photo again</IonButton>
            <IonButton expand="block" color={alarmColor} onClick={() => {
              setStartAlarm(!startAlarm);
              if(startAlarm){
                setAlarmText("Start Alarm");
                setAlarmColor("danger");
              }
              else{
                setAlarmText("Stop Alarm");
                setAlarmColor("medium");
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

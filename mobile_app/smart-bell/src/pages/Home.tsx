import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonImg, IonCard, IonCardContent, IonCardHeader, IonIcon, IonList, IonItem, IonToggle, IonLabel, IonLoading } from '@ionic/react';
import React, { constructor, useState } from 'react';
import './Home.css';


const Home: React.FC = () => {
  const [startAlarm, setStartAlarm] = useState<boolean>(false);
  const [alarmText, setAlarmText] = useState<string>("Start alarm");
  const [alarmColor, setAlarmColor] = useState<string>("danger");
  const [showLoading, setShowLoading] = useState<boolean>(false);

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
            <IonImg src="http://5.53.145.215:5940/frame.png"></IonImg>
          </IonCardHeader>
          <IonCardContent>
            <IonButton expand="block" onClick={() => setShowLoading(true)}>Send photo again</IonButton>
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
              }
              else{
                setAlarmText("Stop Alarm");
                setAlarmColor("medium");
              }
              }}>
              {alarmText}
            </IonButton>
            <IonButton expand="block" color="warning">
              Unlock door
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;

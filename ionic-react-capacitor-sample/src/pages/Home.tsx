import React from 'react';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { addOutline } from 'ionicons/icons';
import './Home.scss';

const Home: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>主页</IonTitle>
                    <IonButtons slot="end">
                        <IonButton href="/edit">
                            <IonIcon icon={addOutline} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>Home - 4</IonContent>
        </IonPage>
    );
};

export default Home;

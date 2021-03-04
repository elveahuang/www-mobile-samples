import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Me.scss';

const Me: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Me</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>About</IonContent>
        </IonPage>
    );
};

export default Me;

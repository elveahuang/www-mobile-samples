import React from 'react';
import { IonCol, IonContent, IonGrid, IonHeader, IonInput, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import './Edit.scss';

const Edit: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>主页</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <table className="edit-table">
                    <thead>
                        <tr>
                            <th>样品名</th>
                            <th>配比</th>
                            <th>蛋白</th>
                            <th>灰份</th>
                            <th>新鲜度</th>
                            <th>水分</th>
                            <th>脂肪</th>
                            <th>价格</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <IonInput />
                            </td>
                            <td>
                                <IonInput />
                            </td>
                            <td>
                                <IonInput />
                            </td>
                            <td>
                                <IonInput />
                            </td>
                            <td>
                                <IonInput />
                            </td>
                            <td>
                                <IonInput />
                            </td>
                            <td>
                                <IonInput />
                            </td>
                            <td>
                                <IonInput />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <IonGrid>
                    <IonRow>
                        <IonCol>样品名</IonCol>
                        <IonCol>配比</IonCol>
                        <IonCol>蛋白</IonCol>
                        <IonCol>灰份</IonCol>
                        <IonCol>新鲜度</IonCol>
                        <IonCol>水分</IonCol>
                        <IonCol>脂肪</IonCol>
                        <IonCol>价格</IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonInput />
                        </IonCol>
                        <IonCol>
                            <IonInput />
                        </IonCol>
                        <IonCol>
                            <IonInput />
                        </IonCol>
                        <IonCol>
                            <IonInput />
                        </IonCol>
                        <IonCol>
                            <IonInput />
                        </IonCol>
                        <IonCol>
                            <IonInput />
                        </IonCol>
                        <IonCol>
                            <IonInput />
                        </IonCol>
                        <IonCol>
                            <IonInput />
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Edit;

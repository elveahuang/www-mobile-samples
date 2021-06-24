import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPage } from './main.page';

const routes: Routes = [
    {
        path: 'main',
        component: MainPage,
        children: [
            {
                path: 'home',
                loadChildren: () => import('../home/home.module').then((m) => m.HomePageModule),
            },
            {
                path: 'me',
                loadChildren: () => import('../me/me.module').then((m) => m.MePageModule),
            },
            {
                path: '',
                redirectTo: '/main/home',
                pathMatch: 'full',
            },
        ],
    },
    {
        path: '',
        redirectTo: '/main',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
})
export class MainPageRoutingModule {}

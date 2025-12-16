import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Menu } from './menu/menu';
import { AboutUs } from './about-us/about-us';
import { NotFound } from './not-found/not-found';
import { Authentication } from './authentication/authentication';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'register',
        component: Authentication
    },
    {
        path: 'home',
        component: Home
    },
    {
        path: 'product',
        component: Menu
    },
    {
        path: 'about-us',
        component: AboutUs
    },
    {
        path: '**',
        component: NotFound
    },
];

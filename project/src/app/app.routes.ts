import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Menu } from './menu/menu';
import { AboutUs } from './about-us/about-us';
import { NotFound } from './not-found/not-found';
import { Authentication } from './authentication/authentication';
import { Cart } from './cart/cart';
import { AreYouSure } from './are-you-sure/are-you-sure';
export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'authentication',
        component: Authentication
    },
    {
        path: 'home',
        component: Home
    },
    {
        path: 'menu',
        component: Menu
    },
    {
        path: 'about-us',
        component: AboutUs
    },
    {
        path: 'cart',
        component: Cart
    },
    {
        path: 'are-you-sure',
        component: AreYouSure
    },
    {
        path: 'notfound',
        component: NotFound
    },
];

import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',loadComponent:()=>import('./shared/layout/main/main').then(m=>m.Main),
        children:[
            {
                path:'',loadComponent:()=>import('./features/dashboard/overview/overview').then(m=>m.Overview)
            },
            {
                path:'recipes',loadComponent:()=>import('./features/dashboard/recipes/recipes').then(m=>m.Recipes)
            },
            {
                path:'favourites',loadComponent:()=>import('./features/dashboard/favourites/favourites').then(m=>m.Favourites)
            },
            {
                path:'profile',loadComponent:()=>import('./features/dashboard/profile/profile').then(m=>m.Profile)
            },
            {
                path:'dashboard',loadComponent:()=>import('./features/dashboard/overview/overview').then(m=>m.Overview)
            }
        ]
    }
];

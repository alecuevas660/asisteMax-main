import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { ListPageModule } from './paginas/list/list.module';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/home']);
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./paginas/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'cursos',
    loadChildren: () => import('./paginas/cursos/cursos.module').then( m => m.CursosPageModule), canActivate:[AuthGuard]
  },
  {
    path: 'ingreso',
    loadChildren: () => import('./paginas/ingreso/auth.module').then( m => m.AuthPageModule)

  },
  {
    path: 'list',
    loadChildren: () => import('./paginas/list/list.module').then( m => m.ListPageModule), canActivate:[AuthGuard]
  },
  {
    path: 'menu',
    loadChildren: () => import('./paginas/menu/menu.module').then( m => m.MenuPageModule), canActivate:[AuthGuard]
  },
  {
    path: 'perfil',
    loadChildren: () => import('./paginas/perfil/perfil.module').then( m => m.PerfilPageModule), canActivate:[AuthGuard]
  },
  {
    path: 'registro',
    loadChildren: () => import('./paginas/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'qraprobado',
    loadChildren: () => import('./paginas/qraprobado/qraprobado.module').then( m => m.QraprobadoPageModule), canActivate:[AuthGuard]
  },
  {
    path: 'qrfinal',
    loadChildren: () => import('./paginas/qrfinal/qrfinal.module').then( m => m.QrfinalPageModule), canActivate:[AuthGuard]
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./paginas/recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

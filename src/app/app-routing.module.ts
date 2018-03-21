import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumComponent } from './pages/album/album.component';
import { MyalbumComponent } from './pages/myalbum/myalbum.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './shared/_guards/authguard';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignupComponent },
  {path:'Home',component:HomeComponent},
  {path:'Albums',component:AlbumComponent},
  {path:'MyAlbums',component:MyalbumComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

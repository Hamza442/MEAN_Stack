import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
//authguard to protect routes
import { AuthGuard } from './auth/auth.guard';
import { ResetPasswordComponent } from './user/reset-password/reset-password.component';
import { ResetUsernameComponent } from './user/resetusername/resetusername.component';

export const appRoutes: Routes = [
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    {   //canActivate:[AuthGuard] to apply protection
        path: 'userprofile', component: UserProfileComponent,canActivate:[AuthGuard]
    },
    {   
        path: 'resetpassword', component: ResetPasswordComponent
    },
    {   
        path: 'resetusername', component: ResetUsernameComponent
    },
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    }
];
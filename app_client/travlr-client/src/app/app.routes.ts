import { Routes } from '@angular/router';
import { TripListComponent } from './trips/trip-list/trip-list.component';
import { TripEditComponent } from './trips/trip-edit/trip-edit.component';
import { TripAddComponent } from './trips/trip-add/trip-add.component';

export const routes: Routes = [
  { path: '', redirectTo: 'trips', pathMatch: 'full' },
  { path: 'trips', component: TripListComponent },
  { path: 'trips/new', component: TripAddComponent },     // add screen
  { path: 'trips/:id/edit', component: TripEditComponent },// edit screen
  { path: '**', redirectTo: 'trips' }
];

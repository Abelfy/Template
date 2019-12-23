import {NgModule} from "@angular/core";
import { CommonModule } from '@angular/common';
import { 
  MatTooltipModule, 
  MatSelectModule,
  MatRadioModule,
  MatSidenavModule,
  MatListModule,
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatInputModule,
  MatTableModule,
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';
@NgModule({
  imports: [
  CommonModule,
  MatTooltipModule, 
  MatSelectModule,
  MatRadioModule,
  MatSidenavModule,
  MatListModule,
  MatToolbarModule,
  MatButtonModule, 
  MatCardModule,
  MatInputModule,
  MatDialogModule,
  MatTableModule,
  MatMenuModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatDatepickerModule,
  MatNativeDateModule
  ],
  exports: [
  CommonModule,
  MatSelectModule,
  MatRadioModule,
  MatSidenavModule,
  MatListModule,
  MatToolbarModule, 
  MatButtonModule, 
  MatCardModule, 
  MatInputModule, 
  MatDialogModule, 
  MatTableModule, 
  MatMenuModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatDatepickerModule,
  MatNativeDateModule
   ],
})
export class CustomMaterialModule { }
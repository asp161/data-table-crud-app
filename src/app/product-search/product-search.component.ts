import { Component, EventEmitter, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-search',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
  ],
  template: `
    <div class="search-bar">
      <mat-form-field appearance="outline" class="search-input">
        <mat-label>Search product</mat-label>
        <input
          matInput
          type="text"
          [(ngModel)]="searchText"
          (input)="onSearchChange()"
          placeholder="Name"
        />
        <button mat-icon-button matSuffix *ngIf="searchText" (click)="clearText()" aria-label="Limpiar">
          <mat-icon>close</mat-icon>
        </button>
      </mat-form-field>

      <mat-form-field appearance="outline" class="category-select">
        <mat-label>Category</mat-label>
        <mat-select [(ngModel)]="category" (selectionChange)="onSearchChange()">
          <mat-option value="">All</mat-option>
          <mat-option *ngFor="let cat of categories" [value]="cat">{{ cat }}</mat-option>
        </mat-select>
      </mat-form-field>
    </div>
  `,
  styles: [`
    .search-bar {
      display: flex;
      gap: 1rem;
      align-items: center;
      margin-bottom: 1.5rem;
      flex-wrap: wrap;
      margin-top: 2rem;
    }
    .search-input, .category-select {
      min-width: 220px;
      flex: 1 1 220px;
    }
  `],
})
export class ProductSearchComponent {
  @Output() search = new EventEmitter<{ text: string; category: string }>();
  searchText = '';
  category = '';
  categories = ['electronics', 'jewelery', "men's clothing", "women's clothing"];

  onSearchChange() {
    this.search.emit({ text: this.searchText, category: this.category });
  }

  clearText() {
    this.searchText = '';
    this.onSearchChange();
  }
}
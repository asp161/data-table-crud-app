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
        <mat-label>Search Products</mat-label>
        <input
          matInput
          type="text"
          [(ngModel)]="searchText"
          (input)="onSearchChange()"
          placeholder="Enter name or description"
        />
        <button mat-icon-button matSuffix *ngIf="searchText" (click)="clearText()" aria-label="Clear search">
          <mat-icon>close</mat-icon>
        </button>
      </mat-form-field>

      <mat-form-field appearance="outline" class="category-select">
        <mat-label>Category</mat-label>
        <mat-select [(ngModel)]="category" (selectionChange)="onSearchChange()">
          <mat-option value="">All Categories</mat-option>
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
      margin-top: 2rem;
      flex-wrap: wrap;
      justify-content: center;
    }
    .search-input, .category-select {
      min-width: 220px;
      flex: 1 1 220px;
      max-width: 400px;
    }
    @media (max-width: 600px) {
      .search-bar {
        flex-direction: column;
        align-items: stretch;
        gap: 0.5rem;
      }
      .search-input, .category-select {
        min-width: 100%;
        max-width: 100%;
        margin: 0;
      }
      .mat-form-field {
        font-size: 14px;
      }
    }
    @media (max-width: 400px) {
      .mat-form-field {
        font-size: 12px;
      }
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
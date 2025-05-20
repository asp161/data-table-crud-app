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
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss'],
})
export class ProductSearchComponent {
  @Output() search = new EventEmitter<{ text: string; category: string }>();
  searchText = '';
  category = '';
  categories = [
    'electronics',
    'jewelery',
    "men's clothing",
    "women's clothing",
  ];

  onSearchChange() {
    this.search.emit({ text: this.searchText, category: this.category });
  }

  clearText() {
    this.searchText = '';
    this.onSearchChange();
  }
}
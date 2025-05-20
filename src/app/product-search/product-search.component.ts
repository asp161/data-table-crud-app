import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-product-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss'],
})
export class ProductSearchComponent {
  @Output() search = new EventEmitter<{ text: string; category: string }>();
  searchText = '';
  category = '';
  categories = ['electronics', 'jewelery', "men's clothing", "women's clothing"];

  onSearchChange(): void {
    this.search.emit({ text: this.searchText, category: this.category });
  }

  clearText(): void {
    this.searchText = '';
    this.onSearchChange();
  }
}
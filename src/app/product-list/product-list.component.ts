import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  private productService = inject(ProductService);
  displayedColumns: string[] = ['id', 'title', 'price', 'category', 'actions'];
  dataSource: Product[] = [];

  ngOnInit(): void {
    this.productService.getAll().subscribe((data) => {
      this.dataSource = data;
    });
  }
}

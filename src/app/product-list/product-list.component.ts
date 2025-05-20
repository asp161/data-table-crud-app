// src/app/product-list/product-list.component.ts
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ProductSearchComponent } from '../product-search/product-search.component';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { MatIconModule } from '@angular/material/icon';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductAddComponent } from '../product-add/product-add.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatIconModule,
    ProductSearchComponent,
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'image',
    'id',
    'title',
    'price',
    'category',
    'description',
    'actions',
  ];
  dataSource = new MatTableDataSource<Product>([]);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar, // <-- Add this
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  loadProducts(category: string = ''): void {
    const request = category
      ? this.productService.getByCategory(category)
      : this.productService.getAll();
    request.subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  onSearch(event: { text: string; category: string }): void {
    this.loadProducts(event.category);
    this.dataSource.filter = JSON.stringify({
      text: event.text.trim().toLowerCase(),
      category: event.category.toLowerCase(),
    });
    this.dataSource.filterPredicate = (data: Product, filter: string) => {
      const { text } = JSON.parse(filter);
      const textMatch =
        data.title.toLowerCase().includes(text) ||
        data.description.toLowerCase().includes(text);
      return textMatch;
    };
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

addProduct(): void {
  const dialogRef = this.dialog.open(ProductAddComponent, {
    width: '500px',
    maxWidth: '95vw',
    autoFocus: false,
    panelClass: 'custom-dialog',
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      this.productService.create(result).subscribe((newProduct) => {
        this.dataSource.data = [newProduct, ...this.dataSource.data];
        this.snackBar.open('Product added successfully!', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass: 'snackbar-success',
        });
      });
    }
  });
}

  deleteProduct(product: Product): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '340px',
      disableClose: true,
      data: { message: `Are you sure you want to delete "${product.title}"?` },
      panelClass: 'custom-dialog',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productService.delete(product.id).subscribe(() => {
          this.dataSource.data = this.dataSource.data.filter(
            (p) => p.id !== product.id,
          );
          this.snackBar.open('Product deleted successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: 'snackbar-success',
          });
        });
      }
    });
  }

  viewProduct(product: Product): void {
    this.dialog.open(ProductDetailComponent, {
      data: product,
      width: '650px',
      maxWidth: '90vw',
      autoFocus: false,
      panelClass: 'custom-dialog',
    });
  }
}

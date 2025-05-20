import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Product } from '../models/product.model';
import { ProductAddComponent } from '../product-add/product-add.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductEditComponent } from '../product-edit/product-edit.component';
import { ProductSearchComponent } from '../product-search/product-search.component';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    ProductSearchComponent,
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements AfterViewInit {
  displayedColumns: string[] = ['image', 'id', 'title', 'price', 'category', 'description', 'actions'];
  dataSource = new MatTableDataSource<Product>([]);
  allProducts: Product[] = [];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  loadProducts(category: string = ''): void {
    const request = category ? this.productService.getByCategory(category) : this.productService.getAll();
    request.subscribe((data) => {
      this.allProducts = data;
      this.dataSource.data = data;
    });
  }

  onSearch(event: { text: string; category: string }): void {
    let filtered = this.allProducts;
    if (event.category) {
      filtered = filtered.filter((p) => p.category.toLowerCase() === event.category.toLowerCase());
    }
    if (event.text) {
      const text = event.text.trim().toLowerCase();
      filtered = filtered.filter(
        (p) => p.title.toLowerCase().includes(text) || p.description.toLowerCase().includes(text)
      );
    }
    this.dataSource.data = filtered;
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
          this.allProducts = [newProduct, ...this.allProducts];
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

  editProduct(product: Product): void {
    const dialogRef = this.dialog.open(ProductEditComponent, {
      width: '500px',
      maxWidth: '95vw',
      autoFocus: false,
      panelClass: 'custom-dialog',
      data: product,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productService.update(product.id, result).subscribe((updatedProduct) => {
          const allIndex = this.allProducts.findIndex((p) => p.id === product.id);
          if (allIndex !== -1) {
            this.allProducts[allIndex] = updatedProduct;
          }
          const index = this.dataSource.data.findIndex((p) => p.id === product.id);
          if (index !== -1) {
            this.dataSource.data[index] = updatedProduct;
            this.dataSource._updateChangeSubscription();
          }
          this.snackBar.open('Product updated successfully!', 'Close', {
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
          this.allProducts = this.allProducts.filter((p) => p.id !== product.id);
          this.dataSource.data = this.dataSource.data.filter((p) => p.id !== product.id);
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
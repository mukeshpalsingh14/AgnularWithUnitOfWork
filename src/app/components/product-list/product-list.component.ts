import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products!: Product[];
  constructor(private productService: ProductService, private router: Router, private changeDetectorRef: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.getProducts();
  }
  getProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      console.log(products);
    })
  }
  editProduct(id: any): void {
    this.router.navigate(['/product/edit', id]);
  }
  // deleteProduct(id: any): void {
  //   alert(id);
  // }
  tinyAlert() {
    Swal.fire('Hey there!');
  }
  deleteProduct(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This process is irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think',
    }).then((result) => {
      if (result.value) {
        this.productService.deleteProduct(id).subscribe(confirm => { console.log(confirm); });
        this.router.navigate(['/products']);
        Swal.fire('Removed!', 'Product removed successfully.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Product still in our database.)', 'error');
      }
    });
  }
}

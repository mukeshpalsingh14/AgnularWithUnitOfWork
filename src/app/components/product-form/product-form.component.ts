import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  productForm: FormGroup;
  productId?: number;
  selectedFile: File | null = null;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private productService: ProductService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      id: [0,],
      imageUrl: ['',],
      productName: ['', Validators.required],
      productPrice: ['', [Validators.required, Validators.min(0.01)]],
      productDescription: ['', Validators.required],
      files: ['', Validators.required]
    })
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.productService.getProduct(Number(id)).subscribe((product) => {
          this.productForm.patchValue(product);
          console.log(product);
        })
      }
      if (id === null)
        this.productForm.value.id = 0;
      console.log(id);
    })
  }
  onSubmit() {
    if (this.selectedFile) {
      if (this.productForm.valid) {

        if (this.productForm.value.id) {
          this.productService.updateProduct(this.productForm.value.id,this.selectedFile, this.productForm.value).subscribe(product => {
            console.log(product);
             this.router.navigate(['/products']);
           })
          console.log(this.productForm.value);
        }
        else {
          this.productService.createProduct(this.selectedFile, this.productForm.value).subscribe(Response => {
            console.log(Response);
            this.router.navigate(['/products']);
          });
          console.log(this.productForm.value);
        }
      }
    }
  }
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
}

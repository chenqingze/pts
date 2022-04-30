import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../product.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService, private router: Router, private route: ActivatedRoute) {
    this.productForm = this.fb.group({
      id: [],
      batchNo: ['', Validators.required],
      name: ['', Validators.required],
      specs: ['', Validators.required],
      material: ['', Validators.required],
      manufacturer: ['', Validators.required],
      brand: ['', Validators.required],
      batchNum: ['', Validators.required],
      // qualityStatus: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productService.get(params['id']).subscribe(data => {
        this.productForm.setValue({
          id: data?.id,
          batchNo: data?.batchNo,
          name: data?.name,
          specs: data?.specs,
          material: data?.material,
          manufacturer: data?.manufacturer,
          // qualityStatus: ['', Validators.required],
        })
      })
    });

  }


}

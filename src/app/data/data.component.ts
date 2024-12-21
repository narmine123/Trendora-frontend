
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-data',
  standalone: true,
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
  imports: [ReactiveFormsModule,NgIf,]
})
export class DataComponent implements  OnInit, OnChanges {
  customerForm: any;
  @Input() customer: any;
  @Input() isEditMode: boolean= false;
  buttonText: string='';
  @Input() visible: any;
  @Output() close = new EventEmitter<void>();
  selectedCustomerId: any;
  formPopupVisible: boolean=false;

  constructor(private fb: FormBuilder, private service:AuthService) {}
ngOnInit(): void {
this.customerForm = this.fb.group({
  id: ['', Validators.required],
  title: ['',[ Validators.required ,Validators.minLength(3)]],
  price: ['',[ Validators.required, Validators.min(0)]],
  category: ['', Validators.required],
  description: ['', Validators.required],
  image: ['', [Validators.required, Validators.pattern(/(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/i)]],
  rating: this.fb.group({
    rate: [0,[ Validators.required, Validators.min(0), Validators.max(5)]],
    count: [0,[ Validators.required, Validators.min(0), Validators.max(5)]]
  })


}); if (this.customer) {
  this.populateForm(this.customer);
} this.updateButtonText();}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['customer'] && changes['customer'].currentValue) {
      this.populateForm(changes['customer'].currentValue);
    }


    if (changes['isEditMode']) {
      this.updateButtonText();
    }
  }
  updateButtonText(): void {
    this.buttonText = this.isEditMode ? 'Edit Customer' : 'Add Customer';
  }



  populateForm(customer: any): void {
    this.customerForm.patchValue({
      id: customer.id,
      title: customer.title,
      price: customer.price,
      category: customer.category,
      description: customer.description,
      image: customer.image,
      rating: {
        rate: customer.rating.rate,
        count: customer.rating.count
      }
    });
  }


  get f_customer(){
       return this.customerForm.controls
  }

  onSubmit(): void {
    if (this.customerForm.valid) {
      if (this.isEditMode) {
        this.service.updateCustomer(this.customerForm.value).subscribe(
          (response: any) => {
            console.log('Customer updated successfully', response);
            this.close.emit();
          },
          (error: any) => {
            console.error('Error updating customer', error);
          }
        );
      } else {
        this.service.addCustomer(this.customerForm.value).subscribe(
          (response: any) => {
            console.log('Customer added successfully', response);
            this.close.emit();
          },
          (error: any) => {
            console.error('Error adding customer', error);
          }
        );
      }
    }
  }
  openFormPopup(customer: any) {
    this.selectedCustomerId = customer;
    this.isEditMode = true;
    this.formPopupVisible = true;
  }
  openFormPopup1() {
    this.formPopupVisible = true;
    this.isEditMode = false;
  }

  onClose(): void {
    this.close.emit();
  }
}

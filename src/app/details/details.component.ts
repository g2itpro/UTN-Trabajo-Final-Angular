import { Component, inject } from '@angular/core';
import { StoreService } from '../store.service';
import { IStoreItems } from '../store-items';
import { ActivatedRoute } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validator,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    @if (!storeItems) {
    <p>Loading...</p>
    } @else {
    <article>
      <img
        class="listing-photo"
        [src]="storeItems.image"
        [alt]="storeItems.title"
      />
      <section class="listing-description">
        <h2 class="listing-heading">{{ storeItems.title }}</h2>
        <p class="listing-location">
          {{ storeItems.price }} {{ storeItems.description }}
        </p>
      </section>

      <section class="listing-features">
        <h2 class="section-heading">About this product</h2>
        <ul>
          <li>Category: {{ storeItems.category }}</li>
          <li>Rating: {{ storeItems.rating.rate }}</li>
          <li>Opinios: {{ storeItems.rating.count }}</li>
        </ul>
      </section>

      <section class="listing-apply">
        <h2 class="">Register to buy this item</h2>
        <form [formGroup]="registerForm" (submit)="handleSubmit()">
          <label for="fist-name"> First name </label>
          <input type="text" id="fist-name" formControlName="firstName" />
          <span class="alert" [hidden]="firstName.valid || firstName.untouched"
            >First name is required
          </span>

          <label for="last-name"> Last name </label>
          <input type="text" id="last-name" formControlName="lastName" />
          <span class="alert" [hidden]="lastName.valid || lastName.untouched"
            >Last name is required
          </span>

          <label for="email"> Email </label>
          <input type="text" id="email" formControlName="email" />
          <span class="alert" [hidden]="email.valid || email.untouched"
            >@if(email.errors?.['required']){Email is required} @else{Must be a
            valid email}
          </span>
          <button class="primary" type="submit">Register your buy</button>
        </form>
      </section>
    </article>

    }
  `,
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  storeService = inject(StoreService);
  storeItems: IStoreItems | undefined;
  registerForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'),
    ]),
  });

  constructor() {
    const storeItemId = Number(this.route.snapshot.params['id']);
    this.storeService.getProductById(storeItemId).then((storeItem) => {
      this.storeItems = storeItem;
    });
  }

  get firstName() {
    return this.registerForm.get('firstName') as FormControl;
  }
  get lastName() {
    return this.registerForm.get('lastName') as FormControl;
  }

  get email() {
    return this.registerForm.get('email') as FormControl;
  }

  handleSubmit() {
    if (this.registerForm.invalid) return;
    this.storeService.submitApplication(
      this.registerForm.value.firstName ?? '',
      this.registerForm.value.lastName ?? '',
      this.registerForm.value.email ?? ''
    );
  }
}

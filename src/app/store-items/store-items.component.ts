import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IStoreItems } from '../store-items';

@Component({
  selector: 'app-store-items',
  standalone: true,
  imports: [RouterModule],
  template: `<section
    class="listing"
    [routerLink]="['/details/', storeItems.id]"
  >
    <img
      class="listing-photo"
      [src]="storeItems.image"
      alt="Photo of the articult {{ storeItems.title }}"
    />
    <h2 class="listing-heading">{{ storeItems.title }}</h2>
    <p class="listing-location">
      {{ storeItems.category }} {{ storeItems.price }}
    </p>
  </section>`,
  styleUrl: './store-items.component.css',
})
export class StoreItemsComponent {
  @Input() storeItems!: IStoreItems;
}

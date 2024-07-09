import { Component, inject } from '@angular/core';
import { StoreItemsComponent } from '../store-items/store-items.component';
import { IStoreItems } from '../store-items';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [StoreItemsComponent],
  template: `
    <section>
      <form>
        <input type="search" placeholder="Filter by title" #filter />
        <button
          type="button"
          class="primary"
          (click)="filterResults(filter.value)"
        >
          Search
        </button>
      </form>
    </section>
    <section class="results">
      @if (!storeItemsList.length) {
      <span> Loading... </span>
      } @for (item of filteredItemList; track item.id) {
      <app-store-items [storeItems]="item" />
      }
    </section>
  `,
  styleUrl: './home.component.css',
})
export class HomeComponent {
  storeItemsList: IStoreItems[] = [];
  storeServices: StoreService = inject(StoreService);
  filteredItemList: IStoreItems[] = [];

  constructor() {
    this.storeServices
      .getAllProducts()
      .then((storeItemsList: IStoreItems[]) => {
        this.storeItemsList = storeItemsList;
        this.filteredItemList = storeItemsList;
      });
  }
  filterResults(text: string) {
    if (!text) {
      this.filteredItemList = this.storeItemsList;
    }
    this.filteredItemList = this.storeItemsList.filter((item) =>
      item?.title.toLowerCase().includes(text.toLowerCase())
    );
  }

}

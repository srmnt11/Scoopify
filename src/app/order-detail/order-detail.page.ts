// src/app/pages/order-detail/order-detail.page.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderHistoryService } from 'src/app/services/order-history.service';
import { Order } from 'src/app/models/order.model';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {
  order: Order | undefined;

  constructor(
    private route: ActivatedRoute,
    private orderHistoryService: OrderHistoryService
  ) {}

  ngOnInit() {
    const orderId = +this.route.snapshot.paramMap.get('orderId')!;
    const orders = this.orderHistoryService.orderHistory$.getValue();
    this.order = orders.find((order) => order.orderId === orderId);
  }
}

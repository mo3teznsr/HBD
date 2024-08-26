import { Order } from "@prisma/client";
import { BaseController } from "./base.controller";
import { OrderService } from "../services/order.service";

export class OrderController extends BaseController<Order> {
  constructor() {
    super(new OrderService());
  }
}
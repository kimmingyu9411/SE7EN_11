import { StoreService } from "../service/storeService.js";

export class StoreController {
  constructor() {
    this.storeService = new StoreService();
  }

  getAllStore = (req, res, next) => {};

  getOneStore = (req, res, next) => {};

  createStore = (req, res, next) => {};

  updateStore = (req, res, next) => {};

  deleteStore = (req, res, next) => {};
}

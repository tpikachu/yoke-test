// TOOD: move to env possibly
const serverUrl = "http://localhost:3000/api";

export class Endpoints {
  static login = `${serverUrl}/login`;
  static getUser = `${serverUrl}/user`;
  static getProducts = `${serverUrl}/products`;
  static getReceipts = `${serverUrl}/receipts`;
  static purchase = `${serverUrl}/purchase`;
}

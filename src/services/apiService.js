import axios from "axios";

export default class APIService {
  static Route = "http://neurouz.ddns.net:5000/api/";
  static Username = "desktop";
  static Password = "test";
  constructor() {
    this.authorization =
      "Basic " + btoa(APIService.Username + ":" + APIService.Password);
  }

  async GetAsync(url) {
    var config = {
      method: "GET",
      url: APIService.Route.concat(url),
      headers: {
        Authorization: this.authorization,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "X-Requested-With",
      },
    };

    return axios(config);
  }
}

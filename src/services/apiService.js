import axios from "axios";

export default class APIService {
  static Route = "http://neurouz.ddns.net:5000/api/";
  static Username = process.env.REACT_APP_API_USERNAME;
  static Password = process.env.REACT_APP_API_PASSWORD;
  static Authorization =
    "Basic " +
    btoa(
      process.env.REACT_APP_API_USERNAME +
        ":" +
        process.env.REACT_APP_API_PASSWORD
    );

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

  static async PostAsync(url, data) {
    return axios.post(APIService.Route.concat(url), data);
  }
}

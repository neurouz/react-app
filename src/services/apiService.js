import axios from "axios";

export default class APIService {
  static Route = "http://neurouz.ddns.net:5000/api/";
  static User = {};

  static async GetAsync(url) {
    var config = {
      method: "GET",
      url: APIService.Route.concat(url),
      headers: {
        "Content-Type": "application/json",
      },
    };

    return axios(config);
  }

  static async PostAsync(url, data) {
    return axios.post(APIService.Route.concat(url), data);
  }

  static async LoginAsync(data) {
    var auth = {
      Authorization:
        "Basic " +
        btoa(
          process.env.REACT_APP_API_USERNAME +
            ":" +
            process.env.REACT_APP_API_PASSWORD
        ),
    };
    return axios.post(APIService.Route.concat("Account"), data, {
      headers: auth,
    });
  }

  static async PostWithAuthAsync(url, data, apiKey) {
    const auth = {
      Authorization: "Basic ".concat(apiKey),
    };
    return axios.post(APIService.Route.concat(url), data, { headers: auth });
  }

  static async GetWithAuthAsync(url, apiKey, query = null) {
    var config = {
      method: "GET",
      url: APIService.Route.concat(url),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic ".concat(apiKey),
      },
    };

    return axios(config);
  }
}

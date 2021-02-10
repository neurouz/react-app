export default class LocalStorageService {
  static GetJsonData() {
    var encrypted = localStorage.getItem("etoolservice_user_data");
    var decrypted = atob(encrypted);
    return JSON.parse(decrypted);
  }
  static SetJsonData(data) {
    var hashed = btoa(JSON.stringify(data));
    localStorage.setItem("etoolservice_user_data", hashed);
  }
  static GetApiKey() {
    return localStorage.getItem("etoolservice_api_key");
  }
}

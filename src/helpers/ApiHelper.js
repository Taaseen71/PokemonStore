import {create} from 'apisauce';
import {
  ApiUrl,
  ApiGetAllPokemon,
  ERROR_NETWORK_NOT_AVAILABLE,
  ERROR_WRONG_CREDENTIALS,
} from 'src/config/WebService';
const api = create({
  baseURL: `${ApiUrl}/${ApiGetAllPokemon}`,
  headers: {'Content-Type': 'application/json', Accept: 'application/json'},
});

class ApiHelper {
  myobject = undefined;

  get = async (url, data) => {
    try {
      const response = await api.get(url, data, {});

      return new Promise((resolve, reject) => {
        this.handlePromise(resolve, reject, response);
      });
    } catch (ex) {
      console.log(ex);
    }
  };

  handlePromise = (resolve, reject, response) => {
    if (response.error) {
      if (response.error.code === 'LOGIN_FAILED') {
        reject(ERROR_WRONG_CREDENTIALS);
      } else if (response.error.code === 'NETWORK_ERROR') {
        reject(ERROR_NETWORK_NOT_AVAILABLE);
      } else {
        reject();
      }
    } else {
      resolve(response);
    }
  };
}

export default new ApiHelper();

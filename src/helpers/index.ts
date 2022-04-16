import axios from 'axios';
import { cepexApiBaseUrl } from '../configs';

export const uploadProfilePicture = async (data: FormData) => {
  return axios.post(`${cepexApiBaseUrl}/profile/avatar`, data, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data'
    }
  });
}

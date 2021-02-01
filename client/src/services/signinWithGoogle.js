import axios from 'axios';

export default async function signinWithGoogle() {
  return axios
    .post('http://localhost:5000/auth/login/google')
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch(() => {
      return undefined;
    }); 
}
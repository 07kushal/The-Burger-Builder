import axios from 'axios';
const instance = axios.create({
    baseURL: 'https://react-my-burger07.firebaseio.com'
})
export default instance;
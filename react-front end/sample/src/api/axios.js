import axios from 'axios';
import ApplicationStore from '../utils/localStorageUtil';
const token = ApplicationStore().getStorage('token');  
const user_email=ApplicationStore().getStorage('user_email');  

export default axios.create({
    baseURL:'http://localhost:3006/api',
    headers: {
        'Content-Type':'application/json',
        "authorization" : `Bearer:${token}`,
        // "student_id":"",
        "user_email":user_email,
    } 
});
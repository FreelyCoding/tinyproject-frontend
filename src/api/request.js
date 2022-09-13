import axios from 'axios';

export async function getRequest(url, params) {
    try {
        return await axios(url, {
            method: 'get',
            params: params
        });
    } catch (error) {
        console.log(error)
    }
}

export async function postRequest(url, data) {
    try {
        return await axios(url, {
            method: 'post',
            data: data
        });
    } catch (error) {
        console.log(error)
    }
}

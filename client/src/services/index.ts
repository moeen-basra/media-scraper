import {contentTypes} from "../types";
import axios from 'axios';

const fetchFeed = ({type, title, page, pageSize}: any) => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:8081/media/', {
            params: {
                type,
                title,
                page,
                pageSize
            }
        })
            .then((response) => {
                resolve(response)
            }).catch((error) => {
            reject(error);
        })
    })
}

const submitUrl = ({urls}: any) => {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:8081/media/scrape', {
            urls
        }).then(({data}) => {
            resolve(data)
        }).catch((error) => {
            reject(error);
        })
    })

}

const getContentTypes = () => {
    return Object.entries(contentTypes).map(([key, value]) => {
        return {
            key: key.toLowerCase(),
            value: value.toLowerCase().charAt(0).toUpperCase() + value.toLowerCase().slice(1)
        }
    })
}

export {
    fetchFeed,
    getContentTypes,
    submitUrl
}
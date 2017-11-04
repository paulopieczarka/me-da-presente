import React from "react";

const WS_URL = "http://192.168.1.106:8000/api";

export default function Fetcher(url, method = "GET", payload)
{
    let data = null;
    if(method === "POST")
    {
        data = JSON.stringify( payload );
    }

    return new Promise((resolve, reject) => {
        fetch(`${WS_URL}${url}`, { method: method, mode: "cors", headers: {'Content-Type':'application/json'}, body: data })
        .then(result => resolve(result))
        .catch(error => reject(error));
    });
}

export const Image = props => {
    return <img src={`${WS_URL}/img/${props.uid}`} {...props} />;
};

export const Category =
{
    list: () => {
        return Fetcher("/category/list");    
    }
};

export const Product =
{
    add: (data) => {
        return Fetcher("/product/add", "POST", data);
    }
};

export const User =
{
    signup: (data) => {
        return Fetcher("/user/signup", "POST", data);
    },

    signin: (data) => {
        return Fetcher("/user/signin", "POST", data);
    }
}

export const ImageUploadUrl = `${WS_URL}/uploadimg`;
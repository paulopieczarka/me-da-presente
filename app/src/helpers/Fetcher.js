import React from "react";

const WS_URL = "http://192.168.1.106:8000/api";

export default function Fetcher(url, method = "GET", payload)
{
    let data = null;
    if(method === "POST") {
        data = JSON.stringify( payload );
    }

    return new Promise((resolve, reject) => {
        fetch(`${WS_URL}${url}`, { method: method, mode: "cors", headers: {'Content-Type':'application/json'}, body: data })
        .then(result => resolve(result))
        .catch(error => reject(error));
    });
}

export const Image = props => {
    let elemProps = {};
    for(let name in props) {
        if(name === "uid" || name === "style") {
            continue;
        }

        elemProps[name] = props[name];
    }

    return <div style={{backgroundImage:`url(${WS_URL}/img/${props.uid})`, ...props.style}} role="picture" {...elemProps} />
    // return <img src={`${WS_URL}/img/${props.uid}`} alt="" {...props} />;
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
    },

    list: () => {
        return Fetcher("/product/list");    
    }   
};

export const User =
{
    signup: (data) => {
        return Fetcher("/user/signup", "POST", data);
    },

    signin: (data) => {
        return Fetcher("/user/signin", "POST", data);
    },

    profile: (uid) => {
        return Fetcher(`/user/profile/${uid}`);
    }
};

export const Wishlist =
{
    add: (data) => {
        return Fetcher("/wishlist/add", "POST", data);
    },

    get: (uid, data) => {
        return Fetcher(`/wishlist/${uid}`, "POST", data);
    },

    options: (userid, data) => {
        return Fetcher(`/wishlist/options/${userid}`, "POST", data);
    }
};

export const ImageUploadUrl = `${WS_URL}/uploadimg`;
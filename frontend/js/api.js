const API_URL = window.location.origin;

async function apiRequest(endpoint, method="GET", body=null, token=null){

    const options = {
        method: method,
        headers:{
            "Content-Type":"application/json"
        }
    };

    if(body){
        options.body = JSON.stringify(body);
    }

    if(token){
        options.headers["Authorization"] =
            "Bearer " + token;
    }

    const response = await fetch(
        API_URL + endpoint,
        options
    );

    return await response.json();
}

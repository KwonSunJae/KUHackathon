import axios from 'axios';


const namespace =
    'http://117.16.137.217:3000/apis';

export const getMain = async () => {
    const url = `${namespace}/main`;

    let config = {
        method: 'get',
        url,
        headers: {},
    };

    return await axios(config)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
            throw error;
        });
};

export const getTeam = async (uuid) => {
    const url = `${namespace}/team/${uuid}`;

    let config = {
        method: 'get',
        url,
        headers: {},
    };

    return await axios(config)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
            throw error;
        });
};

export const isLikeAvailable = async (uuid) => {
    const url = `${namespace}/like/${uuid}`;

    let config = {
        method: 'get',
        url,
        headers: {},
    };

    return await axios(config)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
            throw error;
        });
};

export const likeTeam = async (data) => {
    const url = `${namespace}/like`;


    let config = {
        method: 'post',
        url: url,
        headers: {},
        data: data,
    };

    return await axios(config)
        .then(response => {
            return JSON.stringify(response.data);
        })
        .catch(async error => {
            console.error(error);
        });
};

export const writeReaple = async (data) => {
    const url = `${namespace}/write`;


    let config = {
        method: 'post',
        url: url,
        headers: {},
        data: data,
    };

    return await axios(config)
        .then(response => {
            return JSON.stringify(response.data);
        })
        .catch(async error => {
            console.error(error);
        });
};
export const dislikeTeam = async (data) => {
    const url = `${namespace}/dislike`;


    let config = {
        method: 'post',
        url: url,
        headers: {},
        data: data,
    };

    return await axios(config)
        .then(response => {
            return JSON.stringify(response.data);
        })
        .catch(async error => {
            console.error(error);
        });
};
export const getAuth = async (data) => {
    const url = `${namespace}/auth`;


    let config = {
        method: 'post',
        url: url,
        headers: {},
        data: data,
    };

    return await axios(config)
        .then(response => {
            return JSON.stringify(response.data);
        })
        .catch(async error => {
            console.error(error);
        });
};
export const updateTeam = async (data) => {
    const url = `${namespace}/update`;


    let config = {
        method: 'post',
        url: url,
        headers: {},
        data: data,
    };

    return await axios(config)
        .then(response => {
            return JSON.stringify(response.data);
        })
        .catch(async error => {
            console.error(error);
        });
};
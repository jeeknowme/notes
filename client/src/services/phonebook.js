import axios from 'axios'

const baseUrl = '/api/notes'

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const create = newObject => {
    return axios.post(baseUrl, newObject).then(response => response.data)
}

const update = (id,newObject) => {
    console.log(newObject)
    return axios.put(`${baseUrl}/${id}`, newObject).then(response => response.data)
}

const delete8 = id => {
    return axios.delete(`${baseUrl}/${id}`)
        .then(response=> response.data)
}

export default {
    getAll: getAll,
    create: create,
    update: update,
    delete8: delete8
}

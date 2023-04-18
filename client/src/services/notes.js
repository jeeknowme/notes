import axios from 'axios'


const baseUrl = '/api/notes'


const getAll = async () => {
    const nonExisting = {
        id: 10000,
        content: 'This note is not saved to server',
        important: true,
    }
    const response = await axios.get(baseUrl)
    return response.data.concat(nonExisting)
}

const create = newObject => {
    return axios.post(baseUrl, newObject).then(response => response.data)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject).then(response => response.data)
}

export default {
    getAll,
    create,
    update
}

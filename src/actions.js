import axios from 'axios'
export const fetchUsers = () => {
    return function(dispatch){
        console.log('fetching users...')
        axios.get('https://gorest.co.in/public/v1/users')
        .then(res => {
            console.log('res',res)
            dispatch({type: "Store_user", payload: res.data})
        })
    }
}

export const saveUser = (payload) => {
    const token = '917fd3dea83bd01fc837b01fe1d06250c8979a1f908db20d875e9bbe1a72e281'
    const {index, userInfo, callBack} = payload
    const {name, email, id, genders, sataus} = userInfo
    return function(dispatch){
        const url = `https://gorest.co.in/public-api/users/${userInfo.id}`
        console.log('fetching users...')
        axios.put(url, {"name": name, "email": email, "id": id}, {headers: {"Authorization": 'Bearer ' + token}})
        .then(res => {
            console.log('res',res)
            // dispatch({type: "Store_user", payload: res.data})
        })
        .catch(error => {
            console.log('Save Failed', error)
        })
    }
}
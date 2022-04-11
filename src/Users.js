import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchUsers, saveUser } from './actions'
function Users(props) {
    const [selectedCard, setCardSelect] = useState(-1)
    const [cardInfo, setCardInfo] = useState({})
    console.log('Users', props)
    const { fetchUsersActon, users, saveUserAction } = props
    useEffect(() => {
        fetchUsersActon()
    }, [])
    const handleEdit = (i) => {
        setCardInfo(users[i])
        setCardSelect(i)
    }
    const handleSave = i => {
        console.log('onSave', cardInfo)
        saveUserAction({index: i, userInfo: cardInfo, callBack: () => setCardSelect(-1)})
        
    }
    const onChangeEmail = (e) => {
        setCardInfo({...cardInfo, email: e.target.value})
    }
    return (
        <div>
            Users
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {
                    users.map((el, i) => {
                        const { email, gender, id, name, status } = el
                        const isCardSelected = selectedCard === i
                        return (
                            <span key={i} style={{ border: '1px solid gray' }}>
                                {
                                    !isCardSelected ?
                                        <div>{email}</div> :
                                        <div><input type="text" value={cardInfo.email} onChange={onChangeEmail}></input></div>
                                }
                                <div>{gender}</div>
                                <div>{id}</div>
                                {
                                    !isCardSelected ?
                                        <div>{name}</div> :
                                        <div><input type="text" value={cardInfo.name}></input></div>
                                }
                                <button onClick={() => {

                                    isCardSelected ? handleSave(i) : handleEdit(i)
                                }}>{isCardSelected ? 'Save' : 'Edit'}</button>
                            </span>
                        )
                    }
                    )
                }
            </div>
        </div>
    )
}

const mstp = state => ({
    users: state.users.data || []
})

const mdtp = dispatch => ({
    fetchUsersActon: () => dispatch(fetchUsers()),
    saveUserAction: data => dispatch(saveUser(data))
})

export default connect(mstp, mdtp)(Users)
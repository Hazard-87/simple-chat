import React, {useState} from "react";
import axios from 'axios'

import socket from '../socket'

const JoinBlock = ({onLogin}) => {
    const [roomId, setRoomId] = useState('')
    const [userName, setUserName] = useState('')
    const [isLoading, setLoading] = useState(false)

    const onChangeRoomId = (e) => {
        setRoomId(e.target.value)
    }

    const onChangeUserName = (e) => {
        setUserName(e.target.value)
    }

    const obj = {
        userName,
        roomId
    }

    const onClickItem = async () => {
        if (!roomId || !userName) {
            return alert('Введите данные')
        }
        setLoading(true)
        await axios.post('/rooms', {roomId, userName})
            onLogin(obj)
            setLoading(false)
    }

    return (
        <div className='joinBlock'>
            <input onChange={onChangeRoomId} type='text' placeholder='Room ID' value={roomId}/>
            <input onChange={onChangeUserName} type='text' placeholder='Ваше имя' value={userName}/>
            <button onClick={onClickItem} disabled={isLoading} type="button"
                    className="btn btn-success">{isLoading ? 'ВХОД...' : 'ВОЙТИ'}</button>
        </div>
    )
}
export default JoinBlock
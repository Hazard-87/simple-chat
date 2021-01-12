import React, {useEffect, useReducer} from 'react'
import socket from './socket'
import reducer from "./reducer";
import JoinBlock from "./components/JoinBlock";
import Chat from "./components/Chat";


const App = () => {
    const [state, dispatch] = useReducer(reducer, {
        joined: false,
        roomId: null,
        userName: null,
        users: [],
        messages: []
    })

    const onLogin = (obj) => {
        dispatch({
            type: 'JOINED',
            payload: obj
        })
        socket.emit('ROOM:JOIN', obj)
    }

    useEffect(() => {
        socket.on('ROOM:JOINED', users => {
            console.log('новый пользователь', users)
            dispatch({
                type: 'SET_USERS',
                payload: users
            })
        })
    }, [])



    return (
        <div className='wrapper'>
            {!state.joined
                ? < JoinBlock onLogin={onLogin}/>
                : < Chat {...state} />
            }
        </div>
    );
};


export default App;

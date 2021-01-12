import React, {useState} from 'react'

const Chat = ({users, messages}) => {
    const [message, setMessage] = useState('')

    const onTypeText = (e) => {
        setMessage(e.target.value)
    }

    const onAddMessage = () => {
        console.log(message)
        setMessage('')
    }

    return (
        <div className='chat'>
            <div className='chat-users'>
                <b>Online ({users.length}):</b>
                <ul>
                    {users.map((user, index) => <li key={user+index}>{user}</li>) }

                </ul>
            </div>
            <div className='chat-messages'>
                <div className='messages'>
                    <div className='message'>
                        <p>Lorem</p>
                        <div>
                            <span>Test User</span>
                        </div>
                    </div>
                    <div className='message'>
                        <p>Lorem</p>
                        <div>
                            <span>Test User</span>
                        </div>
                    </div>

                </div>

                <div className="input-group mb-3">
                    <textarea onChange={onTypeText} type="text" className="formControl" rows="2" value={message}></textarea>
                    <button onClick={onAddMessage} className="btn btn-outline-secondary" type="button">SEND</button>
                </div>
            </div>
        </div>
    )
}

export default Chat
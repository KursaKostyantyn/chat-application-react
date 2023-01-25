import {w3cwebsocket as W3CWebSocket} from "websocket";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";

const url = 'ws://localhost:8080/chat';
const client = new W3CWebSocket(url);

const Chat = () => {
    let [msgs, setMsgs] = useState([]);
    let {register, reset, handleSubmit} = useForm();

    useEffect(() => {
        client.onopen = (e) => {
            console.log('connected to chat', e);
        }
    }, [])

    let userName = sessionStorage.getItem('userName') + ':'

    useEffect(() => {
        client.onmessage = (e) => {
            msgs.push(e.data)
            setMsgs([...msgs])
        }
    }, [])

    const submit = (data) => {
        userName = sessionStorage.getItem('userName') + ':'
        let messageToSend = userName + data.message;
        client.send(messageToSend);
        reset()
    }

    return (
        <div>
            Chat:
            <form onSubmit={handleSubmit(submit)}>
                <input type="text" name={"message"} placeholder={'message'} {...register('message')}/>
                <button>Send message</button>
            </form>
            {msgs.map((value, index) => <div key={index}>{value}</div>)}
        </div>
    );
};

export {Chat};

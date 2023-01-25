import {useForm} from "react-hook-form";
import {useState} from "react";

const UserNameForm = () => {
    let {register, handleSubmit, reset} = useForm();
    let [userName, setUserName] = useState(null);

    const submit = (data) => {
        setUserName(data.name)
        sessionStorage.setItem('userName', data.name)
        reset()
    }

    return (

        <div>
            <form onSubmit={handleSubmit(submit)}>
                <input type={'text'} placeholder={'user login'} {...register('name')}/>
                <button>Save user name</button>
            </form>
            User name: {userName}
        </div>
    );
};

export {UserNameForm};

import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {setUser} from '../../features/user/userSlices'
import './main.css'

const Main = () => {
const [userSurname, setUserSurname] = useState('')
const [userName, setUserName] = useState('')
const [userNumber, setUserNumber] = useState('')
const [userPassword, setUserPassword] = useState('')
const navigate = useNavigate()
const dispatch = useDispatch()

const handleSubmitForm = async (e) => {
    e.preventDefault()
    
    try {
        const response = await fetch('https://kapchyk-server.vercel.app/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({userName, userSurname, userNumber, userPassword})
        })

        const data = await response.json()
        if(response.ok){
            console.log("Успешная регистрация:", data)
        } else {
            console.log("Ошибка при регистрации:", data.message);
        }
    } catch (error){
        console.log("Ошибка:", error);
    }

    dispatch(setUser({userNumber: userNumber, isAuthenticated: true}))

    navigate('/', {state: userNumber})
    setUserName('')
    setUserSurname('')
    setUserNumber('')
    setUserPassword('')
}
    return (
        <main className="main">
            <form onSubmit={handleSubmitForm} className="form">
                <b className="form__title">Регистрация</b>
                <input className="form__input" value={userSurname} type="text" placeholder="Фамилия" onChange={(e) => setUserSurname(e.target.value)}/>
                <input className="form__input" value={userName} type="text" placeholder="Имя" onChange={(e) => setUserName(e.target.value)}/>
                <input className="form__input" value={userNumber} type="text" placeholder="Номер телефона" onChange={(e) => setUserNumber(e.target.value)}/>
                <input className="form__input" value={userPassword} type="password" placeholder="Пароль" onChange={(e) => setUserPassword(e.target.value)}/>
                <button className="form__btn" type="submit">Зарегистрироваться</button>
            </form>
        </main>
    )
}

export default Main
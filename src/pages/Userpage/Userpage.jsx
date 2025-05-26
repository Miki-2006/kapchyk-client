import {useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import arrowImg from '../../imgs/arrow.png'
import circleImg from '../../imgs/history.png'
import './userpage.css'


const Userpage = () => {
    const [accountOfUser, setAccountUser] = useState(null)
    const [userNumber, setUserNumber] = useState('0551007746')
    const navigate = useNavigate()
    const isAuthenticated = useSelector(state => state?.user.isAuthenticated)
    const userData = useSelector(state => state?.user)
    
    useEffect(() => {
        if(!isAuthenticated){
            navigate('/register')
        }
    }, [])


    const getAccountOfUser = async() => {
        try {
            const response = await fetch('https://kapchyk-server.vercel.app/account', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({userNumber})
            })
    
            const data = await response.json()
            if(response.ok){
                setAccountUser(data.account)
            } else {
                console.log("Ошибка при получении счета:", data.message);
            }
        } catch (error){
            console.log("Ошибка:", error);
        }
    }
    
    const historyHandle = () => {
        navigate('/history')
    }
    const transferHandle = () => {
        navigate('/transfer')
    }
 
    useEffect(() => {
        setUserNumber(userData.userNumber)

        getAccountOfUser()

    }, [])


    return (
        <main>
            <div className="account">
                <span className="account__name">Online card</span>
                <div className="account__info">
                    <b className="account__sum">{accountOfUser?.account}</b>
                    <b className="account__discount">$</b>
                </div>
                <div className="account__bottom">
                    <b className="account__title">kapchyk</b>
                    <div className="account__id">
                        <span>*********</span>
                        <span>{accountOfUser?._id.slice(-3)}</span>
                    </div>
                </div>
            </div>
            <div className="user__info">
                <div>
                    <span className="user__sub-info">Фамилия: </span>
                    <b className="user__surname">{accountOfUser?.userSurname}</b>
                </div>
                <div>
                    <span className="user__sub-info">Имя: </span>
                    <b className="user__name">{accountOfUser?.userName}</b>
                </div>
                <div>
                    <span className="user__sub-info">Номер: </span>
                    <b className="user__number">{accountOfUser?.userNumber}</b>
                </div>
            </div>
            <div className="links">
                <button className="link__history" type="button" onClick={historyHandle}>
                    <img src={circleImg} alt="history" />
                    <span className="link__btn">История</span>
                </button>
                <button className="link__transfer" type="button" onClick={transferHandle}>
                    <img src={arrowImg} alt="transfer" />
                    <span className="link__btn">Перевод</span>
                </button>
            </div>
        </main>
    )
}

export default Userpage
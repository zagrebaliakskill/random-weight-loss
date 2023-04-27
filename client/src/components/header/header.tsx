import './header.scss';
import logoImg from '../../images/logo.png';
import caloriesImg from '../../images/calories-icon.png'
import userImg from '../../images/user-img.jpg';
import { useState } from 'react';
import { useSelector } from 'react-redux';


function Header() {
    const { balance, xp, username } = useSelector((state: any) => state.user)
    let userData = {
        avatar: userImg,
        balance: balance,
        name: username,
        xp: xp,
    };

    const lvl = Math.floor(userData.xp / 100) + 1;

    const [isCaloriesPopUpHidden, setIsCaloriesPopUpHidden] = useState(true);
    const closeCaloriesPopUp = () => {
        setIsCaloriesPopUpHidden(true)
    };
    const openCaloriesPopUp = () => {
        setIsCaloriesPopUpHidden(false)
    };

    return (
        <>  {!isCaloriesPopUpHidden && 
                <div className="calories__pop-up">
                    <input type="text" placeholder='Название продукта'/>
                    <input type="number" placeholder='Калории' />
                    <input type="submit" value={"Потратить"}/>
                    <input type="button" value={"Закрыть"} onClick={closeCaloriesPopUp}/>
                </div>
            }
            <header className="header">
                <div className="container">
                    <div className="header__inner">
                        <div className="header__logo">
                            <img src={logoImg} alt="" />
                            <p className="header__logo-text">Random Fitness</p>
                        </div>
                        <nav className="header__nav">
                            <ul className="header__nav-list">
                                <li className="header__nav-item">
                                    <a className="header__nav-link">Миссии</a>
                                </li>
                                <li className="header__nav-item">
                                    <a className="header__nav-link">Статистика</a>
                                </li>
                            </ul>
                        </nav>
                        <div className="header__user">
                            <div className="header__user-calories">
                                <img className="header__user-calories-img" src={caloriesImg} alt="calories" />
                                <div className="header__user-calories-count">
                                    {userData.balance}
                                </div>
                                <div className="header__user-calories-control">
                                    <div className="header_-user-calories-control-minus" onClick={openCaloriesPopUp}>Потратить</div>
                                </div>
                            </div>
                            <img className="header__user-img" src={userData.avatar} alt="user photo" />
                            <div className="header__user-name">
                                {userData.name}
                            </div>
                            <div className="header_-user-lvl">
                                {lvl} уровень
                            </div>
                            <div className="header__user-xp">
                                {userData.xp % 100}/100 XP
                            </div>
                        </div> {/*  header__user */}
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header
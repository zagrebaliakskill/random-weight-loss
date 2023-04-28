import './mission.scss';
import runImg from '../../images/mission-run.png';
import sitUpImg from '../../images/mission-sit-up.png';
import pushUpImg from '../../images/mission-push-ups.png';
import pressImg from '../../images/mission-press.png';
import plankImg from '../../images/mission-plank.png';
import axiosInstance from '../../api/axiosInstance';
import { useState } from 'react';
import { store } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { changeBalance, changeXp } from '../../redux/reducers/userReducer';

type MissionProps = {
    title: string;
    mission_target: string;
    description: string;
    xp: number;
    balance: number;
    id: number;
    type: string;
    status: string;
}


function Mission(props: MissionProps) {
    const dispatch = useDispatch();
    
    const getMissionImg = (input: string) => {
        switch (input) {
            case "run":
                return runImg
            case "sit-ups":
                return sitUpImg
            case "push-ups":
                return pushUpImg
            case 'plank':
                return plankImg
            case 'press':
                return pressImg
            default:
                console.log("Invalid input");
        }
    }
    const { title, mission_target, description, xp, balance, id, type, status } = props;


    const [missionStatus, setMissionStatus] = useState(status)
    const startMission = async() => {
        const response = await axiosInstance.post('/missions/startMission', {"mission_id": id})
        if (response.data === true) {
            setMissionStatus('started')
        }
    }

    const finishMission = async() => {
        const response = await axiosInstance.post('/missions/finishMission', {"mission_id": id})
        if (response.data === true) {
            dispatch(changeBalance(balance))
            dispatch(changeXp(xp))
            setMissionStatus('finished')
        }
    }

    const [missionClass, setMissionClass] = useState<string>('')

    const deleteMission = async() => {
        //const response = await axiosInstance.post('/missions/deleteMission', {"mission_id": id})
        const response: any = {}
        response.data = true
        if (response.data === true) {
            dispatch(changeXp(-20))
            setMissionClass('mission__transform-deleted')
            setTimeout(() => {
                setMissionStatus("deleted")
            }, 290)
        }
    }
    return (
        <>
            {missionStatus != "deleted" && 
                <div className={`mission ${missionClass}`}>
                    <img src={getMissionImg(type)} alt="" className="mission__img" />
                    <div className="mission__content">
                        <div className="mission__title">
                            {title}
                        </div>
                        <div className="mission__target">
                            Цель: {mission_target}
                        </div>
                        <div className="mission__description">
                            Описание: {description}
                        </div>
                    </div>
                    <div className="mission__reward">
                        <div className="mission__reward-title">
                            Награда:
                        </div>
                        <div className="mission__reward-item mission__reward-item--xp">
                            {xp} XP
                        </div>
                        <div className="mission__reward-item mission__reward-item--calories">
                            {balance} Калорий
                        </div>
                    </div>
                    <div className="mission__controls">
                        {missionStatus === "active" && <button className='mission__controls-start' onClick={startMission}>Начать</button>} 
                        {missionStatus === "started" &&
                        <>
                            <button className='mission__controls-finish' onClick={finishMission}>Завершить</button>
                            <button className='mission__controls-delete' onClick={deleteMission}>X</button>
                        </>
                        }
                        {missionStatus === "finished" && <button className='mission__controls-finished' onClick={finishMission}>Завершена</button>}
                    </div>
                </div>
            }
        </>
    )
}

export default Mission;
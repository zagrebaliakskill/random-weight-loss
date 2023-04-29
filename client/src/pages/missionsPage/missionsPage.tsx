import Mission from '../../components/mission/mission'
import './missionsPage.scss'
import axiosInstance from '../../api/axiosInstance'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function MissionPage() {
    const {isLoggedIn} = useSelector((store:any) => store.user)
    interface MissionData {
        id: number;
        mission_target: string;
        title: string;
        description: string;
        xp: number;
        balance: number;
        type: string;
        status: string;
    }
    const [missionData, setMissionData] = useState<MissionData[]>([])
    const [isMissionLoading, setIsMissionLoading] = useState<Boolean>(false)
    const getMissionData = async () => {
        
        const missions = await axiosInstance.post('/missions/getMissions')
        
        if (missions.data) {
            setMissionData(missions.data)
        }
    }

    useEffect(() => {    
        if (isLoggedIn) {
            setIsMissionLoading(true)  
            getMissionData() 
            setIsMissionLoading(false)  
        }
    }, [isLoggedIn])
    return (
        <>
            <div className="missions">
                <div className="container">
                    
                        {
                            isMissionLoading ?
                            <div className="missions__loader">
                                <div className="mission__loader-spinner"><div></div><div></div><div></div><div></div></div>
                            </div>
                            :
                            <div className="missions__inner">
                            {missionData.map((e) => 
                            <Mission {...e} key={e.id}/>
                            ) }
                            </div>
                        }
                    
                </div>
            </div>
        </>
    )
}

export default MissionPage
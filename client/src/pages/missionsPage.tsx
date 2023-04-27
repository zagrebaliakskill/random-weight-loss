import Mission from '../components/mission/mission'
import './missionsPage.scss'
import axiosInstance from '../api/axiosInstance'
import { useEffect, useState } from 'react'

function MissionPage() {
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

    const getMissionData = async () => {
        const missions = await axiosInstance.post('/missions/getMissions')
        if (missions.data) {
            setMissionData(missions.data)
        }
    }

    useEffect(() => {
        getMissionData()
    }, [])
    return (
        <>
            <div className="missions">
                <div className="container">
                    <div className="missions__inner">
                        {
                        missionData.map((e) => 
                        <Mission {...e} key={e.id}/>
                        )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default MissionPage
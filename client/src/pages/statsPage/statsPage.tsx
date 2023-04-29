import { useEffect, useState } from "react"
import axiosInstance from "../../api/axiosInstance"
import "./statsPage.scss"

const StatsPage = () => {
    type IStats = {
        total_steps: number;
        total_plank: number;
        total_press: number;
        total_push_ups: number;
        total_sit_ups: number;
    }

    const getStats = async () => {
        const stats = await (await axiosInstance.post("/users/getStats")).data
        if (stats) {
            setStats(stats)
        }
    }

    const [stats, setStats] = useState<IStats | any>({})
    console.log(stats);
    

    useEffect(() => {
        getStats()
    }, [])
    return (
        <>
            <div className="stats">
                <div className="container">
                    <div className="stats__inner">
                        <div className="stats__dashboard">
                            <div className="stats__dashboard-item">
                                <span className="stats__dashboard-item-name">Всего шагов:</span>
                                <span className="stats__dashboard-item-number">{stats.total_steps}</span>
                            </div>
                            <div className="stats__dashboard-item">
                                <span className="stats__dashboard-item-name"> Всего упражнений на пресс:</span>
                                <span className="stats__dashboard-item-number">{stats.total_press}</span>
                            </div>
                            <div className="stats__dashboard-item">
                                <span className="stats__dashboard-item-name">Всего отжиманий: </span> 
                                <span className="stats__dashboard-item-number">{stats.total_push_ups}</span>
                            </div>
                            <div className="stats__dashboard-item">
                                <span className="stats__dashboard-item-name">Всего секунд в планке: </span>
                                <span className="stats__dashboard-item-number">{stats.total_plank}</span>
                            </div>
                            <div className="stats__dashboard-item">
                                <span className="stats__dashboard-item-name">Всего приседаний: </span>
                                <span className="stats__dashboard-item-number">{stats.total_sit_ups}</span>  
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StatsPage
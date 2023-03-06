import './MetricsResume.css'
interface MetricsResumeProps{
    dias:number[]
}

export const MetricsResume = ({dias}:MetricsResumeProps) => {
    const streakCalc=(dias:number[])=>{
        let streak=0;
        for(let i=dias.length-1;i>=0;i--){
            if(dias[i]!==0)streak++;
            else break;
        }
        return streak
    }
    const totalTasks=(dias:number[])=>{
        return dias.reduce((acc,curr)=>acc+curr,0)
    }
  return (
    <div className='contResume'>
        <div className='subBox'>
            <label className='title'>Tareas completadas en los ultimos siete dias:</label>
            <p><span className='number'>{totalTasks(dias)}</span> tareas.</p>
        </div>
        <div className='subBox'>
            <label className='title'>Racha:</label>
            <p><span className='number'>{streakCalc(dias)}</span> dias.</p>
        </div>
    </div>
  )
}

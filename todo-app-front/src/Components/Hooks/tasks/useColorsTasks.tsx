import {FiAlertTriangle} from 'react-icons/fi';
import {TbFocus2} from 'react-icons/tb';
import {RiListCheck2} from 'react-icons/ri';

export const useColorsTasks = () => {

    function gradeProps(grade:number){
        switch(grade){
            case 1:
                return {
                    Icon:FiAlertTriangle,
                    color:'--danger-color',
                    text:'Urgente'
                }
            case 2:
                return {
                    Icon:TbFocus2,
                    color:'--info-color',
                    text:'Importante'
                }
            case 3:
                return {
                    Icon:RiListCheck2,
                    color:'--online-green-color',
                    text:'Necesario'
                }
            default:
                return{
                    Icon:RiListCheck2,
                    color:'--online-green-color',
                    text:'Necesario'
                }
        }
    }
    function statusColor(status:string){
        switch(status){
            case 'Pending':
                return '--light-color'
            case 'In progress':
                return '--info-color'
            case 'Success':
                return '--online-green-color'
            case 'Canceled':
                return '--base-purple-color'
            case 'Expired':
                return '--red'
            default:
                return '--light-color'
        }

    }

    function timeCalc(time:number){
        return {
            seg:Math.trunc((time - Math.floor(time))*60),
            min:Math.floor(time)
        }
    }
  return {statusColor,gradeProps,timeCalc}
}

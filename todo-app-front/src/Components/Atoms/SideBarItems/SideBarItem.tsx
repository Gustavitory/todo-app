import {IconType} from 'react-icons'
import './SideBarItem.css';
export interface SideBarItemProps{
  Icon:IconType;
  title:string;
  selected:string;
  click:()=>void;
}

export const SideBarItem = ({Icon,title,selected,click}:SideBarItemProps) => {
  return (
    <>
      <div className='allCont'>
        <div className={`itemCont${title===selected?' activeItem':''}`} onClick={click}>
          <div className="iconTitle">
            <Icon/>
            <p className='title'>{title}</p>
          </div>
        </div>
      </div>
    </>
  )
}

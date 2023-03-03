export interface headerLogin{
  userName:string;
  password:string;
}

export interface editCreateTask{
  name?:string;
  description?:string;
  finishdate?:Date;
  status?:'Pending'|'In progress'|'Success'|'Canceled'|'Expired';
  limitTime?:number;
  actualTime?:number;
}

export const tokenFinder= ()=>{
  let token=window.localStorage.getItem('todoToken')
  return token?token:''
}

export const Url='http://localhost:3001'

export const options =(body:any,type:string,token:string)=> {
    return{
      method: type,
      headers: {
        "Content-Type": "application/json",
        "token":token
      },
      body: JSON.stringify(body)
    }
  };
export const loginOptions=(header:any,type:string)=>{
  return {
    method:type,
    headers:{
      "Content-Type":"application/json",
      "userName":header.userName,
      "password":header.password
    }
  }
}


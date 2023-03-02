const tokenFinder= ()=>{
  let token=window.localStorage.getItem('todoToken')
  return token?token:''
}

const Url='http://localhost:3001'

const options =(body:any,type:string)=> {
    return{
      method: type,
      headers: {
        "Content-Type": "application/json",
        "token":tokenFinder()
      },
      body: JSON.stringify(body)
    }
  };
const loginOptions=(header:any,type:string)=>{
  return {
    method:type,
    headers:{
      "Content-Type":"application/json",
      "userName":header.userName,
      "password":header.password
    }
  }
}


  export const register= async (header:{userName:string,password:string})=>{
    try{
      const newUser= await fetch(`${Url}/register`,loginOptions(header,'GET'));
      const data=await newUser.json();
      return data;
    }catch(err){console.log(err)}
  }
  export const login= async (header:{userName:string,password:string})=>{
    try{
      const user= await fetch(`${Url}/login`,loginOptions(header,'GET'));
      const data=await user.json();
      return data;
    }catch(err){console.log(err)}
  }

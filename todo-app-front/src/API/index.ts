const tokenFinder= ()=>{
  let token=window.localStorage.getItem('todoToken')
  return token?token:''
}

const Url='localhost:3001'

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


  export const register= async (body:{userName:string,password:string})=>{
    try{
      const newUser=fetch('')
    }catch{(err:any)=>console.log(err)}
  }

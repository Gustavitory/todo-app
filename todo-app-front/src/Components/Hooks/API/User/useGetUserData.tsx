// import { useDispatch } from 'react-redux';
// import { Url,tokenFinder,getOptions } from '../../../../API';
// import { setName } from '../../../../Redux/Reducers/User';

export const useGetUserData = () => {
  // const dispatch=useDispatch();
  const getUserData = async () => {
    // const token=tokenFinder();
    // if(token){
    //   try{
    //     const user=await fetch(`${Url}/user`,getOptions(token));
    //     const data=await user.json();
    //     if(!data||!data.status)throw new Error(data.message);
    //     else return dispatch(setName(data.user.userName))
    //   }catch(err){console.log(err)}
    // }
  };

  return { getUserData };
};

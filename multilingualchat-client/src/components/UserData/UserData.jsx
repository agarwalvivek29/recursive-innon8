import React from 'react'

const UserData=({user})=> {
  return (
    user.map((curUser)=>{
        const{name,record,time}=curUser
        return(
            <tr>
               <td>{name}</td>
               <td><img src="../../messenger.png" alt=""  className='h-2 '/></td>
               <td>{time}</td>
            </tr>
        )    })
  );
}

export default UserData
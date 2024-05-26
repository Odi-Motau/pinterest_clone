"use client"


import React, {useEffect, useState} from 'react'
import app from '../Shared/firebaseConfig'
import UserInfo from './../components/UserInfo'
import PinList from './../components/Pins/PinList'
import { query, collection, getDocs, where, getDoc, getFirestore, doc } from 'firebase/firestore'




function Profile({params}) {
  const db=getFirestore(app);
  const [userInfo,setUserInfo]=useState();
  const[listOfPins,setListOfPins]=useState([]);
  useEffect(()=>{
    console.log(params.userId.replace('%40', '@'))
    if(params){
      getUserInfo(params.userId.replace('%40', '@'))
    }
  },[params]);


  const getUserInfo=async(email)=>{
   const docRef = doc(db, "user", email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      //console.log("Document data:", docSnap.data());
      setUserInfo(docSnap.data())
    }else{
      // docSnap.data() willbeundefined in this case
      console.log("No such document!");
    }
  }

  

  useEffect(()=>{
    if(userInfo){
      getUserInfo();
    }
  },[userInfo])

  const getUserPins=async()=>{
      const q = query(collection(db, 'pinterest-post'), where("email", '==', userInfo.email));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      });
  }

  return (
    <div>
      {userInfo?
     <div>
      <UserInfo userInfo={userInfo}/>

     <PinList />
     </div>:null}
      
    </div> 
  )
}

export default Profile
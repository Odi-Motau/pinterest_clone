"use client"

import Image from 'next/image';
import React, { useEffect } from 'react';
import { useSession, signIn } from "next-auth/react";
import { getFirestore, setDoc, doc, collection } from "firebase/firestore";
import app from '../Shared/firebaseConfig';
import { HiSearch, HiBell, HiChat } from 'react-icons/hi';
import { useRouter } from 'next/navigation';

function Header() {
  const { data: session } = useSession();
  const router=useRouter();
  //console.log("Session:", session); // Add console log to check session data

  const db = getFirestore(app);

  useEffect(() => {
    console.log("Session changed:", session);
    saveUserInfo(); // Call saveUserInfo when session changes
  }, [session]);

  const saveUserInfo = async () => {
    if (session?.user && session.user.email) {
      const userCollectionRef = collection(db, "user");
      console.log("User collection ref:", userCollectionRef); // Add console log to check user collection ref

      const userDocRef = doc(userCollectionRef, session.user.email);
      console.log("User document ref:", userDocRef); // Add console log to check user document ref
      
      try {
        await setDoc(userDocRef, {
          userName: session.user.name,
          email: session.user.email,
          userImage: session.user.image
        });
        console.log("User information saved successfully.");
      } catch (error) {
        console.error("Error saving user information:", error);
      }
    }
  };
 
  const onCreateClick=()=>{
    if(session){
      router.push('/pin-builder')
    }
    else{
     signIn()
    }
  }
  
  return (
    <div className='flex gap-3 md:gap-2 items-center p-6'>
        <Image src='/logo.png' 
        alt='logo'
        width={50}
        height={50}
        onClick={()=>router.push('/')}
        className='
        hover:bg-gray-300
         p-2
         rounded-full
         cursor-pointer'
        />
        <button className='bg-black
         text-white
          p-2
           px-4
            rounded-full
            hidden md:block'>Home</button>
        <button className='font-semibold
          p-2
           px-4
            rounded-full' onClick={()=>onCreateClick()}>Create</button>
        <div className='bg-[#e9e9e9] p-3
        flex gap-3 items-center rounded-full w-full hidden md:flex'>
            <HiSearch className='text-[25px] 
            text-gray-500 md:hidden'/>
            <input type="text"placeholder='Search'
            className='bg-transparent outline-none' />
            
        </div>
        <HiSearch className='text-[25px] text-gray-500 md:hidden'/>
        <HiBell className='text-[25px] md:text-[40px] text-gray-500 cursor-pointer'/>
            <HiChat className='text-[25px] md:text-[40px] text-gray-500 cursor-pointer'/>
            {session?.user? <Image src={session?.user?.image}
            onClick={()=>router.push('/'+session.user?.email)}
            alt='user-image'
            width={50}
            height={50}
            className='
        hover:bg-gray-300
         p-2
         rounded-full
         cursor-pointer'
            />:

            <button className='font-semibold
          p-2
           px-4
            rounded-full' onClick={() => signIn()}>Login</button>}
    </div>
  )
}

export default Header
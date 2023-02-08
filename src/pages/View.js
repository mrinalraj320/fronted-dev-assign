import React, {useState,  useEffect} from 'react';
import fireDb from "../firebase";
import {useParams, Link} from "react-router-dom";
import "./View.css"
const View = () => {
  const [user, setUser] = useState({});

  const { id } = useParams();

    useEffect(()=>{
        fireDb.child(`contacts/${id}`).get().then((snapshot)=> {
            if(snapshot.exists()){
                setUser({...snapshot.val()})
            } else{
                setUser({});
            }
        });
    },[id]);

  console.log("user", user);
  return (
    <div style={{marginTop:"150px"}}>
        <div className='card'>
            <div className='card-header'>
                <p>User Contact Details</p>
            </div>
            <div className='container'>
              
                <strong>First Name: </strong>
                <span>{user.fname}</span>
                <br/>
                <br/>

                <strong>Class: </strong>
                <span>{user.myclass}</span>
                <br/>
                <br/>

                <strong>Roll Number: </strong>
                <span>{user.rnum}</span>
                <br/>
                <br/>
                <Link to="/">
                    <button className='btn'>Go Back</button>
                </Link>
            </div>
        </div>
        
    </div>
  )
}

export default View
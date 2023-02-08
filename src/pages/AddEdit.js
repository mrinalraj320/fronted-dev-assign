import React,{useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import './AddEdit.css';
import fireDb from "../firebase";
import {toast} from "react-toastify";


const initialState ={
    fname:"",
    mname:"",
    lname:"",
    myclass:"",
    mydiv:"",
    rnum:"",
    add1:"",
    add2:"",
    land:"",
    city:"",
    pincode:""

}


const AddEdit = () =>
{
const [state, setState]=useState(initialState);
const[data, setData]=useState({});

const { fname, mname, lname, myclass, mydiv, rnum, add1, add2, land, city, pincode  } = state;

const navigate = useNavigate();

const {id} = useParams({});

useEffect(() => {
    fireDb.child("contacts").on("value",(DataSnapshot) =>{
        if (DataSnapshot.val()  !== null) {
            setData({...DataSnapshot.val()});
        } else {
            setData({});
        }
    });
    return () => {
        setData({});
    };
}, [id]);


useEffect(() => {
    if (id){
        setState({ ...data[id]});
    }else{
        setState({...initialState});
    }
    return () =>{
        setState({...initialState});
    } 
},[id, data]);




const handleInputChange = (e) => {
    const{ name, value } = e.target;
    setState({...state, [name]: value});
};

const handleSubmit = (e) => {
    e.preventDefault();
    if(!fname || !mname || !lname || !myclass || !mydiv || !rnum || !add1 || !add2 || !land || !city || !pincode  ) {
        toast.error("Please provide value in each input field");
    }
    else{

        if(!id){
            
fireDb.child(`contacts`).push(state,(err) => {
            if(err){
                toast.error(err);
            } else{
                toast.success("Contact Added Successfully");
            }
        });
        } else{
            
        fireDb.child(`contacts/${id}`).set(state,(err) => {
            if(err){
                toast.error(err);
            } else{
                toast.success("Contact Update Successfully");
            }
        }); 
        }

        setTimeout(() => navigate("/"), 500);
    }
}; 

    return(
        <div style={{marginTop:"100px"}}>
            <form 
            style={{
                margin:"auto",
                padding:"15px",
                maxWidth:"400px",
                alignContent:"center",
                }}
                onSubmit={handleSubmit}
                >
                    
                <input
                type="text"
                id="fname"
                placeholder="First Name"
                value={fname || ""}
                name="fname"
                onChange={handleInputChange}/> 
                
                <input
                type="text"
                id="mname"
                placeholder="Middle Name"
                value={mname || ""}
                name="mname"
                onChange={handleInputChange}/> 

                <input
                type="text"
                id="lname"
                placeholder="Last Name"
                value={lname || ""}
                name="lname"
                onChange={handleInputChange}/> 

                <select value={myclass || ""} 
                id="myclass" 
                name="myclass"
                onChange={handleInputChange}>
                   <option>Select Class</option>
                    <option>I</option>
                    <option>II</option>
                    <option>III</option>
                    <option>IV</option>
                    <option>V</option>
                    <option>VI</option>
                    <option>VII</option>
                    <option>VIII</option>
                    <option>IX</option>
                    <option>X</option>
                    <option>XI</option>
                    <option>XII</option>
                </select>

                <select value={mydiv || ""} 
                id="mydiv"
                name="mydiv"
                onChange={handleInputChange}>
                    <option>Select Division</option>
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                    <option>D</option>
                    <option>E</option>
               </select>

                
               <input
                type="number"
                id="rnum"
                name="rnum"
                placeholder="Enter Roll number 2 digit"
                value={rnum || ""}
                onChange={handleInputChange}/> 

                <textarea 
                placeholder="Address Line 1" 
                value={add1 || ""} id="add1"
                name="add1"
                onChange={handleInputChange} >
                </textarea>

                
                <textarea 
                placeholder="Address Line 2" 
                value={add2 || ""} id="add2"
                name="add2"
                onChange={handleInputChange} >
                </textarea>

                
               <input
                type="text"
                id="land"
                placeholder="Landmark"
                value={land || ""}
                name="land"
                onChange={handleInputChange}/> 

                
               <input
                type="text"
                id="city"
                placeholder="City"
                value={city || ""}
                name="city"
                onChange={handleInputChange}/> 

                
               <input
                type="number"
                id="pincode"
                placeholder="Pincode"
                value={pincode || ""}
                name="pincode"
                onChange={handleInputChange}/> 

                <input type="submit" value={id ? "Update" : "Add Student"}/>
            </form>
        </div>
    )
}
export default AddEdit
import React, {useState, useEffect} from 'react';
import fireDb from "../firebase";
import {Link} from "react-router-dom"
import "./Home.css"; 
import { toast } from 'react-toastify';
const Home = () => {
    const [data, setData] = useState({});
    useEffect(() => {
        fireDb.child(`contacts`).on("value",(snapshot) =>{
            if (snapshot.val()  !== null) {
                setData({...snapshot.val()});
            } else {
                setData({});
            }
        });
        return () => {
            setData({});
        };
    }, []);
    const onDelete = (id) => {
        if(window.confirm("Are u sure to delete")){
            fireDb.child(`contacts/${id}`).remove((err) => {
                if(err) {
                    toast.error(err)
                } else{
                    toast.success("deleted successfully")
                }
            })
        }
    }
return (
        <div style={{marginTop: "100px"}}>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th style={{textAlign: "centre"}}>Name</th>
                        <th style={{textAlign: "centre"}}>Class</th>
                        <th style={{textAlign: "centre"}}>Roll no.</th>
                        <th style={{textAlign: "centre"}}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(data).map((id, index) => {
                        return (
                            <tr key={id}>
                                <td>{data[id].fname + " " +data[id].mname+ " " + data[id].lname}</td>
                                <td>{data[id].myclass + "-" + data[id].mydiv}</td>
                                <td>{data[id].rnum}</td>
                                <td>
                                    <Link to={`/update/${id}`}>
                                        <button className="btn btn-edit">Edit</button>
                                    </Link>
                                    <button className="btn btn-delete" onClick={() => onDelete(id)} >Delete</button>
                                    <Link to={`/view/${id}`}>
                                        <button className="btn btn-view">View</button>
                                    </Link>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

        </div>
    )
}
export default Home
import React from 'react'
import { Footer } from '../Basics/Footer'
import { Header } from '../Basics/Header'
import app from "../../firebase";

const AboutUs = () => {
    // Get a reference to the storage service, which is used to create references in your storage bucket
    
    // Create a storage reference from our storage service
    
    const onSubmit = (e)=>{
        e.preventDefault();
    }

    const onFileChange = (e) =>{
        const file = e.target.files[0]
        const storageRef = app.storage().ref()
        const fileRef = storageRef.child(file.name)
        fileRef.put(file).then(()=>{
            console.log("Uploaded file !",file.name)
        })
    }

    return (
        <>
        <Header/>
            <h1>about us page</h1>
            <form onSubmit={onSubmit}>
                <label for="myfile">Select a file:</label>
                <input type="file" id="myfile" name="myfile" onChange={onFileChange}/>
                <button type="submit">Upload file</button>
            </form>
        <Footer/>
        </>
    )
}

export default AboutUs
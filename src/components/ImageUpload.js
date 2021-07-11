import React, { useState} from "react"
import {Button} from '@material-ui/core'
import { db, storage } from "../firebase"
import firebase from "firebase"


export default function ImageUpload({username}){

    const [caption, setCaption] = useState('')
    const [image, setImage] = useState(null)
    const [progress, setProgress] = useState(0)

    const handleChange = (e) => {
        if(e.target.files[0]){
            setImage(e.target.files[0])
        }
    }

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
        uploadTask.on(
        "state_changed",
        (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalByBytes) * 100)
            setProgress(progress)
        },
        (err) => {
            console.log(err)
            alert(err.message)
        },
        () => {
            storage.ref("images").
            child(image.name).
            getDownloadURL().
            then(url => {
                db.collection('posts').add({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    caption: caption,
                    imageUrl: url,
                    username: username
                })
                setProgress(0)
                setImage('')
                setCaption('')
            })
        }
        )
    }
    

    return(
        <div>
            
            <progress value={progress} max="100" />
            <input type="text" placeholder="Enter caption" onChange={(e) => setCaption(e.target.value)}/>
            <input type="file" onChange={handleChange}/>
            <Button onClick={handleUpload}>
                Upload
            </Button>
        </div>
    )

}
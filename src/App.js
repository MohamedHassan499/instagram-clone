import React, { useState, useEffect } from "react"

import './styles/App.css'
import  Post from './components/Post'
import { db, auth } from './firebase'

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from'@material-ui/core';
import ImageUpload from "./components/ImageUpload";

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function App() {

  const classes = useStyles()

  const [posts, setPosts] = useState([])
  const [open, setOpen] = useState(false)
  const [modalStyle] = React.useState(getModalStyle)

  const [openSignin, setOpenSignin] = useState(false)

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser){
        console.log(authUser)
        setUser(authUser)

        if(authUser.displayName){
          // dont update username
        } else{
            return authUser.updateProfile({
              displayName: username
            })
        }

      }else{
        setUser(null)
      }
      return () => {
        unsubscribe()
      }
    })
  }, [user, username])

  useEffect(() => {

    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post:doc.data()
      })))
    })

  }, [])


  const handleSubmit = (event) => {
    event.preventDefault()
    auth.createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch(err => alert(err.message))
  }


  const signin = (event) => {
    event.preventDefault()

    auth.signInWithEmailAndPassword(email, password)
    .catch((err) => alert(err.message))

    setOpenSignin(false)

    console.log(user)

  }

  return (
    <div className="App">

      
      <Modal
      open={open}
      onClose={() => setOpen(false)}
      >
          <div style={modalStyle} className={classes.paper}>
            <form className="app__signup">
              <center>
                <Input
                  placeholder="username"
                  type="text"
                  value = {username}
                  onChange = {(e) => setUsername(e.target.value)}
                />
                
                <Input
                  placeholder="email"
                  type="text"
                  value = {email}
                  onChange = {(e) => setEmail(e.target.value)}
                />

                <Input
                  placeholder="password"
                  type="password"
                  value = {password}
                  onChange = {(e) => setPassword(e.target.value)}
                />

                <Button type="submit" onClick={handleSubmit}>Signup</Button>

              </center>
            </form>
          
          </div>
      </Modal>



      <Modal
      open={openSignin}
      onClose={() => setOpenSignin(false)}
      >
          <div style={modalStyle} className={classes.paper}>
            <form className="app__signup">
              <center>
                <Input
                  placeholder="email"
                  type="text"
                  value = {email}
                  onChange = {(e) => setEmail(e.target.value)}
                />

                <Input
                  placeholder="password"
                  type="password"
                  value = {password}
                  onChange = {(e) => setPassword(e.target.value)}
                />

                <Button type="submit" onClick={signin}>Signin</Button>

              </center>
            </form>
          
          </div>
      </Modal>








      <div className="app__header">
        <img
          className="app__header-img"
          src="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="Instagram Logo"
        />
      </div>

      { 
      !user ? (
        <div className="app__loginContainer">
                <Button onClick = { () => { setOpenSignin(true) }}>Sign in</Button> 
                <Button onClick = { () => { setOpen(true) }}>Sign up</Button> 
        </div>


      ): 
        <Button onClick = { () => auth.signOut() } >Logout</Button>
      }
      {
        posts.map(({id, post}) => {
          return <Post key={id} username={post.username} imageUrl={post.imageUrl} caption={post.caption} />
        })
      }


    {user?.displayName ? 
    <ImageUpload username={user.displayName}/> : 
    <h1>You have to login first to upload an image</h1>}

    </div>
  );
}

export default App;

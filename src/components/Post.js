import React from "react"
import { Avatar } from "@material-ui/core"

import '../styles/Post.css'

function Post({imageUrl, caption, username}){
    return(

        <div className="post">
            <div className="post__header">
                <Avatar 
                className="post__avatar"
                alt="Username"
                src="/static/images/avatar/1.jpg">

                </Avatar>
                <h3>{username}</h3>
            </div>
            <img 
            className="post__img"
            src={imageUrl}
            alt="Ronaldo"/>
            <h4 className="post__text"> <strong>{username}</strong> {caption}</h4>
        </div>

    )
}

export default Post
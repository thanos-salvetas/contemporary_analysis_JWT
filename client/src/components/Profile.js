import { useEffect } from "react"
import { useContext, useState } from "react"
import { UserContext } from "../context/ContextProvider"

const Profile = () => {

    const value = useContext(UserContext)

    useEffect(() => {
        console.log(value.user)
    })

    return (
        <div>
            <h1>Profile</h1>
        </div>
    )
}

export default Profile
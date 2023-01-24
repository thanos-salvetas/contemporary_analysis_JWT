import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/ContextProvider"

const Login = () => {

    const navigate = useNavigate()
    const value = useContext(UserContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const onPasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const submit = async (event) => {

        const response = await fetch('http://localhost:5000/users/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        })
        const data = await response.json()
        console.log(data)
        const user = {username: data['username'], token: data['token']}
        value.setUser(user)
        navigate('/profile')
    }

    return (
        <div>
            <h1>Login</h1>
            <label>Email:</label> <input type='text' onChange={onEmailChange} /><br />
            <label>Password:</label> <input type='password' onChange={onPasswordChange} /><br />
            <button onClick={submit}>Submit</button>
        </div>
    )
}

export default Login
import { Button, Input } from '@chakra-ui/react'
import { useState } from 'react'
import { useAuth } from 'contexts/FirebaseContext'

const Login = ({ onClose }) => {
    const [state, setState] = useState('login')


    return (
        <div>
            <h1 style={{ fontWeight: 'medium', fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                {state === "login" && 'Login'}
                {state === "signup" && 'Sign Up'}
            </h1>
            {state === 'login' && <LoginForm onClose={onClose} setState={setState} />}
            {state === 'signup' && <SignUpForm onClose={onClose} setState={setState} />}
            {state === 'loading' && <p>Loading ...</p>}
        </div>
    )
}

const LoginForm = ({ onClose, setState }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const { login } = useAuth()

    const handleLogin = async (e) => {
        e.preventDefault()
        setState('loading')

        try {
            await login(username, password)
            onClose()
        } catch {
            console.log('failed to login')
            setState('login')
        }
    }


    return (
        <form onSubmit={handleLogin}>
            <Input
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Username"
                style={{ marginBottom: '1em' }}
            />
            <Input
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
                style={{ marginBottom: '1em' }}
            />

            <div style={{
                display: 'flex',
                gap: '1em',
                width: '100%',
                justifyContent: 'center'
            }}>
                <Button onClick={onClose}>Cancel</Button>
                <Button colorScheme="blue" type="submit">Sign In</Button>
            </div>

            <p
                onClick={() => setState('signup')}
                style={{
                    textAlign: 'center',
                    margin: '1em 0',
                    fontSize: '.9em',
                    cursor: 'pointer'
                }}>
                Not a member? Sign Up!
            </p>
        </form>
    )
}


const SignUpForm = ({ onClose, setState }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const { signup } = useAuth()

    const handleSignUp = async (e) => {
        e.preventDefault()

        e.preventDefault()
        setState('loading')

        try {
            await signup(username, password)
            onClose()
        } catch {
            console.log('failed to login')
            setState('login')
        }
    }


    return (
        <form onSubmit={handleSignUp}>
            <Input
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Username"
                style={{ marginBottom: '1em' }}
            />
            <Input
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
                style={{ marginBottom: '1em' }}
            />

            <div style={{
                display: 'flex',
                gap: '1em',
                width: '100%',
                justifyContent: 'center'
            }}>
                <Button onClick={onClose}>Cancel</Button>
                <Button colorScheme="blue" type="submit">Sign Up</Button>
            </div>

            <p
                onClick={() => setState('login')}
                style={{
                    textAlign: 'center',
                    margin: '1em 0',
                    fontSize: '.9em',
                    cursor: 'pointer'
                }}>
                Sign In Instead
            </p>
        </form>
    )
}
export default Login
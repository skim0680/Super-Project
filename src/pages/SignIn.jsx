import { useState } from 'react'
import { auth } from '../firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export default function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSigningUp, setIsSigningUp] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        
        try {
            if (isSigningUp) {
                await createUserWithEmailAndPassword(auth, email, password)
            } else {
                await signInWithEmailAndPassword(auth, email, password)
            }
            navigate('/play') // Redirect to play page after successful sign in
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>
                    {isSigningUp ? 'Join the Conservation' : 'Welcome Back'}
                </h2>
                <p className="auth-subtitle">
                    {isSigningUp 
                        ? 'Start your journey to help endangered species' 
                        : 'Continue your conservation journey'}
                </p>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder={isSigningUp ? 'Create a password' : 'Enter your password'}
                            required
                        />
                    </div>
                    <button type="submit" className="auth-button">
                        {isSigningUp ? 'Create Account' : 'Sign In'} →
                    </button>
                </form>
                <button 
                    className="switch-auth-mode" 
                    onClick={() => setIsSigningUp(!isSigningUp)}
                >
                    {isSigningUp 
                        ? 'Already have an account? Sign In' 
                        : 'New to our mission? Join us'}
                </button>
            </div>
        </div>
    )
}
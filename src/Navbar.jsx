import { Link, useMatch, useResolvedPath } from "react-router-dom"
import { useState } from 'react'

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    return (
        <nav className="nav">
            <Link to="/" className="site-title">Last of Their Kind</Link>
            <ul>
                <CustomLink to="/play">Play</CustomLink>
                <CustomLink to="/collection">Collection</CustomLink>
                <CustomLink to="/help">Help</CustomLink>
                <CustomLink to="/about">About</CustomLink>
                {isLoggedIn ? (
                    <li className="account-button">
                        <Link to="/account">Account</Link>
                    </li>
                ) : (
                    <li className="sign-in-button">
                        <Link to="/signin">Sign In</Link>
                    </li>
                )}
            </ul>
        </nav>
    )
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
    
    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>{children}</Link>
        </li>
    )
}
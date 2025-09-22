import { Navigate } from 'react-router-dom'
import { auth } from '../firebase'

export default function ProtectedRoute({ children }) {
    if (!auth.currentUser) {
        // Redirect to sign in if not authenticated
        return <Navigate to="/signin" replace />
    }

    return children
}
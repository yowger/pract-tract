import { Link } from "react-router-dom"
import { useUser } from "@/features/auth/hooks/useUser"

const LandingPage = () => {
    const { data: user, isLoading } = useUser()

    if (isLoading) return <div>Loading...</div>

    return (
        <div className="landing-page">
            <h1>Welcome to My App</h1>
            <p>Manage internships, students, and more.</p>
            <div className="actions">
                {user ? (
                    <Link
                        to={
                            user.user.role === "student"
                                ? "/student/dashboard"
                                : user.user.role === "director"
                                ? "/director/dashboard"
                                : "/landing"
                        }
                        className="btn btn-primary"
                    >
                        Go to Dashboard
                    </Link>
                ) : (
                    <>
                        <Link to="/signin" className="btn btn-primary">
                            Sign In
                        </Link>
                        <Link to="/signup" className="btn btn-secondary">
                            Sign Up
                        </Link>
                    </>
                )}
            </div>
        </div>
    )
}

export default LandingPage

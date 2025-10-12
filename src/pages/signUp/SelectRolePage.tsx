import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

interface RoleSelectHandler {
    (role: string): void
}

const SelectRolePage = () => {
    const navigate = useNavigate()

    const handleSelect: RoleSelectHandler = (role) => {
        navigate(`/signup/${role}`)
    }

    return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
            <h1>Create Your Account</h1>
            <p>Select your role to continue:</p>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "1rem",
                }}
            >
                <Button onClick={() => handleSelect("student")}>
                    I’m a Student
                </Button>
                <Button onClick={() => handleSelect("agent")}>
                    I’m an Agent
                </Button>
                <Button onClick={() => handleSelect("advisor")}>
                    I’m an Advisor
                </Button>
            </div>
        </div>
    )
}

export default SelectRolePage

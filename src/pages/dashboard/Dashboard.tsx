import { Button } from "@mui/material"
import { useDispatch } from "react-redux"
import { Logout } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logOutHandler = () => {
        dispatch(Logout());
        navigate("/login");
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <Button onClick={logOutHandler}>LogOUt</Button>
        </div>



    )
}



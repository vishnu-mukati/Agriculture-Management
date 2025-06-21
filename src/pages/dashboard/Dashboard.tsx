import { Button, Typography } from "@mui/material"
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
            <Typography variant="h1" color="black">Dashboard</Typography>
            <Button onClick={logOutHandler}>LogOUt</Button>
        </div>



    )
}



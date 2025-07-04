import { Button, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { Logout } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../store/slices";

export const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logOutHandler = () => {
        dispatch(Logout());
        navigate("/login");
    }

    const fieldData = useSelector((state:RootState)=>state.list.fieldsListData);
    console.log(fieldData);

    return (

    



        <div>
            <Typography variant="h1" color="black">Dashboard</Typography>
            <Button onClick={logOutHandler}>LogOUt</Button>
        </div>



    )
}



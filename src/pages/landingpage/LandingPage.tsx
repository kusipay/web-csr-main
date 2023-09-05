import { useAuth } from "@/hooks/useAuth";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const { onLogin } = useAuth({
    onTokenSuccess: () => {
      navigate("/panel");
    }
  });

  return (
    <div>
      <Typography className="app">New change</Typography>
      <Button variant="contained" onClick={onLogin}>
        Login
      </Button>
    </div>
  );
};

export default LandingPage;

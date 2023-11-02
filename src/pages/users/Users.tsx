// import RegisterForm from "@/components/RegisterForm/RegisterForm";
import RegisterForm from "@/components/RegisterForm/RegisterForm";
import TableUsers from "@/components/tableUsers/TableUsers";
import { Box, Tabs, Tab } from "@mui/material";
import { useState } from "react";

function Users() {
  const [vista, setVista] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setVista(newValue);
  };
  return (
    <Box sx={{ width: "100%", padding: "2rem" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={vista}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            sx={{
              "&.Mui-selected": {
                backgroundColor: "#FFC629",
                color: "black",
                fontWeight: "bold"
              }
            }}
            label="Tabla de usuarios"
          />
          <Tab
            sx={{
              "&.Mui-selected": {
                backgroundColor: "#FFC629",
                color: "black",
                fontWeight: "bold"
              }
            }}
            label="Formulario de registro"
          />
        </Tabs>
      </Box>
      {vista === 1 && <RegisterForm />}
      {vista === 0 && <TableUsers />}
    </Box>
  );
}

export default Users;

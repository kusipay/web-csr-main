import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUsers } from "@/services/userService";
import { setUsers } from "@/redux/slices/userSlice";
import { StateStore } from "../../redux/store";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
// import { adapterUser } from "@/adapters/userAdapter";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Nombre",
    width: 150,
    editable: true
  },
  {
    field: "phone",
    headerName: "Celular",
    width: 150,
    editable: true
  },
  {
    field: "codeLoan",
    headerName: "Código de préstamos",
    width: 150,
    editable: true
  },
  {
    field: "monthlyPayment",
    headerName: "Cuota Mensual",
    width: 150,
    editable: true
  },
  {
    field: "currency",
    headerName: "Moneda",
    width: 100,
    editable: true
  },
  {
    field: "endAt",
    headerName: "Fecha de término",
    width: 150,
    editable: true
  },

  {
    field: "startAt",
    headerName: "Fecha de inicio",
    width: 150,
    editable: true
  }
];

const TableUsers: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: StateStore) => state.users.users);
  useEffect(() => {
    const loadUsers = async () => {
      const usersFromDb = await getUsers();
      // const adaptedUsers = usersFromDb.map(adapterUser);
      dispatch(setUsers(usersFromDb));
    };

    loadUsers();
  }, [dispatch]);

  const transformedUsers = users.map((user) => ({
    ...user,
    startAt: user.startAt ? new Date(user.startAt).toLocaleDateString() : null,
    endAt: user.endAt ? new Date(user.endAt).toLocaleDateString() : null
  }));

  return (
    <Box sx={{ margin: "2rem" }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ textAlign: "center", margin: " 1.5rem 0" }}
      >
        Tabla de usuarios
      </Typography>
      <DataGrid
        rows={transformedUsers}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5
            }
          }
        }}
        pageSizeOptions={[5]}
      />
    </Box>
  );
};

export default TableUsers;

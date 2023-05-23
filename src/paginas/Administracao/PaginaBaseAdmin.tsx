import {
  AppBar,
  Box,
  Button,
  Typography,
  Link,
  Container,
  Toolbar,
  Paper,
} from "@mui/material";
import { Link as LinkDom, Outlet } from "react-router-dom";

const PaginaBaseAdmin = () => {
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <Typography variant="h6">Administração</Typography>
            <Box sx={{ display: "flex", flexGow: 1 }}>
              <Link component={LinkDom} to="/admin/restaurantes">
                <Button sx={{ my: 2, color: "white" }}>Restaurantes</Button>
              </Link>
              <Link component={LinkDom} to="/admin/restaurantes/novo">
                <Button sx={{ my: 2, color: "white" }}>
                  Novo Restaurantes
                </Button>
              </Link>
              <Link component={LinkDom} to="/admin/pratos">
                <Button sx={{ my: 2, color: "white" }}>Pratos</Button>
              </Link>
              <Link component={LinkDom} to="/admin/pratos/novo">
                <Button sx={{ my: 2, color: "white" }}>Novo Pratos</Button>
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box>
        <Container maxWidth="lg" sx={{ mt: 1 }}>
          <Paper sx={{ p: 2 }}>
            <Outlet />
          </Paper>
        </Container>
      </Box>
    </>
  );
};
export default PaginaBaseAdmin;

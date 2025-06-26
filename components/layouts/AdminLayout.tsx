import { ReactNode } from "react";
import { Container, Box } from "@mui/material";
import AdminNavbar from "@/components/AdminNavbar";

interface Props {
  children: ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  return (
    <>
      <AdminNavbar />
      <Box sx={{ mt: 3 }}>
        <Container maxWidth="lg">{children}</Container>
      </Box>
    </>
  );
};

export default AdminLayout;

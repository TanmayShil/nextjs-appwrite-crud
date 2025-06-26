import { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { account } from "@/hooks/utils/appwrite";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { AuthUser } from "@/typescript/interface";

const AdminNavbar = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await account.get();
        setUser({ name: userData.name, email: userData.email });
      } catch (err) {
        router.push("/login");
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await account.deleteSession("current");
    Cookies.remove("session");
    router.push("/login");
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          Admin Panel
        </Typography>
        {user && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="h6">
              {user.name ?? "User"} ({user.email})
            </Typography>
            <IconButton color="inherit" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;

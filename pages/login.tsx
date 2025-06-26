import { useState } from "react";
import { account } from "@/hooks/utils/appwrite";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import {
  Box, Button, Container, TextField, Typography, Paper
} from "@mui/material";
import { AuthFormData } from "@/typescript/interface";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    password: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const session = await account.createEmailPasswordSession( formData.email, formData.password);
      Cookies.set("session", session.$id); 
      router.push("/admin");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <Box component="form" onSubmit={handleLogin}>
          <TextField
            fullWidth label="Email" margin="normal" value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })} required
          />
          <TextField
            fullWidth label="Password" type="password" margin="normal"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })} required
          />
          <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>
            Login
          </Button>
          <Button
            fullWidth variant="text" sx={{ mt: 1 }}
            onClick={() => router.push("/signup")}
          >
            Don't have an account? Sign up
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

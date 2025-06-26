import { useState } from "react";
import { account, ID } from "@/hooks/utils/appwrite";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import Cookies from "js-cookie";
import { AuthFormData } from "@/typescript/interface";

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState<AuthFormData>({
    name: "",
    email: "",
    password: "",
  });

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await account.create(ID.unique(), formData.email, formData.password);
      const session = await account.createEmailPasswordSession(
        formData.email,
        formData.password
      );
      Cookies.set("session", session.$id);
      router.push("/admin");
      //   alert("Account created! Please login.");
      //   router.push("/login");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSignup}>
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
          <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>
            Sign Up
          </Button>
          <Button
            fullWidth
            variant="text"
            sx={{ mt: 1 }}
            onClick={() => router.push("/login")}
          >
            Back to Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

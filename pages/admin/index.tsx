import React, { useEffect, useState } from "react";
import Table from "@/components/Table";
import { Container, Typography, CircularProgress, Box } from "@mui/material";
import { databases } from "@/hooks/utils/appwrite";

const columns = [
  { id: "name", label: "Product Name" },
  { id: "description", label: "Description" },
  { id: "image", label: "Image" },
];

export default function Admin() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!
      );
      setRows(res.documents);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      await databases.deleteDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,
        id
      );
      // remove from UI
      setRows((prev) => prev.filter((row) => row.$id !== id));
    } catch (err) {
      console.error("Error deleting document:", err);
      alert("Failed to delete product.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log("image", `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID}/files/685d3111003dc8f9b64e/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`)

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      {loading ? (
        <Box>
        <CircularProgress />
        </Box>
      ) : (
        <Table columns={columns} rows={rows} onDelete={handleDelete} />
      )}
    </Container>
  );
}

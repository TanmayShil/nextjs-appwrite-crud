import React from "react";
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";

interface Column {
  id: string;
  label: string;
}

interface TableProps {
  columns: Column[];
  rows: Record<string, any>[];
  onDelete: (id: string) => void;
}

const Table: React.FC<TableProps> = ({ columns, rows, onDelete }) => {
  const router = useRouter();

  const getImageUrl = (imageId: string) => {
    return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID}/files/${imageId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;
  };

  return (
    <TableContainer component={Paper}>
      <MuiTable>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col.id}>{col.label}</TableCell>
            ))}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.$id}>
              {columns.map((col) => (
                <TableCell key={col.id}>
                  {col.id === "image" ? (
                    <Box
                      component="img"
                      src={getImageUrl(row[col.id])}
                      alt={row.name}
                      sx={{
                        width: 60,
                        height: 60,
                        objectFit: "cover",
                        borderRadius: 1,
                      }}
                    />
                  ) : (
                    row[col.id]
                  )}
                </TableCell>
              ))}
              <TableCell>
                <IconButton
                  onClick={() => router.push(`/admin/add/${row.$id}`)}
                  color="primary"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => onDelete(row.$id)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export default Table;

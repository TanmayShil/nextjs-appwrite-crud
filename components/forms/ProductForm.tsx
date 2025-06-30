import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  IconButton,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ProductFormData, Product } from "@/typescript/interface";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface Props {
  onSubmit: (data: ProductFormData, resetForm: () => void) => void;
  defaultValues?: Product | null;
  isEdit?: boolean;
}

const schema = yup.object().shape({
  name: yup.string().required("Product name is required"),
  description: yup.string().required("Description is required"),
  // image: yup.mixed().test("fileRequired", "Image is required", (value, ctx) => {
  //   if (ctx.options.context?.isEdit) return true;
  //   return value && value.length > 0;
  // }),
});

export default function ProductForm({
  onSubmit,
  defaultValues,
  isEdit,
}: Props) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: yupResolver(schema, { context: { isEdit } }),
  });

  const imageWatch = watch("image");
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (defaultValues) {
      setValue("name", defaultValues.name);
      setValue("description", defaultValues.description);
      // if (defaultValues.image) setPreview(defaultValues.image);
      if(defaultValues.image){
        setPreview(`${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID}/files/${defaultValues.image}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`)
      }
    }
  }, [defaultValues]);
  

  useEffect(() => {
    if (imageWatch && imageWatch.length > 0) {
      const file = imageWatch[0];
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  }, [imageWatch]);

  const handleFormSubmit = (data: ProductFormData) => {
    onSubmit(data, () => {
      reset();
      setPreview(null);
    });
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <IconButton onClick={() => router.push("/admin")}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" gutterBottom>
          {isEdit ? "Edit Product" : "Add Product"}
        </Typography>
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit(handleFormSubmit)}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          label="Product Name"
          fullWidth
          margin="normal"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          {...register("description")}
          error={!!errors.description}
          helperText={errors.description?.message}
        />
        <Button variant="outlined" component="label" fullWidth sx={{ mt: 2 }}>
          Upload Image
          <input type="file" accept="image/*" hidden {...register("image")} />
        </Button>
        {errors.image && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            {errors.image.message}
          </Typography>
        )}
        {preview && (
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <img
              src={preview}
              alt="Preview"
              style={{ maxHeight: "200px", objectFit: "contain" }}
            />
          </Box>
        )}
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
          {isEdit ? "Update Product" : "Add Product"}
        </Button>
      </Box>
    </Paper>
  );
}

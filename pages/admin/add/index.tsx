import { Container } from "@mui/material";
import { ProductFormData } from "@/typescript/interface";
import { ID } from "appwrite";
import { databases, storage } from "@/hooks/utils/appwrite";
import ProductForm from "@/components/forms/ProductForm";
import { useRouter } from "next/router";

export default function AddProductPage() {
   const router = useRouter();
  const onSubmit = async (data: ProductFormData, resetForm: () => void) => {
    try {
      const file = data.image[0];
      const uploaded = await storage.createFile(
        process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
        ID.unique(),
        file
      );
    //   const imageUrl = storage.getFilePreview(
    //     process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
    //     uploaded.$id
    //   );

      await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,
        ID.unique(),
        {
          name: data.name,
          description: data.description,
          image: uploaded.$id,
        }
      );

      alert("✅ Product added successfully!");
      resetForm();
      router.push("/admin");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add product.");
    }
  };
  return (
    <Container maxWidth="sm">
      <ProductForm onSubmit={onSubmit} />
    </Container>
  );
}

// import {
//   Box,
//   Button,
//   Container,
//   Paper,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { ProductFormData } from "@/typescript/interface";
// import { ID } from "appwrite";
// import { databases, storage } from "@/hooks/utils/appwrite";
// import { useState } from "react";

// const schema = yup.object().shape({
//   name: yup.string().required("Product name is required"),
//   description: yup.string().required("Description is required"),
//   image: yup.mixed().test("fileRequired", "Image is required", (value) => {
//     return value && value.length > 0;
//   }),
// });

// export default function Add() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//     reset,
//   } = useForm<ProductFormData>({
//     resolver: yupResolver(schema),
//   });

//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);

//   const onSubmit = async (data: ProductFormData) => {
//     const file = data.image[0];

//     try {
//       const uploadedFile = await storage.createFile(
//         process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
//         ID.unique(),
//         file
//       );

//     //   const imageUrl = storage.getFilePreview(
//     //     process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
//     //     uploadedFile.$id
//     //   );
//     //   console.log("imageurl", imageUrl);

//       await databases.createDocument(
//         process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
//         process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,
//         ID.unique(),
//         {
//           name: data.name,
//           description: data.description,
//           image: uploadedFile.$id,
//         }
//       );

//       alert("✅ Product added successfully!");
//       setPreviewUrl(null);
//       reset();
//     } catch (err) {
//       console.error(err);
//       alert("❌ Failed to add product.");
//     }
//   };

//   // Handle image change
//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setValue("image", e.target.files as any);
//       setPreviewUrl(URL.createObjectURL(file));
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Paper sx={{ p: 4 }}>
//         <Typography variant="h5" gutterBottom>
//           Add Product
//         </Typography>
//         <Box
//           component="form"
//           onSubmit={handleSubmit(onSubmit)}
//           noValidate
//           sx={{ mt: 2 }}
//         >
//           <TextField
//             label="Product Name"
//             fullWidth
//             margin="normal"
//             {...register("name")}
//             error={!!errors.name}
//             helperText={errors.name?.message}
//           />
//           <TextField
//             label="Description"
//             fullWidth
//             multiline
//             rows={4}
//             margin="normal"
//             {...register("description")}
//             error={!!errors.description}
//             helperText={errors.description?.message}
//           />
//           <Button variant="outlined" component="label" fullWidth sx={{ mt: 2 }}>
//             Upload Image
//             <input
//               type="file"
//               accept="image/*"
//               hidden
//               onChange={handleImageChange}
//             />
//           </Button>
//           {errors.image && (
//             <Typography color="error" variant="body2" sx={{ mt: 1 }}>
//               {errors.image.message}
//             </Typography>
//           )}

//           {previewUrl && (
//             <Box
//               component="img"
//               src={previewUrl}
//               alt="Preview"
//               sx={{
//                 width: "100%",
//                 height: 200,
//                 objectFit: "cover",
//                 mt: 2,
//                 borderRadius: 2,
//                 boxShadow: 1,
//               }}
//             />
//           )}
//           <Button variant="contained" type="submit" fullWidth sx={{ mt: 3 }}>
//             Add Product
//           </Button>
//         </Box>
//       </Paper>
//     </Container>
//   );
// }

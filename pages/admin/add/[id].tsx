import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProductForm from "@/components/forms/ProductForm";
import { databases, storage } from "@/hooks/utils/appwrite";
import { ProductFormData, Product } from "@/typescript/interface";
import { Container } from "@mui/material";

const DB_ID = "products_db";
const COLLECTION_ID = "products";
const BUCKET_ID = "product_images";

export default function EditProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      databases
        .getDocument(DB_ID, COLLECTION_ID, id as string)
        .then((res) => {
          setProduct(res as Product);
        })
        .catch(() => {
          //   alert("Product not found");
          router.push("/admin");
        });
    }
  }, [id]);

  const onSubmit = async (data: ProductFormData) => {
    try {
      let imageUrl = product?.image ?? "";

      if (data.image && data.image.length > 0) {
        const file = data.image[0];
        const uploaded = await storage.createFile(
          process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
          "file_" + Date.now(),
          file
        );
        imageUrl = storage.getFilePreview(
          process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
          uploaded.$id
        );
      }

      await databases.updateDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,
        id as string,
        {
          name: data.name,
          description: data.description,
          image: imageUrl,
        }
      );

      alert("✅ Product updated!");
      router.push("/admin");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update.");
    }
  };

  return (
    <Container maxWidth="sm">
      <ProductForm onSubmit={onSubmit} defaultValues={product} isEdit />
    </Container>
  );
}

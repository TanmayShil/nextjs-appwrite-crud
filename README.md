# 🛍️ Next.js Admin Panel with Appwrite, MUI, and TypeScript

This is a full-featured **Admin Panel** built using:

- 🧑‍💻 **Next.js + TypeScript**
- 🎨 **Material UI (MUI) with custom theme**
- 🔐 **Authentication (Login/Signup)**
- 📦 **CRUD operations** using **Appwrite** (Database + Storage)
- 📂 **Admin-protected routes** using middleware
- 🖼️ **Image upload with preview** + Lottie animations
- 🍪 **Session token stored in cookies**

---

## ✨ Features

- 🔐 **Signup / Login**
- 👨‍💼 **Admin-Only Panel** (`/admin`)
- 📋 **Product Management**
  - Create product
  - Edit product
  - Delete product
  - Image upload (via Appwrite Storage)
- ✅ **Form validation** using `react-hook-form` + `yup`
- 📁 **Image preview before upload**
- 🌈 Custom **MUI Theme**

---

## 🔧 Tech Stack

| Tool | Purpose |
|------|---------|
| [Next.js](https://nextjs.org/) | React Framework |
| [TypeScript](https://www.typescriptlang.org/) | Static Typing |
| [Appwrite](https://appwrite.io/) | Auth, DB, Storage |
| [Material UI](https://mui.com/) | UI Components |
| [react-hook-form](https://react-hook-form.com/) | Form Handling |
| [Yup](https://github.com/jquense/yup) | Form Validation |
| [react-lottie](https://www.npmjs.com/package/react-lottie) | Lottie Animations |
| [js-cookie](https://github.com/js-cookie/js-cookie) | Cookie-based session |
| @mui/icons-material | MUI Icon Pack |

---

## 📁 Project Structure

<pre><code>
my-admin-panel/
├── components/
│ ├── AdminNavbar.tsx
│ ├── forms/ProductForm.tsx
│ └── layouts/AdminLayout.tsx
├── pages/
│ ├── login.tsx
│ ├── signup.tsx
│ └── admin/
│ ├── index.tsx # Product List
│ └── add/
│ ├── index.tsx # Add Product
│ └── [id].tsx # Edit Product
├── typescript/
│ ├── interface.ts
│ └── type.ts
├── utils/
│ ├── appwrite.ts
│ └── auth.ts
├── middleware.ts
├── mui-theme/ # Custom MUI theme setup
│ ├── _muiPalette.ts # Theme color logic
│ ├── _muiTheme.ts # Complete theme config
│ └── MuiThemeProvider.tsx # Theme provider component
├── public/ # Static assets (favicon, images, etc.)
├── styles/ # Global styles (optional)
├── tsconfig.json # TypeScript config
├── next.config.js # Next.js config
└── README.md # Project documentation
</code></pre>

## 🛠️ Installation

```bash
git clone https://github.com/TanmayShil/nextjs-appwrite-crud.git
npm install
```

---

## 2. Set Up Appwrite
- Create a Project, Database, Collection, and Storage Bucket in Appwrite
- Add environment variables:
## 📄 .env.local

```bash
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT=your_project_id
NEXT_PUBLIC_APPWRITE_DATABASE=products_db
NEXT_PUBLIC_APPWRITE_COLLECTION=products
NEXT_PUBLIC_APPWRITE_BUCKET=product_images
```

---

## 🔐 Admin Route Protection

- All /admin/* routes are protected using middleware.ts
- Tokens are stored in cookies using js-cookie
- If user is not logged in, they’re redirected to /login

---

## 📸 Product Schema

Database Collection: products

| Field       | Type                      |
| ----------- | ------------------------- |
| name        | string                    |
| description | string                    |
| image       | string (URL from Storage) |

Storage Bucket: product_images

---

## 📦 Commands

| Command         | Description          |
| --------------- | -------------------- |
| `npm run dev`   | Start development    |
| `npm run build` | Build for production |

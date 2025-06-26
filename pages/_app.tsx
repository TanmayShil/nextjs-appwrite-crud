import AdminLayout from "@/components/layouts/AdminLayout";
import MuiThemeProvider from "@/mui-theme/MuiThemeProvider";
// import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isAdminRoute = router.pathname.startsWith("/admin");

  const content = isAdminRoute ? (
    <AdminLayout>
      <Component {...pageProps} />
    </AdminLayout>
  ) : (
    <Component {...pageProps} />
  );

  return (
    <MuiThemeProvider>
      {content}
      {/* <Component {...pageProps} /> */}
    </MuiThemeProvider>
  );
}

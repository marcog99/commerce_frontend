import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./app/PrivateRoute";
import Login from "./app/modules/admin/auth/Login";
import AdminLayout from "./app/modules/admin/layout";
import AdminDashboard from "./app/modules/admin/page";
import ClientLayout from "./app/modules/client/layout";
import ClientDashboard from "./app/modules/client/page";
import ProductAdmin from "./app/modules/admin/products/Product-admin";
import CategoryAdmin from "./app/modules/admin/categories/Categories-admin";
import { useEffect, useState } from "react";
import {
  SnackbarEvents,
  SnackbarPayload,
} from "./app/core/utils/snackbar-events";
import Snackbar from "./app/shared/components/snackbar";
import Register from "./app/modules/admin/auth/Register";
import ListProduct from "./app/modules/client/list-products/list-product";
import ProductDetailPage from "./app/modules/client/list-products/Product-view";

function App() {
  const [snack, setSnack] = useState<SnackbarPayload | null>(null);

  useEffect(() => {
    SnackbarEvents.subscribe(setSnack);
    return () => SnackbarEvents.unsubscribe();
  }, []);

  const handleSnackbarClose = () => {
    setSnack(null);
  };

  return (
    <Router>
      <Snackbar
        message={snack?.message || null}
        type={snack?.type || "info"}
        onClose={handleSnackbarClose}
      />
      <Routes>
        <Route
          path="/"
          element={<ClientLayout children={<ClientDashboard />} />}
        />
        <Route path="/login" element={<ClientLayout children={<Login />} />} />
        <Route
          path="/register"
          element={<ClientLayout children={<Register />} />}
        />

        <Route
          path="/products"
          element={<ClientLayout children={<ListProduct />} />}
        />

        <Route
          path="/products/:id"
          element={<ClientLayout children={<ProductDetailPage />} />}
        />


        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <ClientLayout
                children={<AdminLayout children={<AdminDashboard />} />}
              ></ClientLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <PrivateRoute>
              <ClientLayout
                children={<AdminLayout children={<ProductAdmin />} />}
              ></ClientLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <PrivateRoute>
              <ClientLayout
                children={<AdminLayout children={<CategoryAdmin />} />}
              ></ClientLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

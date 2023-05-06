import { Route, defer, useRoutes } from 'react-router-dom';
import DefaultLayout from '../layouts/DefaultLayout';
import AuthLayout from '../layouts/AuthLayout';
import LoginPage from '../views/LoginPage';
import RegisterPage from '../views/RegisterPage';
import OrdersPage from '../views/OrdersPage';
import CustomersPage from '../views/CustomersPage';
import OrderPage from '../views/OrderPage';
import InventoryPage from '../views/InventoryPage';
import { getOrderById } from '../repository/order';

const routesJSX = (
  <Route>
    <Route path="/" element={<DefaultLayout />}>
      <Route
        path="orders/:id"
        element={<OrderPage />}
        loader={({ params }) => {
          const order = getOrderById(params.id);
          return defer({ order });
        }}
      />
      <Route path="orders" element={<OrdersPage />} />
      <Route path="customers" element={<CustomersPage />} />
      <Route path="inventory" element={<InventoryPage />} />
    </Route>
    <Route path="/auth" element={<AuthLayout />}>
      <Route path="" element={<LoginPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
    </Route>
  </Route>
);

export default routesJSX;
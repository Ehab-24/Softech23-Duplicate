import { Route, defer, redirect } from 'react-router-dom';
import DefaultLayout from '../layouts/DefaultLayout';
import AuthLayout from '../layouts/AuthLayout';
import LoginPage from '../views/LoginPage';
import RegisterPage from '../views/RegisterPage';
import OrdersPage from '../views/OrdersPage';
import CustomersPage from '../views/CustomersPage';
import OrderPage from '../views/OrderPage';
import InventoryPage from '../views/InventoryPage';
import { getOrderById } from '../repository/order';
import { getInventoryItemById } from '../repository/inventory';
import ItemPage from '../views/ItemPage';
import ErrorFallback from './ErrorFallback';
import { useCookies } from 'react-cookie';

const routesJSX = (
  <Route>
    <Route path="/" element={<DefaultLayout />}>
      <Route
        path="orders/:id"
        element={<OrderPage />}
        errorElement={<ErrorFallback />}
      />
      <Route path="orders" element={<OrdersPage />} />
      <Route path="customers" element={<CustomersPage />} />
      <Route path="" element={<InventoryPage />} />
      <Route path="inventory" element={<InventoryPage />} />
      <Route
        path="inventory/:id"
        element={<ItemPage />}
        loader={({ params }) => {
          const item = getInventoryItemById(params.id);
          return defer({ item });
        }}
        errorElement={<ErrorFallback />}
      />
    </Route>
    <Route path="/auth" element={<AuthLayout />}>
      <Route path="" element={<LoginPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
    </Route>
  </Route>
);

export default routesJSX;

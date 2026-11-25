import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '@views/Login';
import { EmployeeDashboard } from '@views/EmployeeDashboard';
import { ManagerDashboard } from '@views/ManagerDashboard';
import { VacationList } from '@views/VacationList';
import { CreateVacation } from '@views/CreateVacation';
import { UserList } from '@views/UserList';
import { UserForm } from '@views/UserForm';
import { NotFound } from '@views/NotFound';
import { ProtectedRoute } from '@components/ProtectedRoute';
import { useAuth } from '@hooks/useAuth';

const DashboardRedirect = () => {
  const { user } = useAuth();

  if (user?.role === 'manager') {
    return <Navigate to="/dashboard/manager" replace />;
  }

  return <Navigate to="/dashboard" replace />;
};

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardRedirect />
          </ProtectedRoute>
        }
      />

      {/* Employee Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute requiredRole="employee">
            <EmployeeDashboard />
          </ProtectedRoute>
        }
      />

      {/* Manager Routes */}
      <Route
        path="/dashboard/manager"
        element={
          <ProtectedRoute requiredRole="manager">
            <ManagerDashboard />
          </ProtectedRoute>
        }
      />

      {/* Shared Vacation Routes (both employee and manager can access) */}
      <Route
        path="/vacations"
        element={
          <ProtectedRoute>
            <VacationList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/vacations/new"
        element={
          <ProtectedRoute requiredRole="employee">
            <CreateVacation />
          </ProtectedRoute>
        }
      />

      {/* Manager Only Routes */}
      <Route
        path="/users"
        element={
          <ProtectedRoute requiredRole="manager">
            <UserList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/users/new"
        element={
          <ProtectedRoute requiredRole="manager">
            <UserForm />
          </ProtectedRoute>
        }
      />

      <Route
        path="/users/:id/edit"
        element={
          <ProtectedRoute requiredRole="manager">
            <UserForm />
          </ProtectedRoute>
        }
      />

      {/* 404 - Catch all unmatched routes */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

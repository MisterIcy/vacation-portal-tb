/** @jsxImportSource @emotion/react */
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from '@emotion/react';
import { getVacations } from '@domains/vacations/api';
import { getUsers } from '@domains/users/api';
import { Layout } from '@components/Layout';
import type { Theme } from '@styles/theme';
import { managerDashboardStyles } from './ManagerDashboard.styles';

export const ManagerDashboard = () => {
  const theme = useTheme() as Theme;
  const { data: vacations } = useQuery({
    queryKey: ['vacations'],
    queryFn: getVacations,
  });

  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  const pendingCount = vacations?.filter(v => v.status === 'pending').length || 0;
  const totalUsers = users?.length || 0;
  const employeeCount = users?.filter(u => u.role === 'employee').length || 0;

  return (
    <Layout>
      <div css={managerDashboardStyles(theme)}>
        <div className="manager-dashboard__welcome">
          <h2 className="manager-dashboard__title">Manager Dashboard</h2>
          <p className="manager-dashboard__description">
            Manage vacation requests, users, and oversee team operations.
          </p>
        </div>

        <div className="manager-dashboard__stats">
          <div className="manager-dashboard__stat-card">
            <div className="manager-dashboard__stat-label">Pending Requests</div>
            <div className="manager-dashboard__stat-value">{pendingCount}</div>
          </div>
          <div className="manager-dashboard__stat-card">
            <div className="manager-dashboard__stat-label">Total Users</div>
            <div className="manager-dashboard__stat-value">{totalUsers}</div>
          </div>
          <div className="manager-dashboard__stat-card">
            <div className="manager-dashboard__stat-label">Employees</div>
            <div className="manager-dashboard__stat-value">{employeeCount}</div>
          </div>
        </div>

        <div className="manager-dashboard__actions">
          <div className="manager-dashboard__action-card">
            <h3 className="manager-dashboard__action-title">Vacation Requests</h3>
            <p className="manager-dashboard__action-description">
              Review and approve or reject pending vacation requests from your team.
            </p>
            <Link to="/vacations" className="manager-dashboard__action-button">
              View Requests
            </Link>
          </div>

          <div className="manager-dashboard__action-card">
            <h3 className="manager-dashboard__action-title">Manage Users</h3>
            <p className="manager-dashboard__action-description">
              Add, edit, or remove users from the system.
            </p>
            <Link to="/users" className="manager-dashboard__action-button">
              Manage Users
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

/** @jsxImportSource @emotion/react */
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from '@emotion/react';
import { getVacations } from '@domains/vacations/api';
import { Layout } from '@components/Layout';
import type { Theme } from '@styles/theme';
import { employeeDashboardStyles } from './EmployeeDashboard.styles';

export const EmployeeDashboard = () => {
  const theme = useTheme() as Theme;
  const { data: vacations, isLoading } = useQuery({
    queryKey: ['vacations'],
    queryFn: getVacations,
  });

  const pendingCount = vacations?.filter(v => v.status === 'pending').length || 0;
  const approvedCount = vacations?.filter(v => v.status === 'approved').length || 0;
  const rejectedCount = vacations?.filter(v => v.status === 'rejected').length || 0;

  return (
    <Layout>
      <div css={employeeDashboardStyles(theme)}>
        <div className="employee-dashboard__welcome">
          <h2 className="employee-dashboard__title">
            Welcome to Your Dashboard
          </h2>
          <p className="employee-dashboard__description">
            Manage your vacation requests, view their status, and request new time off.
          </p>
          <Link to="/vacations/new" className="employee-dashboard__action-button">
            Request New Vacation
          </Link>
        </div>

        {!isLoading && (
          <div className="employee-dashboard__stats">
            <div className="employee-dashboard__stat-card">
              <div className="employee-dashboard__stat-label">
                Pending Requests
              </div>
              <div className="employee-dashboard__stat-value">
                {pendingCount}
              </div>
            </div>
            <div className="employee-dashboard__stat-card">
              <div className="employee-dashboard__stat-label">
                Approved Requests
              </div>
              <div className="employee-dashboard__stat-value">
                {approvedCount}
              </div>
            </div>
            <div className="employee-dashboard__stat-card">
              <div className="employee-dashboard__stat-label">
                Rejected Requests
              </div>
              <div className="employee-dashboard__stat-value">
                {rejectedCount}
              </div>
            </div>
            <div className="employee-dashboard__stat-card">
              <div className="employee-dashboard__stat-label">
                Total Requests
              </div>
              <div className="employee-dashboard__stat-value">
                {vacations?.length || 0}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

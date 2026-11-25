/** @jsxImportSource @emotion/react */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTheme } from '@emotion/react';
import type { Theme } from '@styles/theme';
import { getVacations, deleteVacation, approveVacation, rejectVacation } from '@domains/vacations/api';
import { Layout } from '@components/Layout';
import { useAuth } from '@hooks/useAuth';
import { formatDate } from '@utils/dateFormat';
import { vacationListStyles } from './VacationList.styles';

export const VacationList = () => {
  const theme = useTheme() as Theme;
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  const { data: vacations, isLoading } = useQuery({
    queryKey: ['vacations'],
    queryFn: getVacations,
    enabled: isAuthenticated,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteVacation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vacations'] });
    },
  });

  const approveMutation = useMutation({
    mutationFn: approveVacation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vacations'] });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: rejectVacation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vacations'] });
    },
  });

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this vacation request?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleApprove = (id: number) => {
    approveMutation.mutate(id);
  };

  const handleReject = (id: number) => {
    rejectMutation.mutate(id);
  };

  const isManager = user?.role === 'manager';

  return (
    <Layout>
      <div css={vacationListStyles(theme)}>
        <div className="vacation-list__header">
          <h2 className="vacation-list__title">
            {isManager ? 'Vacation Requests' : 'My Vacation Requests'}
          </h2>
        </div>

        {isLoading ? (
          <div className="vacation-list__loading-state">Loading vacations...</div>
        ) : vacations && vacations.length > 0 ? (
          <table className="vacation-list__table">
            <thead className="vacation-list__table-head">
              <tr>
                {isManager && <th className="vacation-list__th">Employee</th>}
                <th className="vacation-list__th">From</th>
                <th className="vacation-list__th">To</th>
                <th className="vacation-list__th">Reason</th>
                <th className="vacation-list__th">Status</th>
                <th className="vacation-list__th">Submitted</th>
                <th className="vacation-list__th">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vacations.map((vacation) => (
                <tr key={vacation.id}>
                  {isManager && <td className="vacation-list__td" data-label="Employee">{vacation.user?.name || 'Unknown'}</td>}
                  <td className="vacation-list__td" data-label="From">{formatDate(vacation.from)}</td>
                  <td className="vacation-list__td" data-label="To">{formatDate(vacation.to)}</td>
                  <td className="vacation-list__td" data-label="Reason">{vacation.reason}</td>
                  <td className="vacation-list__td" data-label="Status">
                    <span className={`vacation-list__status-badge vacation-list__status-badge--${vacation.status}`}>
                      {vacation.status.charAt(0).toUpperCase() + vacation.status.slice(1)}
                    </span>
                  </td>
                  <td className="vacation-list__td" data-label="Submitted">{formatDate(vacation.created_at)}</td>
                  <td className="vacation-list__td">
                    {isManager && vacation.status === 'pending' && (
                      <>
                        <button
                          className="vacation-list__button vacation-list__button--approve"
                          onClick={() => handleApprove(vacation.id)}
                          disabled={approveMutation.isPending}
                        >
                          Approve
                        </button>
                        <button
                          className="vacation-list__button vacation-list__button--reject"
                          onClick={() => handleReject(vacation.id)}
                          disabled={rejectMutation.isPending}
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {!isManager && vacation.status === 'pending' && (
                      <button
                        className="vacation-list__button vacation-list__button--delete"
                        onClick={() => handleDelete(vacation.id)}
                        disabled={deleteMutation.isPending}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="vacation-list__empty-state">
            No vacation requests found.
          </div>
        )}
      </div>
    </Layout>
  );
};

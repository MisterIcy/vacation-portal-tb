/** @jsxImportSource @emotion/react */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import type { Theme } from '@styles/theme';
import { getUsers, deleteUser } from '@domains/users/api';
import { Layout } from '@components/Layout';
import { useAuth } from '@hooks/useAuth';
import { formatDate } from '@utils/dateFormat';
import { userListStyles } from './UserList.styles';

export const UserList = () => {
  const theme = useTheme() as Theme;
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();

  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    enabled: isAuthenticated,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const handleDelete = (id: number, name: string) => {
    if (window.confirm(`Are you sure you want to delete user "${name}"?`)) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <Layout>
      <div css={userListStyles(theme)}>
        <div className="user-list__header">
          <h2 className="user-list__title">Manage Users</h2>
          <Link to="/users/new" className="user-list__add-button">
            Add New User
          </Link>
        </div>

        {isLoading ? (
          <div className="user-list__loading-state">Loading users...</div>
        ) : users && users.length > 0 ? (
          <table className="user-list__table">
            <thead className="user-list__table-head">
              <tr>
                <th className="user-list__th">Name</th>
                <th className="user-list__th">Email</th>
                <th className="user-list__th">Employee Code</th>
                <th className="user-list__th">Role</th>
                <th className="user-list__th">Created</th>
                <th className="user-list__th">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="user-list__td" data-label="Name">{user.name}</td>
                  <td className="user-list__td" data-label="Email">{user.email}</td>
                  <td className="user-list__td" data-label="Employee Code">{user.employee_code}</td>
                  <td className="user-list__td" data-label="Role">
                    <span className={`user-list__role-badge user-list__role-badge--${user.role}`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="user-list__td" data-label="Created">{formatDate(user.created_at)}</td>
                  <td className="user-list__td">
                    <Link
                      to={`/users/${user.id}/edit`}
                      className="user-list__button user-list__button--edit"
                    >
                      Edit
                    </Link>
                    <button
                      className="user-list__button user-list__button--delete"
                      onClick={() => handleDelete(user.id, user.name)}
                      disabled={deleteMutation.isPending}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="user-list__empty-state">
            No users found.
          </div>
        )}
      </div>
    </Layout>
  );
};

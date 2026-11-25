/** @jsxImportSource @emotion/react */
import { useState, type FormEvent } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import type { Theme } from '@styles/theme';
import { createUser, updateUser, getUser } from '@domains/users/api';
import { Layout } from '@components/Layout';
import { useAuth } from '@hooks/useAuth';
import { userFormStyles } from './UserForm.styles';

export const UserForm = () => {
  const theme = useTheme() as Theme;
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();

  const { data: existingUser, isLoading: isLoadingUser } = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUser(Number(id)),
    enabled: isEditMode && isAuthenticated,
  });

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    employeeCode: '',
    role: 'employee' as 'employee' | 'manager',
  });

  // Derive the current form values from either formData or existingUser
  const currentFormValues = {
    email: formData.email || existingUser?.email || '',
    password: formData.password,
    name: formData.name || existingUser?.name || '',
    employeeCode: formData.employeeCode || existingUser?.employee_code || '',
    role: formData.role || existingUser?.role || ('employee' as 'employee' | 'manager'),
  };

  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      navigate('/users');
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: { email?: string; password?: string; name?: string }) =>
      updateUser(Number(id), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user', id] });
      navigate('/users');
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (isEditMode) {
      const updateData: { email?: string; password?: string; name?: string } = {
        email: currentFormValues.email,
        name: currentFormValues.name,
      };
      if (currentFormValues.password) {
        updateData.password = currentFormValues.password;
      }
      updateMutation.mutate(updateData);
    } else {
      createMutation.mutate({
        email: currentFormValues.email,
        password: currentFormValues.password,
        name: currentFormValues.name,
        employee_code: currentFormValues.employeeCode,
        role: currentFormValues.role,
      });
    }
  };

  if (isEditMode && isLoadingUser) {
    return (
      <Layout>
        <div css={userFormStyles(theme)}>
          <div className="user-form__loading-state">Loading user...</div>
        </div>
      </Layout>
    );
  }

  const mutation = isEditMode ? updateMutation : createMutation;

  return (
    <Layout>
      <div css={userFormStyles(theme)}>
        <h2 className="user-form__title">{isEditMode ? 'Edit User' : 'Create New User'}</h2>

        <div className="user-form__card">
          <form className="user-form__form" onSubmit={handleSubmit}>
            <div className="user-form__input-group">
              <label className="user-form__label" htmlFor="name">Name</label>
              <input
                className="user-form__input"
                id="name"
                type="text"
                value={currentFormValues.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="Full name"
              />
            </div>

            <div className="user-form__input-group">
              <label className="user-form__label" htmlFor="email">Email</label>
              <input
                className="user-form__input"
                id="email"
                type="email"
                value={currentFormValues.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                placeholder="email@example.com"
              />
            </div>

            <div className="user-form__input-group">
              <label className="user-form__label" htmlFor="password">
                Password {isEditMode && '(leave blank to keep current)'}
              </label>
              <input
                className="user-form__input"
                id="password"
                type="password"
                value={currentFormValues.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required={!isEditMode}
                placeholder="Minimum 8 characters"
              />
              <div className="user-form__help-text">Minimum 8 characters</div>
            </div>

            {!isEditMode && (
              <>
                <div className="user-form__input-group">
                  <label className="user-form__label" htmlFor="employeeCode">Employee Code</label>
                  <input
                    className="user-form__input"
                    id="employeeCode"
                    type="text"
                    value={currentFormValues.employeeCode}
                    onChange={(e) => setFormData({ ...formData, employeeCode: e.target.value })}
                    required
                    placeholder="7-digit code"
                    pattern="[0-9]{7}"
                  />
                  <div className="user-form__help-text">7-digit number</div>
                </div>

                <div className="user-form__input-group">
                  <label className="user-form__label" htmlFor="role">Role</label>
                  <select
                    className="user-form__select"
                    id="role"
                    value={currentFormValues.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as 'employee' | 'manager' })}
                    required
                  >
                    <option value="employee">Employee</option>
                    <option value="manager">Manager</option>
                  </select>
                </div>
              </>
            )}

            {mutation.isError && (
              <div className="user-form__error-message">
                Failed to {isEditMode ? 'update' : 'create'} user. Please try again.
              </div>
            )}

            <div className="user-form__button-group">
              <Link
                to="/users"
                className="user-form__button user-form__button--cancel"
              >
                Cancel
              </Link>
              <button
                className="user-form__button user-form__button--submit"
                type="submit"
                disabled={mutation.isPending}
              >
                {mutation.isPending
                  ? isEditMode
                    ? 'Updating...'
                    : 'Creating...'
                  : isEditMode
                  ? 'Update User'
                  : 'Create User'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

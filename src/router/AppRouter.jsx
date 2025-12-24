import { Routes, Route, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import NotFoundPage from '../pages/NotFoundPage';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import ProfilePage from '../pages/ProfilePage';
import UploadPage from '../pages/UploadPage';
import ProjectPage from '../pages/ProjectPage';
import PrivateRoute from './PrivateRoute';
import AdminUserPage from '../pages/AdminUserPage';
import AdminProjectPage from '../pages/AdminProjectPage';
import AdminTopicPage from '../pages/AdminTopicPage';
import AdminTopicEditPage from '../pages/AdminTopicEditPage';



function AppRouter() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <AuthLayout>
            <LoginPage />
          </AuthLayout>
        }
      />
      <Route
        path="/dashboard"
        element={
          <MainLayout>
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          </MainLayout>
        }
      />
      <Route
        path="*"
        element={
          <MainLayout>
            <NotFoundPage />
          </MainLayout>
        }
      />
      <Route
        path="/profile"
        element={
          <MainLayout>
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          </MainLayout>
        }
      />
      <Route
        path="/upload"
        element={
          <MainLayout>
            <PrivateRoute allowedRoles={['admin', 'editor']}>
              <UploadPage />
            </PrivateRoute>
          </MainLayout>
        }
      />
      <Route
        path="/project/:id"
        element={
          <MainLayout>
            <PrivateRoute>
              <ProjectPage />
            </PrivateRoute>
          </MainLayout>
        }
      />
      <Route
        path="/admin"
        element={
          <MainLayout>
            <PrivateRoute allowedRoles={['admin']}>
              <AdminUserPage />
            </PrivateRoute>
          </MainLayout>
        }
      />
      <Route
        path="/projects"
        element={
          <MainLayout>
            <PrivateRoute allowedRoles={['admin']}>
              <AdminProjectPage />
            </PrivateRoute>
          </MainLayout>
        }
      />
      <Route
        path="/projects/:projectId/topics"
        element={
          <MainLayout>
            <PrivateRoute allowedRoles={['admin']}>
              <AdminTopicPage />
            </PrivateRoute>
          </MainLayout>
        }
      />
      <Route
        path="/admin/topics/:topicId/edit"
        element={
          <MainLayout>
            <PrivateRoute allowedRoles={['admin']}>
              <AdminTopicEditPage />
            </PrivateRoute>
          </MainLayout>
        }
      />

    </Routes>
  );
}

export default AppRouter;
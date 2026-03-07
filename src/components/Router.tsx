import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import AnalyzerPage from '@/components/pages/AnalyzerPage';
import ResultsPage from '@/components/pages/ResultsPage';
import TemplatesPage from '@/components/pages/TemplatesPage';
import ContactPage from '@/components/pages/ContactPage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        routeMetadata: {
          pageIdentifier: 'home',
        } as const, // ✅ FIXED: Add 'as const' for type safety
      },
      {
        path: "analyzer",
        element: <AnalyzerPage />,
        routeMetadata: {
          pageIdentifier: 'analyzer',
        } as const, // ✅ FIXED: Add 'as const' for type safety
      },
      {
        path: "results",
        element: <ResultsPage />,
        routeMetadata: {
          pageIdentifier: 'results',
        } as const, // ✅ FIXED: Add 'as const' for type safety
      },
      {
        path: "templates",
        element: <TemplatesPage />,
        routeMetadata: {
          pageIdentifier: 'templates',
        } as const, // ✅ FIXED: Add 'as const' for type safety
      },
      {
        path: "contact",
        element: <ContactPage />,
        routeMetadata: {
          pageIdentifier: 'contact',
        } as const, // ✅ FIXED: Add 'as const' for type safety
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}

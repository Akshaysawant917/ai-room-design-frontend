import { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import AuthCallback from "../components/auth/AuthCallback";
import Login from "../components/auth/Login";
import ProtectedRoute from "../components/common/ProtectedRoute";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Home from "../components/landing/Home";
import History from "../components/history/History";
import TransformationDetail from "../components/transformation/TransformationDetail";
import Wizard from "../components/transformation/Wizard";
import { useAuth } from "../hooks/useAuth";
import { getDraftFile } from "../services/draftStorage";

const routeViews = {
  upload: "upload",
  room: "room",
  budget: "budget",
  style: "style",
  colors: "color",
  review: "review",
  generating: "generating",
  result: "result",
};

function AppRoutes() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [draft, setDraft] = useState(() =>
    JSON.parse(
      sessionStorage.getItem("transformationDraft") ||
        '{"room":"","budget":"","style":[],"color":"","image":null,"imageId":"","imageUrl":""}',
    ),
  );
  const [, setResult] = useState(null);

  useEffect(() => {
    getDraftFile()
      .then((file) => {
        if (!file) return;
        setDraft((currentDraft) => ({
          ...currentDraft,
          file,
          image: URL.createObjectURL(file),
        }));
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const persistedDraft = { ...draft };
    delete persistedDraft.file;
    delete persistedDraft.image;
    sessionStorage.setItem(
      "transformationDraft",
      JSON.stringify(persistedDraft),
    );
  }, [draft]);

  const startTransform = () => {
    setMobileMenu(false);
    navigate("/transform/upload");
  };

  const navigateFromWizard = (view) => {
    if (view === "login") {
      navigate("/login");
      return;
    }
    if (view === "home") {
      navigate("/");
      return;
    }
    navigate(`/transform/${view === "color" ? "colors" : view}`);
  };

  return (
    <div className="app-shell">
      <Header
        user={user}
        onStart={startTransform}
        onHistory={() => navigate("/transformations")}
        onLogout={() => {
          logout();
          navigate("/login");
        }}
        mobileMenu={mobileMenu}
        setMobileMenu={setMobileMenu}
      />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home onStart={startTransform} />
              <Footer />
            </>
          }
        />
        <Route
          path="/login"
          element={<Login onBack={() => navigate("/transform/review")} />}
        />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route
          path="/transform/:step"
          element={
            <TransformRoute
              draft={draft}
              setDraft={setDraft}
              user={user}
              onResult={setResult}
              onNavigate={navigateFromWizard}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardRedirect />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transformations"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transformations/:id"
          element={
            <ProtectedRoute>
              <TransformationDetail />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

function TransformRoute({ draft, setDraft, user, onResult, onNavigate }) {
  const navigate = useNavigate();
  const { step } = useParams();
  const view = routeViews[step];

  if (!view) return <Navigate to="/transform/upload" replace />;

  return (
    <Wizard
      view={view}
      setView={onNavigate}
      draft={draft}
      setDraft={setDraft}
      user={user}
      onSignIn={() => onNavigate("login")}
      onResult={onResult}
      onTransformationCreated={(id) => navigate(`/transformations/${id}`)}
    />
  );
}

function DashboardRedirect() {
  return <Navigate to="/transformations" replace />;
}

export default AppRoutes;

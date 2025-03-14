import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  FC,
} from "react";
import supabase from "../utils/supabase";
import { useNavigate } from "react-router-dom";
import { Enums } from "../utils/database/types";

// Definieren der Typen für den AuthContext
interface AuthContextType {
  user: any;
  authRole: Enums<"auth-role"> | null;
  login: (email: string, password: string) => Promise<any>;
  sendOtp: (email: string) => Promise<any>;
  signOut: () => Promise<any>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Typ für die Props der AuthProvider-Komponente
interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [authRole, setAuthRole] = useState<Enums<"auth-role"> | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      await supabase.auth
        .signInWithPassword({
          email,
          password,
        })
        .then(async (response) => {
          if (response.error) throw "Error login:" + response.error;
          else {
            setUser(response.data.user);
            await fetchUserRole(response.data.user?.id ?? "").then((role) => {
              if (role) navigate("/", { replace: true });
              setLoading(false);
            });
          }
        });
    } catch (error) {
      throw "Error login:" + error;
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut().then((response) => {
      if (response.error) console.log("Error signing out:", response.error);
      else navigate("/login");
    });
  };

  const sendOtp = (email: string) =>
    supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: false },
    });

  const fetchUserRole = async (userId: string) => {
    const { data, error } = await supabase
      .from("profile")
      .select("auth_role")
      .eq("id", userId)
      .single();

    setAuthRole(data?.auth_role ?? "employee");
    if (error) {
      console.error("Error fetching user role:", error);
      return null;
    }
    return data?.auth_role || null;
  };

  useEffect(() => {
    try {
      console.log("Authenticating...");
      supabase.auth.getUser().then(async (user) => {
        if (user.data.user) {
          setUser(user.data.user);
          await fetchUserRole(user.data.user?.id ?? "");
        }
        setLoading(false);
      });
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, authRole, login, sendOtp, signOut, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

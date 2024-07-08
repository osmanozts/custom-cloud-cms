import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  FC,
} from "react";
import supabase from "../utils/supabase";

// Definieren der Typen für den AuthContext
interface AuthContextType {
  user: any;
  role: string | null;
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

const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
};

const sendOtp = (email: string) =>
  supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: false } });

const signOut = () => supabase.auth.signOut();

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserRole = async (userId: string) => {
    const { data, error } = await supabase
      .from("profile")
      .select("role")
      .eq("id", userId)
      .single();
    if (error) {
      console.error("Error fetching user role:", error);
      return null;
    }
    return data?.role || null;
  };

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        const userRole = await fetchUserRole(session.user.id);
        setUser(session.user);
        setRole(userRole);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, role, login, sendOtp, signOut, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

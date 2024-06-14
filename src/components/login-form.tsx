import { FormEvent, useState } from "react";
import { useAuth } from "../providers/auth-provider";

export function LoginForm() {
  const [email, setEmail] = useState("");

  const { login } = useAuth();

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

    login(email).then();
  };

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <h1 className="header">Supabase + React</h1>
        <p className="description">
          Sign in via magic link with your email below
        </p>
        <form className="form-widget" onSubmit={handleLogin}>
          <div>
            <input
              className="inputField"
              type="email"
              placeholder="Your email"
              value={email}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <button className={"button block"}>
              <span>Send One Time Password</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

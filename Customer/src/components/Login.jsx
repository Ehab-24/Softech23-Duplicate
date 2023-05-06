import { useEffect, useState } from "react";
import LoadingButton from "../components/LoadingButton/LoadingButton.jsx";
import useAuthStore from "../store/useAuth.js";

export default function Login({setOpen}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const {loginUser, user, token} = useAuthStore();

  const handleLoginSubmit = async () => {
    setLoading(true);
    await loginUser(email, password);
    setLoading(false);
    setOpen(false);
  }

  return (
    <div>
      <div className="mt-4 flex items-center justify-around rounded">
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input
            className="h-12 text-md"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            className="h-12 text-md"
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />

          &nbsp;
          <LoadingButton text={"Continue"} isLoading={loading} setIsLoading={setLoading}
            click={handleLoginSubmit}
          />
          &nbsp;
        </form>
      </div>
    </div>
  );
}

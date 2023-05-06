import { useContext, useState } from "react";
// import { UserContext } from "../UserContext.jsx";
// import { useLogin } from "../UserContext.jsx";
import LoadingButton from "../components/LoadingButton/LoadingButton.jsx";
import { toast, Toaster } from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = () => {

  }

  return (
    <div>
      <Toaster />
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

import { useState } from "react";
import useAuthStore from "../store/useAuth";
import LoadingButton from "./LoadingButton/LoadingButton";

export default function Register({setOpen}) {
  const {user, signupUser} = useAuthStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegisterSubmit = () => {
      setLoading(true);
      signupUser(name, email, password, dob, gender);
      console.log(user);
      setLoading(false);
      setOpen(false);
  }

  return (
    <div>
      <div className="my-4 flex items-center justify-around rounded">
        <form className="max-w-md mx-auto" onSubmit={handleRegisterSubmit}>
          <input type="text"
            className="h-12 bg-pink-700 placeholder:text-gray-300 text-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent rounded-md px-4 py-2 w-full"
            placeholder="John Doe"
            value={name}
            onChange={ev => setName(ev.target.value)} />
          <input type="email"
            className="h-12 bg-pink-700 placeholder:text-gray-300 text-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent rounded-md px-4 py-2 w-full"
            placeholder="your@email.com"
            value={email}
            onChange={ev => setEmail(ev.target.value)} />
          <input type="password"
            className="h-12 bg-pink-700 placeholder:text-gray-300 text-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent rounded-md px-4 py-2 w-full"
            placeholder="password"
            value={password}
            onChange={ev => setPassword(ev.target.value)} />
          <div>
            <p className="ml-2 mt-3 mb-1 text-white font-semibold">Date of Birth</p>
            <input
              type="date"
              value={dob}
              onChange={(ev) => setDob(ev.target.value)}
              className="h-12 text-md bg-pink-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent rounded-md mb-4 px-4 py-2 w-full"
            />
            <select
              value={gender}
              onChange={(ev) => setGender(ev.target.value)}
              className="h-12 text-md bg-pink-700 text-white focus:outline-none ring-1 ring-white focus:ring-2 focus:ring-pink-500 focus:border-transparent rounded-md mb-4 px-4 py-2 w-full"
            >
              <option value="" >Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <LoadingButton text={"Continue"} isLoading={loading} setIsLoading={setLoading} click={handleRegisterSubmit} />
        </form>
      </div>
    </div>
  );
}
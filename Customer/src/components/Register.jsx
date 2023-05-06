import { useState } from "react";
import { Toaster } from "react-hot-toast";
import LoadingButton from "./LoadingButton/LoadingButton";

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegisterSubmit = () => {}

  return (
    <div>
      <Toaster />
      <div className="my-4 flex items-center justify-around rounded">
        <form className="max-w-md mx-auto" onSubmit={handleRegisterSubmit}>
          <input type="text"
            className="h-12 text-md"
            placeholder="John Doe"
            value={name}
            onChange={ev => setName(ev.target.value)} />
          <input type="email"
            className="h-12 text-md"
            placeholder="your@email.com"
            value={email}
            onChange={ev => setEmail(ev.target.value)} />
          <input type="password"
            className="h-12 text-md"
            placeholder="password"
            value={password}
            onChange={ev => setPassword(ev.target.value)} />
          <div>
            <br />
            <label htmlFor="dob" className="ml-2">Date of Birth</label>
            <input
              type="date"
              value={dob}
              onChange={(ev) => setDob(ev.target.value)}
              className="h-12 text-md"
            />
            <select
              value={gender}
              onChange={(ev) => setGender(ev.target.value)}
              className="h-12 ml-2 text-md bg-white"
            >
              <option value="" >Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          &nbsp;
          <LoadingButton text={"Continue"} isLoading={loading} setIsLoading={setLoading} click={handleRegisterSubmit} />
        </form>
      </div>
    </div>
  );
}
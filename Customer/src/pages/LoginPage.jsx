import { useState } from "react";
import { Modal } from "@mui/material";
import { Toaster, toast } from "react-hot-toast"
import Login from "../components/Login.jsx";
import Register from "../components/Register.jsx";

export default function LoginPage({ open, setOpen }) {
  const [loginMode, setLoginMode] = useState(true);

  return (
    <div>
      <Toaster />
      <Modal
        open={open}
        onClose={() => {
          setOpen(false)
          setLoginMode(true)
        }}
        className="flex items-center justify-center"
        style={{ border: "none" }}
      >
        <div className="mt-4 p-10 flex items-center justify-around bg-pink-900 rounded">
          <div className={`${loginMode ? "mb-36" : 'mb-24'}`} >
            <h1 className="text-3xl font-semibold text-center text-white mb-7">{loginMode ? 'Login' : 'Sign up'}</h1>

            {loginMode ? (<Login setOpen={setOpen}/>) : (<Register setOpen={setOpen}/>)}

            <div className="flex items-center justify-center">
              <hr className="flex-1 border-gray-200 border-1 border-solid my-0 mr-4" />
              <p className="text-sm text-white">or</p>
              <hr className="flex-1 border-gray-200 border-1 border-solid my-0 ml-4" />
            </div>

            <div className="flex gap-2 mt-9">
              <h3 className="text-white">{loginMode ? ("New to BidBazaar?") : ("Back to login? ")}</h3>
              <h4
                onClick={() => {
                  setLoginMode(!loginMode);
                }}
                className="cursor-pointer font-semibold text-pink-500"
              >
                {loginMode ? ("Sign Up") : ("Login")}
              </h4>
            </div>

          </div>
        </div>
      </Modal>
    </div>
  );
}

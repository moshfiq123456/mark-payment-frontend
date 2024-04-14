import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import markImage from '../assets/png/markAiImage.png'; // Import the image
import markIcon from '../assets/png/logo.png'
function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const quote = "Experience the frozen wonders of Mark's Ice Cream Company. Every scoop crafted with love, delivering pure joy with every bite.".split('. ');

  const [loading,setLoading]=useState(false)
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginSuccess = (accessToken) => {
    // Store access token in local storage
    localStorage.setItem("accessToken", accessToken);

    // Trigger the onLogin callback to update the login state in the parent component
    onLogin();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await axios.post("http://localhost:10000/api/login", {
        email,
        password,
      });

      const { accessToken, refreshToken } = response.data;

      handleLoginSuccess(accessToken);

      // Store refresh token in local storage
      localStorage.setItem("refreshToken", refreshToken);
      setLoading(false)
    } catch (error) {
      console.error("Error:", error);
      setError("Invalid email or password");
      setLoading(false)
    }
  };

  return (
    <div className="bg-slate-200 flex flex-row" style={{ height: "100vh" }}>
      <div className="flex basis-1/2 flex-col items-center px-14 py-10 gap-20">
        <div className="w-full ">
          <img src={markIcon} height={70} width={70}/>
          <div></div>
        </div>
        <div className="flex flex-col items-center gap-6">
          <h2 className=" font-semibold text-4xl">Welcome Back</h2>
          <p>Login into your account</p>
          {error && <p>{error}</p>}
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div >
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input
                  placeholder="Email"
                  className="grow"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </label>
            </div>
            <div>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  className="grow"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </label>
            </div>
            <button className="btn btn-primary w-full" type="submit">
              Login
            </button>
          </form>
        </div>
        <div></div>
      </div>
      <div
        className="flex basis-1/2 flex-col justify-center  p-12"
        style={{ backgroundImage: `url(${markImage})`, height: "100vh", width: "100%", backgroundSize: "cover" }}
      >
        <div className=" p-9 text-white text-2xl mt-24" style={{background:"rgba(255, 255, 255, 0.18)",borderRadius:"16px",boxShadow:"0 4px 30px rgba(0, 0, 0, 0.1)",backdropFilter:"blur(5px)",WebkitBackdropFilter:"blur(5px)",border:"1px solid rgba(255, 255, 255, 0.3)"}}>{quote}</div>
      </div>
      {/* <LoadingSpinner spinnerSize="100px" imageSize="80px"/> */}
    </div>
  );
}

export default Login;

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { getUserRole } from "@/pages/api/FinopsApi/GetUserRole";
import { useAppContext } from "@/pages/Components/AppContext";
import { login } from "@/pages/api/api/AuthAPI";
import replacePeriodsWithUnderscoresSingleObject from "@/functions/genericFunctions";
// import { useIsAuthenticated, useMsal } from "@azure/msal-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [link, setLink] = useState("");
  const router = useRouter();
  const isAuthenticated = useIsAuthenticated();
  const { instance } = useMsal();
  const isFormValid = email !== "" && password !== "";
  // let [loginEmployee, { data: loginData }] = useLoginEmployeeMutation();
  const { accounts } = useMsal();
  const account: any = accounts[0];
  const { authenticated, toggleAuthenticated } = useAppContext();
  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  //----------------------SSO LOGIN CODE ------------------------------------------------

  // const request = {
  //   scopes: ["user.read", "user.readbasic.all"],
  // };

  // const handleSignIn = () => {
  //   instance
  //     .loginPopup(request)
  //     .then((response: any) => {
  //       // getEmployeesImages(response.accessToken);
  //       // //console.log(response.accessToken);
  //       sessionStorage.setItem("accessTokenMSAL", response.accessToken);
  //     })
  //     .catch((error: any) => {
  //       console.log("Error:", error);
  //     });
  // };
  // useEffect(() => {
  //   if (isAuthenticated && authenticated) {
  //     router.push("/page/Dashboard");
  //   }
  // }, [isAuthenticated, authenticated]);
  // console.log("isauthenticated", isAuthenticated, authenticated);
  // useEffect(() => {
  //   if (account?.idTokenClaims) {
  //     let reshead: any;
  //     const email: string = account.idTokenClaims.preferred_username;
  //     const name: string = account.idTokenClaims.name;
  //     // console.log("------------------",account.idTokenClaims);
  //     // sessionStorage.setItem("userEmail", email);
  //     // sessionStorage.setItem("userName", name);
  //     const getData = async () => {
  //       const fetchedData = await getUserRole(email);
  //       // setUserData(fetchedData);
  //       // console.log("response data--------------", fetchedData.data.role);
  //       if (fetchedData && fetchedData.data) {
  //         toggleAuthenticated(true);
  //         sessionStorage.setItem("userRole", fetchedData.data.role);
  //         sessionStorage.setItem("userName", fetchedData.data.userName);
  //         sessionStorage.setItem("userEmail", fetchedData.data.adId);
  //         sessionStorage.setItem("businessLogo", fetchedData.data.businessLogo);
  //         // router.push("/page/Dashboard");
  //       } else {
  //         window.alert("User Not Found!!");
  //       }
  //     };
  //     getData();
  //   }
  // }, [account]);

  //----------------------SSO LOGIN CODE ENDS------------------------------------------------

  console.log("------------", email, password);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    async function dataFetch() {
      const APIdata = {
        username: email,
        password: password,
      };
      const data = await login(APIdata);
      console.log("data inn login", data);
      const modifiedData = replacePeriodsWithUnderscoresSingleObject(data);
      if (modifiedData.status == "success") {
        router.push("/Dashboard");
        localStorage.setItem("token", modifiedData.access_token);
        localStorage.setItem("refreshToken", modifiedData.refresh_token);
        localStorage.setItem("sessionID", modifiedData.session_id);
      } else {
        window.alert(
          "Login failed. Please check your email and password and try again."
        );
      }
    }

    dataFetch();
  };
  // const handleSubmit = (e: any) => {
  //   const LoginData = {
  //     username: email,
  //     password: password,
  //   };
  //   e.preventDefault();
  //   async function dataFetch() {
  //     const data = await login(LoginData);
  //     console.log("------------------", data);
  //     if (data?.data[0]) {
  //       toggleAuthenticated(true);
  //       sessionStorage.setItem("userRole", data.data[0].role);
  //       sessionStorage.setItem("userName", data.data[0].name);
  //       sessionStorage.setItem("userEmail", data.data[0].email);
  //       // sessionStorage.setItem(
  //       //   "businessLogo",
  //       //   fetchedData.data.businessLogo
  //       // );
  //       router.push("/Dashboard");
  //       if (data.data[0].role != "ADMIN") {
  //         sessionStorage.setItem("bu_id", data.data[0].id);
  //       }
  //       // }else {
  //     } else {
  //       window.alert(
  //         "Login failed. Please check your email and password and try again."
  //       );
  //     }
  //   }

  //   dataFetch();
  // };

  return (
    <>
      <div className="bg-white rounded-l h-[100vh]">
        <div className=" rounded-sm h-[100vh]  ">
          <div className="flex flex-wrap h-[100vh]">
            <div className=" w-3/5 flex items-center ">
              <img src={"/login.jpg"} alt="Logo" />
            </div>

            <div className="w-2/5 bg-black flex justify-center items-center ">
              <div className="w-full p-4 ">
                <div className="px-24">
                  <div className="mb-3 text-2xl font-bold  text-white ">
                    Sign In
                  </div>
                  <div className="mb-12">
                    {" "}
                    Welcome to IMS, Please enter your details
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="mb-9">
                      {/* <label className="mb-2.5 block font-medium text-black dark:text-white">
                      UserName
                    </label> */}
                      <div className="relative">
                        <input
                          type="text"
                          id="email"
                          name="email"
                          onChange={handleEmailChange}
                          value={email}
                          placeholder="Email/Username"
                          required
                          className="w-full rounded-lg border border-stroke bg-white text-black py-3 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="mb-9">
                      {/* <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Type Password
                    </label> */}
                      <div className="relative">
                        <input
                          type="password"
                          id="password"
                          name="password"
                          onChange={handlePasswordChange}
                          value={password}
                          required
                          placeholder=" Password "
                          className="w-full  text-black rounded-lg border border-stroke bg-white py-3 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col mt-12">
                      {/* <Link href="/dashboard"> */}
                      <button
                        type="submit"
                        value="Sign In"
                        className="w-full z-10 font-semibold cursor-pointer rounded-lg border border-primary bg-primary3  p-4 text-white transition hover:bg-opacity-90"
                      >
                        Sign In
                      </button>
                      {/* </Link> */}
                      <Link
                        className="text-primary3 text-center mt-6 block"
                        href="#"
                      >
                        <span className="text-lg font-medium mr-2">
                          Forgot password?
                        </span>
                        {/* Click here to reset */}
                      </Link>
                    </div>
                    {/* 
                  <div className="mt-6 text-center">
                    <button
                      type="submit"
                      value="Sign In"
                      className="w-1/4 cursor-pointer rounded-lg border border-primary bg-blue-300 p-3 text-black transition hover:bg-opacity-90"
                    >
                      Login with SSO
                    </button>
                  </div> */}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

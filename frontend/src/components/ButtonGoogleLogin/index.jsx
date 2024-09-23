import { FcGoogle } from "react-icons/fc";

import { useGoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import axios from "axios";
import { ContainerButtonGoogle } from "./styles";

export const ButtonGoogleLogin = () => {
  const [user, setUser] = useState([]);

  const login = useGoogleLogin({
    onSuccess: (response) => {
      console.log(response);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user.length !== 0) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => setUser(res))
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <ContainerButtonGoogle onClick={login}>
      <FcGoogle />
      Entrar com o Google
    </ContainerButtonGoogle>
  );
};

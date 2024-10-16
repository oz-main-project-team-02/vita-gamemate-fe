import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { client } from "../api/client";
import Cookies from "js-cookie";
import { useUserStore } from "../config/store";

export default function KakaoCallback() {
  const [searchParams] = useSearchParams();
  const CODE = searchParams.get("code");
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  useEffect(() => {
    (async () => {
      try {
        const response = await client.post("/api/v1/users/kakao/login/callback/", {
          code: CODE,
        });
        const { data } = await client.get(`/api/v1/users/${response.data.id}/profile`);
        console.log(data);

        Cookies.set("access_token", response.data.access_token, { expires: 1 / 12 });
        Cookies.set("refresh_token", response.data.refresh_token, { expires: 7 });

        setUser(data);
        navigate("/");
      } catch (err) {
        console.error(err);
      }
    })();
  }, [CODE, navigate, setUser]);

  return <></>;
}

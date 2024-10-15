import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { client } from "../api/client";
import Cookies from "js-cookie";

export default function KakaoCallback() {
  const [searchParams] = useSearchParams();
  const CODE = searchParams.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await client.post(
          "/api/v1/users/kakao/login/callback/",
          {
            code: CODE,
          }
        );
        Cookies.set("access_token", response.data.access_token, { expires: 1 });
        Cookies.set("refresh_token", response.data.refresh_token, {
          expires: 7,
        });
        navigate("/");
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [CODE, navigate]);

  return <></>;
}

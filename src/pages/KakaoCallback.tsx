import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { client } from "../api/client";

export default function KakaoCallback() {
  const [searchParams] = useSearchParams();
  const CODE = searchParams.get("code");

  useEffect(() => {
    try {
      const fetchGoogleGet = async () => {
        const response = await client.get(
          `${
            import.meta.env.VITE_PUBLIC_BASE_URL
          } + /api/v1/users/kakao/login/callback`,
          {
            params: {
              code: CODE,
            },
          }
        );
        console.log(response.data);

        // navigate("/");
      };
      fetchGoogleGet();
    } catch (err) {
      console.log(err);
    }
  }, [CODE]);

  return <></>;
}

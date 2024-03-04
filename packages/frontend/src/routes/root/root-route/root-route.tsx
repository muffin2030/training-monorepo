import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "@app/redux/store";
import { useNavigate } from "react-router-dom";
import { setBackUrl } from "@app/redux/authSlice/authSlice";
import { utils } from "@tm/common";
import { $container } from "./styles";

export const RootRoute: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthorized, backUrl } = useSelector((state) => state.auth);

  useEffect(() => {
    const callbackFn = () => {
      if (isAuthorized) {
        navigate(backUrl || "/main");

        if (backUrl) {
          utils
            .resolveWithValue(undefined, 100)
            .then(() => dispatch(setBackUrl(null)));
        }
      } else {
        navigate("/login");
      }
    };

    callbackFn();
  }, [isAuthorized, navigate, backUrl]);

  return (
    <div className={$container}>
      <div>loading...</div>
    </div>
  );
};

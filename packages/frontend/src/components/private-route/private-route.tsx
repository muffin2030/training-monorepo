import { useDispatch, useSelector } from "@app/redux/store";
import React, { FC, PropsWithChildren, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { setBackUrl } from "@app/redux/authSlice/authSlice";

type Props = PropsWithChildren;

export const PrivateRoute: FC<Props> = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthorized, token, refreshToken } = useSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    const asyncFn = async () => {
      if (!isAuthorized) {
        await dispatch(setBackUrl(location.pathname));
        navigate("/login");
      }
    };

    void asyncFn();
  }, [isAuthorized, navigate, dispatch, location]);

  return children;
};

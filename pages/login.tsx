import * as React from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Auth, Amplify, API } from "aws-amplify";
import amplifyConfig from "../amplifyconfig.json";
import { FoodModel } from "../models";
import { useRouter } from "next/router";
import { Box, Button, Stack, Typography } from "@mui/material";

const { v4: uuidv4 } = require("uuid");

const API_GW_NAME = "ag-manage-restaurant-project";
const API_KEY = "dgt6PuOZHY1Ot9ZXtbN0x1ZpZyRcilJY2phtxcnB";

Amplify.configure(amplifyConfig);

export interface LoginProps {}

export default function Login(props: LoginProps) {
  const router = useRouter();
  const numRef = React.useRef(10);
  const [userLogin, setUser] = React.useState<any>();
  const [countDown, setCountDown] = React.useState(10);

  React.useEffect(() => {
    if (userLogin) {
      //sau khi user đăng nhập thành công mới tiến hành đếm ngược và chuyển về trang chính
      const interval = setInterval(
        () =>
          setCountDown((prev) => {
            if (prev === 0) {
              router.push("/");
              return prev;
            }
            return prev - 1;
          }),
        1000
      );
      return () => clearInterval(interval);
    }
  }, [userLogin]);

  return (
    <Box
      component={"main"}
      bgcolor={"#222222"}
      minHeight={"100vh"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Typography
        color="var(--primary-color)"
        variant="h3"
        textAlign={"center"}
        fontWeight={"bold"}
        my={"2rem"}
      >
        Login
      </Typography>
      <Authenticator signUpAttributes={["name"]}>
        {({ signOut, user }) => {
          if (user) {
            setUser(user);
          }
          return (
            <Box>
              <Typography
                color="var(--primary-color)"
                variant="h3"
                flexGrow={"1"}
                my="1rem"
              >
                Welcome {user?.attributes && user?.attributes.name}
              </Typography>

              <Box textAlign={"center"}>
                <Button
                  variant="contained"
                  onClick={() => router.push("/")}
                  sx={{
                    color: "var(--white)",
                    backgroundColor: "var(--primary-color)",
                    ":hover": {
                      color: "var(--primary-color)",
                      backgroundColor: "var(--white)",
                    },
                  }}
                >
                  Return Home Page After ({countDown})
                </Button>
              </Box>
            </Box>
          );
        }}
      </Authenticator>
    </Box>
  );
}

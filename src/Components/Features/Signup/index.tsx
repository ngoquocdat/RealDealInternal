import React from "react";
import { Box, Button, Chip, TextField } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { AvatarGenerator } from "random-avatar-generator";
import { IContext, RealDealContext } from "../../utils/context";

import "./index.scss";
import { defaultLogin } from "../../StepsJoinToROOM/datas";
import { uniq } from "../../main";

interface ISignUp {
  gotoChatRoom?: (isToChatRoom: boolean) => void;
  openJoinDialog?: (isOpenJoinDialog: boolean) => void;
}

export default function SignUp(props: ISignUp) {
  const generator = new AvatarGenerator();
  const { gotoChatRoom, openJoinDialog } = props;
  const { register, joinRoom } = React.useContext<IContext>(RealDealContext);

  const singUpInfo = React.useRef({
    phoneNumber: defaultLogin.phoneNumber,
    userName: defaultLogin.userName,
    userEmail: defaultLogin.userEmail,
  });

  const handleGotoChatRoom = React.useCallback(() => {
    gotoChatRoom && gotoChatRoom(true);
  }, []);

  const handleOpenJoinDialog = React.useCallback(() => 
  {
    openJoinDialog && openJoinDialog(true)
  }, []);

  return (
    <div className="signup-container">
      {register.isUserRegistered ? (
        <div className="user-logged-in">
          <Box
            className="avatar"
            component="img"
            src="https://imgs.search.brave.com/qJt1RbPKmLuKTgGLuGn3aWFt9zfEJRQ3KRZncC--40o/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS12ZWN0b3Iv/YnVzaW5lc3NtYW4t/Y2hhcmFjdGVyLWF2/YXRhci1pc29sYXRl/ZF8yNDg3Ny02MDEx/MS5qcGc_c2l6ZT02/MjYmZXh0PWpwZw"
            style={{
              backgroundColor: "#D9D9D9",
              width: "60px",
              height: "60px",
              backgroundImage: generator.generateRandomAvatar(),
            }}
          />
          <div className="user-info">
            <b style={{ display: "inline-flex", gap: "15px" }}>
              {defaultLogin.userName}
              <NotificationsIcon />
            </b>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                paddingTop: "5px",
              }}
            >
              Chat rooms:
              {joinRoom.userJoinedRoom?.length ? (
                <Box>
                  {uniq(joinRoom.userJoinedRoom).map((r: string) => (
                    <Chip
                      label={r}
                      sx={{
                        backgroundColor: "#FBB713",
                        color: "#fff",
                        fontWeight: 600,
                      }}
                      onClick={handleGotoChatRoom}
                    />
                  ))}
                </Box>
              ) : (
                <em>Not chat rooms available</em>
              )}
            </Box>
          </div>
        </div>
      ) : (
        <>
          <div className="left-wrapper">
            <TextField
              sx={{ width: 250 }}
              required
              id="phone-number-outlined"
              label="Phone number"
              size="small"
              defaultValue={defaultLogin.phoneNumber}
              onChange={(evt?: any) => {
                singUpInfo.current.phoneNumber = evt?.target.value;
              }}
            />
            <TextField
              sx={{ width: 250 }}
              required
              id="user-email-required"
              label="Emails"
              size="small"
              defaultValue={defaultLogin.userEmail}
              onChange={(evt?: any) => {
                singUpInfo.current.userEmail = evt?.target.value;
              }}
            />
          </div>
          <div className="right-wrapper">
            <TextField
              sx={{ width: 250 }}
              id="user-name-required"
              label="User name"
              size="small"
              defaultValue={defaultLogin.userName}
              onChange={(evt?: any) => {
                singUpInfo.current.userName = evt?.target.value;
              }}
            />
            <div className="buttons-wrapper" style={{ width: "250px" }}>
              <Button className="signin rd-buttons text-button" 
                      variant="text"
                      onClick={handleOpenJoinDialog}>
                Sign In
              </Button>
              <Button
                className="signup rd-buttons contained-button"
                variant={register.isUserRegistered ? "text" : "contained"}
                onClick={(evt?: React.MouseEvent) => {
                  const _isRegistered =
                    JSON.stringify(defaultLogin) ===
                    JSON.stringify(singUpInfo.current);
                  register.setIsUserRegistered(_isRegistered);
                }}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

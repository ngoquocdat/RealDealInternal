import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Slide,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

import "./index.scss";
import { IContext, RealDealContext } from "../../utils/context";
import SignUp from "../Signup/SignUp";


export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: () => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function JoinRoomDialog(props: SimpleDialogProps) {
  const { open, onClose } = props;
  const { processJoinRoom, joinDialog, register } =
    React.useContext<IContext>(RealDealContext);

  const handleClose = (isAccept: boolean) => {
    onClose();
    if (isAccept) {
      processJoinRoom.setIsProcessJoinRoom(isAccept);
    }
  };

  return (
    <Dialog
      className="dialog-container"
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <Box className="title-tag" />
      <DialogTitle className="dialog-title">
        {!register.isUserRegistered ? (
          <Typography>
            Mời bạn đăng nhập hoặc đăng ký trước khi tham gia ROOM
          </Typography>
        ) : (
          <ErrorOutlineIcon color="warning" sx={{ fontSize: 60 }} />
        )}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => handleClose(false)}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      {!register.isUserRegistered ? (
        <SignUp />
      ) : (
        <Box>
          <DialogContent className="dialog-content">
            <DialogContentText id="alert-dialog-slide-description">
              <Typography sx={{ marginBottom: "15px" }}>
                Quý khách đang muốn tham gia phòng tư vấn về{" "}
                <b>Bất động sản AAA</b>
              </Typography>
              <Typography sx={{ marginBottom: "15px" }}>
                Trước khi tiến hành tham gia phòng tư vấn bạn phải thực hiện một
                khoản phí tham gia phòng.
              </Typography>
              <Typography sx={{ marginBottom: "15px" }}>
                Nhấn nút Chấp nhận.Nếu bạn vẫn muốn tiếp tục tham gia phòng tư
                vấn. Nhấn nút Hủy để quay lại trang tin RealDeal.
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              className="join-warning rd-buttons contained-button"
              onClick={() => handleClose(true)}
              sx={{ width: "120px" }}
              variant="contained"
            >
              Chấp nhận
            </Button>
            <Button
              className="join-warning rd-buttons text-button"
              onClick={() => handleClose(false)}
              sx={{ width: "120px" }}
              variant="text"
            >
              Hủy
            </Button>
          </DialogActions>
        </Box>
      )}
    </Dialog>
  );
}

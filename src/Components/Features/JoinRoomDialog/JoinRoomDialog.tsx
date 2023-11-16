import React from "react";
import { Box, Typography, 
         Button, IconButton,
         Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
         Slide, Grid,
         TextField, Checkbox, FormControlLabel, } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { Link } from "react-router-dom";
import { IContext, RealDealContext } from "../../utils/context";
import JoinRoomDialogService from "./Services/JoinRoomDialogService";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CloseIcon from "@mui/icons-material/Close";
import SignUp from "../Signup";
import "./JoinRoomDialog.scss";


export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: () => void;
}

const Transition = React.forwardRef(function Transition(props: TransitionProps & {children: React.ReactElement<any, any>;},
                                                        ref: React.Ref<unknown>) 
{
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function JoinRoomDialog(props: SimpleDialogProps) 
{
    const joinRoomDialogService = new JoinRoomDialogService()
    const dialogs = joinRoomDialogService.getDialog()
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
        sx={{ borderRadius: '50px'}}
        PaperProps={{
            sx: {
              height: '800px', 
              maxWidth: '1000px'
            }
        }}>
          {/* <DialogTitle>
            {!register.isUserRegistered ? (
              <Typography/>
            ) : (
              <ErrorOutlineIcon color="warning" sx={{ fontSize: 60 }} />
            )}
          </DialogTitle> */}
          <DialogContent sx={{padding: '0', overflow: 'hidden'}}>
              <Grid container 
                direction='column' 
                alignItems='center' 
                justifyContent='center'
                sx={{
                  position: 'relative',
                  backgroundColor: '#f2f2f2',
                }}>
              <Grid item>
                <Box 
                    sx={{
                      position: 'absolute',
                      transform: 'translate(-50%, 130%)',
                      borderRadius: '50%',
                      width: '70px',
                      height: '70px',
                      boxShadow: '0px 0px 40px 10px rgba(0, 0, 0, 0.2)',
                      background: '#fffbff',
                      padding: '10px',
                      display: 'flex',
                      justifyContent: 'center',
                      backgroundColor: '#ffcc41'
                    }}>
                  <Box className="logo"
                    component="img"
                    src="https://newhome.qodeinteractive.com/wp-content/themes/newhome/assets/img/logo.svg"
                    sx={{
                      width: '60px',
                      height: '60px',
                      margin: 'auto',
                      backgroundColor: 'transparent',
                    }}/>      
                </Box>
              </Grid>
              <Grid container item xs>
                <Grid item xs={5}>
                  <Box sx={{ 
                      display: 'grid',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gridTemplateColumns: 'repeat(5, 1fr)',
                      width: '590px',
                      height: '800px',
                      borderRadius: '0 50% 50% 0',
                      backgroundColor: 'transparent', 
                      //position: 'relative',
                      //boxShadow: '10px 20px 10px 10px rgba(0, 0, 0, 0.2)', 
                      //zIndex: 2,
                    }} >
                    <Box sx={{height: '500px', width: '300px', gridColumn: '2/4'}}>
                      <Typography variant="h4" >
                          {dialogs[0].name}
                      </Typography>
                      {dialogs[0].inputs.map((input) =>
                        (<Box sx={{ margin: '40px 0px'}}>
                            <Typography>
                              {input}
                            </Typography>
                            <TextField fullWidth
                              InputProps={{
                                  disableUnderline: true,
                                  sx: {
                                      fontWeight: 600,
                                      border: 'none',
                                      outline: 'none',
                                      '&::placeholder': { color: 'red', },
                                      width: '300px'
                                  }
                              }}
                              sx={{ backgroundColor: '#ffffff' }}
                              variant="standard"/>
                          </Box>
                        ))}
                      <FormControlLabel
                          control={<Checkbox color="primary" />}
                          label="Remember password"
                          sx={{width: '300px', margin: '0px 0px 20px 0px'}}/>
                      <Button className="signup rd-buttons contained-button"
                              variant={register.isUserRegistered ? "text" : "contained"}>
                        {dialogs[0].name}
                      </Button>
                      <Typography sx={{ margin: '160px 0px 0px 0px' }}  >
                        Are you forgot password ?
                    </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={5}>
                  <Box sx={{ 
                      display: 'grid',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gridTemplateColumns: 'repeat(5, 1fr)',
                      width: '590px',
                      height: '800px',
                      backgroundColor: '#ffffff', 
                      //position: 'relative', 
                      //zIndex: 1,
                    }}>
                      {!register.isUserRegistered ? (
                          <Box sx={{ height: '500px', width: '300px', gridColumn: '3/5'}}>
                            <Typography variant="h4" >
                              {dialogs[1].name}
                            </Typography>
                            {dialogs[1].inputs.map((input) =>
                            (<Box sx={{ margin: '40px 0px'}}>
                                <Typography>
                                  {input}
                                </Typography>
                                <TextField fullWidth
                                  InputProps={{
                                      disableUnderline: true,
                                      sx: {
                                          fontWeight: 600,
                                          border: 'none',
                                          outline: 'none',
                                          '&::placeholder': { color: 'red', },
                                          width: '300px'
                                      }
                                  }}
                                  sx={{ backgroundColor: '#f2f2f2' }}
                                  variant="standard"/>
                              </Box>
                            ))}
                            <Button className="signup rd-buttons contained-button"
                                    variant={register.isUserRegistered ? "text" : "contained"}>
                              {dialogs[1].name}
                            </Button>
                          </Box>
                        ) : (
                          <Box>
                            <DialogActions>
                            </DialogActions>
                          </Box>
                        )}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <IconButton
              aria-label="close"
              onClick={() => handleClose(false)}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}>
              <CloseIcon />
            </IconButton>
            {/* {!register.isUserRegistered ? (
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
            )} */}
          </DialogContent>
      </Dialog>
    );
}

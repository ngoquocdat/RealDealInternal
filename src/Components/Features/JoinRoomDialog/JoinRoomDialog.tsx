import React from "react";
import { Box, Typography, 
         Button, IconButton,
         Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
         Slide, Grid,
         TextField, Checkbox, FormControlLabel, } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { Link } from "react-router-dom";
import { IContext, RealDealContext } from "../../utils/context";
import { defaultLogin } from "Components/utils/datas";
import JoinRoomDialogService from "./Services/JoinRoomDialogService";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CloseIcon from "@mui/icons-material/Close";
import "./JoinRoomDialog.scss";
import { useAuth } from "../../../contexts/AuthContext";
import { CListGroup } from "@coreui/react";


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
    const { processJoinRoom, joinDialog, register } = React.useContext<IContext>(RealDealContext);
    const {login} = useAuth();

    const singUpInfo = React.useRef({
      phoneNumber: defaultLogin.phoneNumber,
      userName: defaultLogin.userName,
      userEmail: defaultLogin.userEmail,
    });
  

    const handleClose = (isAccept: boolean) => {
      onClose();
      if (isAccept) {
        processJoinRoom.setIsProcessJoinRoom(isAccept);
      }
    };

    const handleLogin = async ()=>{
      try{
        await login({username:"long",password:"123123"});

      }catch(err){
        console.log(err);
      }
    }

    return (
      <Dialog
        className="dialog-container"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{ borderRadius: '50px'}}
        PaperProps={{ sx: {
              height: !register.isUserRegistered ? '800px' : 'auto', 
              maxWidth: !register.isUserRegistered ? '1000px' : 'auto'
        }}}>
          <DialogContent className="dialog-content" 
                         sx={{
                            padding: !register.isUserRegistered ? '0' : 'auto', 
                            overflow: !register.isUserRegistered ? 'hidden' : 'auto'
                         }}>
            {!register.isUserRegistered ? (
              // Big Outside Grid Container
              <Grid className="dialog-grid-container" 
                    container 
                    direction='column' 
                    alignItems='center' 
                    justifyContent='center'
                    sx={{
                      position: 'relative',
                      backgroundColor: '#ffffff',
                    }}>
                  <Grid className="dialog-grid-container" item>
                    <DialogTitle 
                        sx={{
                          display: 'flex',
                          position: 'absolute',
                          justifyContent: 'center',
                          transform: 'translate(-50%, 130%)',
                          borderRadius: '50%',
                          width: '70px',
                          height: '70px',
                          boxShadow: '15px 15px 40px 15px rgba(0, 0, 0, 0.25)',
                          background: '#fffbff',
                          backgroundColor: '#ffcc41',
                          padding: '10px',
                          zIndex: 3,
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
                        {/*{!register.isUserRegistered ? (
                          
                        ) : (
                          
                        )} */}
                    </DialogTitle>
                  </Grid>
                  {/*Log In And Sign Up Grid Container*/}
                  <Grid className="log-in-and-sign-up-grid-container" container item xs>
                    {/*Log In Grid*/}
                    <Grid className="log-in-grid" item xs={5}>
                      <Box className="log-in-dialog" sx={{ 
                          display: 'grid',
                          justifyContent: 'center',
                          alignItems: 'center',
                          gridTemplateColumns: 'repeat(5, 1fr)',
                          width: '550px',
                          height: '800px',
                          borderRadius: '0 50% 50% 0',
                          backgroundColor: '#f2f2f2', 
                          boxShadow: '10px 30px 10px 10px rgba(0, 0, 0, 0.1)',
                          position: 'relative',
                          zIndex: 2, 
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
                                  variant={register.isUserRegistered ? "text" : "contained"} 
                                  onClick={handleLogin}>
                            {dialogs[0].name}
                          </Button>
                          <Typography sx={{ margin: '160px 0px 0px 0px' }}  >
                            Are you forgot password ?
                        </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    {/*Sign Up Grid*/}
                    <Grid className="sign-up-grid" item xs={5}>
                      <Box className='sign-up-dialog' 
                          sx={{ 
                            display: 'grid',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gridTemplateColumns: 'repeat(5, 1fr)',
                            width: '590px',
                            height: '800px',
                            backgroundColor: '#ffffff',
                            position: 'relative',
                            zIndex: 1,
                          }}>
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
                                  variant={register.isUserRegistered ? "text" : "contained"}
                                  onClick={(evt?: React.MouseEvent) => {
                                    const _isRegistered =
                                      JSON.stringify(defaultLogin) ===
                                      JSON.stringify(singUpInfo.current);
                                    register.setIsUserRegistered(_isRegistered);
                                  }}>
                            {dialogs[1].name}
                          </Button>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
              </Grid>
            ) : (
              <Box sx={{ marginBottom: "15px" }}>
                <DialogContentText id="alert-dialog-slide-description">
                  <ErrorOutlineIcon color="warning" sx={{ fontSize: 60}} />
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
                <DialogActions>
                  <Button
                    className="join-warning rd-buttons contained-button"
                    onClick={() => handleClose(true)}
                    sx={{ width: "120px" }}
                    variant="contained">
                    Chấp nhận
                  </Button>
                  <Button
                    className="join-warning rd-buttons text-button"
                    onClick={() => handleClose(false)}
                    sx={{ width: "120px" }}
                    variant="text">
                    Hủy
                  </Button>
                </DialogActions>
              </Box>
            )}
            {/*Close Button*/}
            <IconButton
              aria-label="close"
              onClick={() => handleClose(false)}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
                zline: 4,
              }}>
              <CloseIcon />
            </IconButton>
          </DialogContent>
      </Dialog>
    );
}

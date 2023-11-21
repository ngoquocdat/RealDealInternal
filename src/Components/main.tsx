import React from "react";
import "./index.scss";
import GTranslateIcon from "@mui/icons-material/GTranslate";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Box, Typography } from "@mui/material";
import { RealDealContext } from "./utils/context";
import NewsContainer from "./Features/News/newsContainer";
import AboutUsContainer from "./Features/AboutUs/AboutUsContainer";
import JoinRoomDialog from "./Features/JoinRoomDialog/JoinRoomDialog";
import SignUp from "./Features/Signup/SignUp";
import ChatRoomContainer from "./ChatRoom/ChatRoomContainer";
import SalesContainer from "./SalePage/salesContainer";
import testReadFile from "./utils/translate";
import StepsToJoinRoomContainer from "./StepsToJoinRoom/StepsToJoinRoomContainer";



export function uniq(a: any) {
  return a.sort().filter(function (item: any, pos: any, ary: any) {
    return !pos || item !== ary[pos - 1];
  });
}

export default function MainContainer() {
  const menuItems = [
    { title: "HOME", url: "/" },
    // { title: "PROPERTY", url: "/property" },
    // { title: "NEWS", url: "/news" },
    { title: "WHAT'S REALDEAL ?", url: "/about" },
    { title: "CHAT ROOM", url: "/chat" },
  ];
  const [isRegistered, setIsRegistered] = React.useState<boolean>(false);
  const [joinedRoom, setjoinedRoom] = React.useState<any[]>([]);
  const [isOpenJoinDialog, setIsOpenDialog] = React.useState<boolean>(false);
  const [gotoChatRoom, setGotoChatRoom] = React.useState<boolean>(false);
  const [realEstatePosts, setRealEstatePosts] = React.useState<any>(null);
  const [redirectUrl, setRedirectURl] = React.useState<string>("/");
  const [renderContent, setRenderContent] = React.useState<JSX.Element | null>(
    null
  );
  const [isProcessJoinRoom, setIsProcessJoinRoom] =
    React.useState<boolean>(false);
  const [selectedNews, setSelectedNews] = React.useState<any>(null);
  const [isOpenDetailsDialog, setIsOpenDetailsDialog] =
    React.useState<boolean>(false);
  const [selectedREs, setSelectedREs] = React.useState<any>(null);
  const [userCreatingPayment, setUserCreatingPayment] = React.useState<any>(null);

  const handleRenderContent = () => {
    let redirectComp = renderContent;
    if (window.location.pathname === "/news") {
      redirectComp = <NewsContainer />;
    } else if (window.location.pathname === "/chat") {
      redirectComp = <ChatRoomContainer />;
    } else if (window.location.pathname === "/about") {
      redirectComp = <AboutUsContainer />;
    } else if (window.location.pathname === "/property") {
      redirectComp = <div>Property</div>;
    } else if (window.location.pathname === "/") {
      redirectComp = <SalesContainer />;
    }
    setRenderContent(redirectComp);
  };

  const contextObj: any = {
    translate: testReadFile(),
    register: {
      isUserRegistered: isRegistered,
      setIsUserRegistered: setIsRegistered,
    },
    joinRoom: {
      userJoinedRoom: joinedRoom,
      setUserJoinedRoom: setjoinedRoom,
    },
    joinDialog: {
      isOpenJoinDialog: isOpenJoinDialog,
      toggleIsOpenDialog: setIsOpenDialog,
    },
    processJoinRoom: {
      isProcessJoinRoom: isProcessJoinRoom,
      setIsProcessJoinRoom: setIsProcessJoinRoom,
    },
    realEstatePosts: {
      posts: realEstatePosts,
      setPosts: setRealEstatePosts,
    },
    selectedNews: {
      selectedNews: selectedNews,
      setSelectedNews: setSelectedNews,
    },
    detailsDialog: {
      isOpenDetailsDialog: isOpenDetailsDialog,
      setIsOpenDetailsDialog: setIsOpenDetailsDialog,
    },
    handleRedirect: {
      redirect: handleRenderContent,
      setUrl: setRedirectURl,
    },
    selectedRealEstate: {
      selectedREs: selectedREs,
      setSelectedREs: setSelectedREs,
    },
    creatingPayment: {
      userCreatingPayment: userCreatingPayment,
      setUserCreatingPayment: setUserCreatingPayment,
    },
  };

  React.useEffect(() => {
    if (gotoChatRoom) {
      setIsRegistered(true);
      setjoinedRoom(["TDA_ConsultantNHA_2023"]);
    }
  }, [gotoChatRoom, setGotoChatRoom]);

  React.useEffect(() => {
    if (window.location.pathname !== redirectUrl) {
      const newUrl = window.location.origin + redirectUrl;
      window.history.replaceState(undefined, "RealDeal", newUrl);
      handleRenderContent();
    }
  }, [redirectUrl, setRedirectURl]);

  React.useEffect(() => {
    handleRenderContent();
  }, []);

  const renderMenuItems = () => {
    return menuItems.map((menuItem) => (
      <li
        key={`key-${menuItem}`}
        onClick={() => {
          setRedirectURl(menuItem.url);
          setGotoChatRoom(false);
          setIsProcessJoinRoom(false);
        }}
      >
        {menuItem.title}
      </li>
    ));
  };

  return (
    <RealDealContext.Provider value={contextObj}>
      <div className={`realdeal-main-container`}>
        <div className="grid">
          <article>
            <header className="header">
              {/** RealDeal logo */}
              <Box
                className="logo"
                component="img"
                src="https://newhome.qodeinteractive.com/wp-content/themes/newhome/assets/img/logo.svg"
              />
              {/** Main menu */}
              <div className="mainMenu-container">
                <div className="mainMenu">
                  <ul>{renderMenuItems()}</ul>
                  {/** Functions header */}
                  {/* <div className="functions-header">
                    <FavoriteBorderIcon />
                    <GTranslateIcon />
                  </div> */}
                </div>
                {/** Sign up zone */}
                <SignUp openJoinDialog={setIsOpenDialog}/>
              </div>
            </header>
            {gotoChatRoom ? (
              <div className="chatRoom"></div>
            ) : (
              <div className="contents">
                {isRegistered && selectedREs && isProcessJoinRoom ? (
                  <StepsToJoinRoomContainer
                    redirectToChatRoom={function (
                      value: React.SetStateAction<boolean>
                    ): void {
                      throw new Error("Function not implemented.");
                    }}
                  />
                ) : (
                  renderContent
                )}
                <div className="contacts">
                  <Typography>
                    <b>Address and Contact information</b>
                  </Typography>
                </div>
              </div>
            )}
          </article>
        </div>
      </div>
      {isOpenJoinDialog && (
        <JoinRoomDialog
          open={isOpenJoinDialog}
          selectedValue={""}
          onClose={() => {
            setIsOpenDialog(false);
          }}
        />
      )}
    </RealDealContext.Provider>
  );
}

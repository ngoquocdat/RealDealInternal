import React from "react";
import { Box, Typography } from "@mui/material";
import { IContext, RealDealContext } from "../utils/context";
import ListRealEstate from "../SalePage/listRealEstate";
import RealEstateItem from "../SalePage/realEstateItem";
import { splitRandomRes } from "Components/utils/rdutil";
import { RealEstates } from "Components/utils/datas";
import StepOne from "./Views/StepOne";
import StepTwo from "./Views/StepTwo";
import StepThree from "./Views/StepThree";
import StepFourth from "./Views/StepFourth";
import "./StepsToJoinRoomContainer.scss";


export interface ISettings {
  totalCounter: number;
  counter: number;
  apartmentPrice: number;
  discount: number;
}
export interface ISettingsRoom {
  settings: ISettings;
  setSettings: React.Dispatch<any>;
}

interface IStepjoinRoom {
  redirectToChatRoom: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function StepsToJoinRoomContainer(props: IStepjoinRoom) {
  const { redirectToChatRoom } = props;
  const { joinDialog, realEstatePosts, selectedRealEstate } =
    React.useContext<IContext>(RealDealContext);
  const [currentStep, setCurrentStep] = React.useState<number>(1);
  const [counterError, toggleErrorCounter] = React.useState<any[]>([]);
  const [selectedSettingRoom, setSelectedSettingRoom] = React.useState<any>({
    totalCounter: 300,
    counter: 20,
    apartmentPrice: 13000000000,
    discount: 12,
  });

  React.useEffect(() => {
    console.log(
      "selectedRealEstate?.selectedREs?.imgUrl: ",
      selectedRealEstate?.selectedREs
    );
  });

  const handleChangeStep = (stepNum: number) => {
    setCurrentStep(stepNum);
  };

  const renderStepTabs = () => {
    return (
      <Box className="steps">
        {[
          "Xác nhận thông tin",
          "Hình thức thanh toán",
          "Quét mã QR",
          "Xác nhận thanh toán",
        ].map((step: string, indx: number) => {
          return (
            <Box
              key={`step-${step}-${indx}`}
              className={`step-${indx} process-to-room ${
                ++indx === currentStep ? "active" : ""
              }`}
              sx={{}}
            >
              <Typography fontWeight={600}>{step}</Typography>
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <Box className="steps-wrapper">
      {renderStepTabs()}
      {currentStep === 1 && (
        <StepOne
          changeStep={handleChangeStep}
          errors={counterError}
          setError={toggleErrorCounter}
          settingsRoom={{
            settings: selectedSettingRoom,
            setSettings: setSelectedSettingRoom,
          }}
          images={[
            selectedRealEstate?.selectedREs?.image,
            selectedRealEstate?.selectedREs?.image,
            selectedRealEstate?.selectedREs?.image,
          ]}
        />
      )}
      {currentStep === 2 && (
        <StepTwo
          changeStep={handleChangeStep}
          errors={counterError}
          setError={toggleErrorCounter}
          settings={selectedSettingRoom}
        />
      )}
      {currentStep === 3 && <StepThree changeStep={handleChangeStep} />}
      {currentStep === 4 && <StepFourth toChatRoom={redirectToChatRoom} />}
      <RealEstateItem
        realestate={selectedRealEstate?.selectedREs}
        posts={[]}
        onBooking
      />
      <hr
        style={{
          textAlign: "left",
          marginLeft: 0,
          border: "1px solid rgba(0, 0, 0, 0.25)",
        }}
      />
      <Box className="similar-projects">
        <ListRealEstate data={splitRandomRes(RealEstates)} />
      </Box>
    </Box>
  );
}

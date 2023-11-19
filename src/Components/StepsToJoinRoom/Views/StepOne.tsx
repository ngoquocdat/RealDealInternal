import React from "react";
import { Box, Button, Chip, TextField, Typography } from "@mui/material";
import { roomInfo } from "../datas";
import { IContext, RealDealContext } from "../../utils/context";
import { ISettingsRoom } from "../StepsToJoinRoomContainer";
import { calculateDiscountPrice, handleScrollToTop, } from "Components/utils/rdutil";
import { IRealEstateProject, formatter } from "Components/utils/datas";

interface IStepOne {
  errors: any;
  settingsRoom: ISettingsRoom;
  realEstateProjects: IRealEstateProject[]
  setError: (error: any) => void;
  changeStep: (stepNum: number) => void;
  images: string[];
}

export default function StepOne(props: IStepOne) {
  const { images, errors, settingsRoom, setError, changeStep, realEstateProjects } = props;
  const { processJoinRoom, selectedRealEstate } =
    React.useContext<IContext>(RealDealContext);
  const [memberCount, setMemberCount] = React.useState<number>(
    settingsRoom.settings.counter
  );
  const [discountPrice, setDiscountPrice] = React.useState<any>(null);
  const stepOneRef = React.useRef(null);

  const handleDiscountPrice = (memberCounter: number) => {
    const members = Array.from(
      { length: memberCounter },
      (_, idx) => `${++idx}`
    );
    const _priceTable = members.map((mem, index) => {
      const priceobj = calculateDiscountPrice(
        index,
        selectedRealEstate?.selectedREs,
        members.length
      );
      return priceobj;
    });
    console.log("priceTable - final price: ", _priceTable);
    return setDiscountPrice(_priceTable[0]);
  };

  React.useEffect(() => {
    handleDiscountPrice(memberCount);
  }, [memberCount]);

  React.useEffect(() => {
    (() => handleScrollToTop())();
  });

  return (
    <Box className="content-container" ref={stepOneRef}>
      <Box className="contents">
        <Box className="room-info">
          {roomInfo.map((info) => (
              <Box className="info">


              </Box>
          ))}
        </Box>
      </Box>
      <Box className="real-estate-image">
        {images.map((box) => (
          <Box
            sx={{
              backgroundImage: `url(${box})`,
              backgroundSize: "cover",
              height: "270px",
            }}
          />
        ))}
      </Box>
      <Box className="room-settings">
        <Box className="room-counter">
          <Typography
            sx={{
              textAlign: "initial",
              paddingBottom: "15px",
              fontWeight: 600,
            }}
          >
            Chọn số lượng căn hộ để tạo ROOM
          </Typography>
          <Box className="select-room">
            <TextField
              error={
                errors.filter(
                  (error: any) => error.fieldError === "roomCounter"
                )?.length > 0
              }
              required
              id="phone-number-outlined"
              label="Số lượng căn hộ: "
              size="small"
              defaultValue={settingsRoom.settings.counter}
              onChange={(evt?: any) => {
                setMemberCount(evt?.target.value);
                if (
                  evt?.target.value > 30 ||
                  evt?.target.value < 10 ||
                  !evt?.target.value
                ) {
                  setError([
                    ...errors,
                    {
                      isError: true,
                      fieldError: "roomCounter",
                    },
                  ]);
                } else {
                  const _discount =
                    (evt?.target.value /
                      selectedRealEstate?.selectedREs?.total) *
                    evt?.target.value;
                  setError(
                    errors.filter(
                      (error: any) => !(error.fieldError === "roomCounter")
                    )
                  );
                  settingsRoom.setSettings({
                    ...settingsRoom.settings,
                    discount: (_discount / 10) * 15,
                    counter: Number(evt?.target.value),
                  });
                }
              }}
            />
            /{" "}
            <Typography>
              {selectedRealEstate?.selectedREs?.propertyTotal}
            </Typography>
          </Box>
          {errors.find((error: any) => error.fieldError === "roomCounter") ? (
            <Typography sx={{ color: "red", paddingTop: "10px" }}>
              Dự án chỉ được đăng ký tối thiểu 10 và tối đa 30 căn ( sản phẩm
              bất động sản ) cho một phòng tư vấn.
            </Typography>
          ) : (
            ""
          )}
        </Box>
        <Box>
          <Typography>Giá bất động sản ( tính trên đơn vị căn hộ )</Typography>
          <Typography sx={{ fontWeight: 500, fontSize: "32px" }}>
            {`${formatter.format(
              selectedRealEstate?.selectedREs?.floorArea *
                selectedRealEstate?.selectedREs?.pricePerSquare
            )} VND`}
          </Typography>
        </Box>
        <Box>
          <Typography>
            Giá bất động sản chiết khấu dự kiến cao nhất ( tính trên đơn vị căn
            hộ )
          </Typography>
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: "32px",
              color: "#FBB713",
              textDecoration: `${errors?.length > 0 ? "line-through" : "auto"}`,
            }}
          >
            {`${
              discountPrice && errors?.length === 0
                ? discountPrice.finalPrice
                : formatter.format(
                    selectedRealEstate?.selectedREs?.floorArea *
                      selectedRealEstate?.selectedREs?.pricePerSquare
                  )
            } VND`}
          </Typography>
        </Box>
      </Box>
      <Box className="buttons">
        <Button
          disabled={errors?.length > 0}
          sx={{
            backgroundColor: `${
              errors?.length > 0 ? "rgba(0, 0, 0, 0.12) !important" : "#FBB713"
            }`,
          }}
          className="signup rd-buttons contained-button"
          variant={"contained"}
          onClick={(evt?: React.MouseEvent) => {
            changeStep(2);
          }}>
          Tiếp tục tạo ROOM
        </Button>
        <Button
          className="signin rd-buttons text-button"
          variant="text"
          onClick={(evt?: React.MouseEvent) => {
            processJoinRoom.setIsProcessJoinRoom(false);
            selectedRealEstate?.setSelectedREs(null);
          }}
        >
          Hủy và quay lại trang tin
        </Button>
      </Box>
    </Box>
  );
}

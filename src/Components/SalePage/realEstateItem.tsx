import { Box, Button, Link, Typography } from "@mui/material";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BathtubIcon from "@mui/icons-material/Bathtub";
import BedIcon from "@mui/icons-material/Bed";
import SchoolIcon from "@mui/icons-material/School";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import AddRoadIcon from "@mui/icons-material/AddRoad";
import FactoryIcon from "@mui/icons-material/Factory";
import WaterIcon from "@mui/icons-material/Water";
import HomeIcon from "@mui/icons-material/Home";
import React, { useEffect } from "react";
import { IRealEstates } from "../utils/datas";
import { IContext, RealDealContext, lorem } from "../utils/context";
import { calculateDiscountPrice, getPrice } from "Components/utils/rdutil";
import { useViewport } from "../../contexts/ViewportContext";
interface IRealEstateItem {
  onBooking?: boolean;
  scrollTop?: () => void;
  realestate: IRealEstates;
  posts: IRealEstates[];
}

export default function RealEstateItem(props: IRealEstateItem) {
  const { realestate, posts, onBooking, scrollTop } = props;
  const { selectedRealEstate, detailsDialog } =
    React.useContext<IContext>(RealDealContext);
  const highestDiscountPrice = calculateDiscountPrice(0, realestate, 30);
  const { isDesktop, isTablet } = useViewport();

  const renderComp = (rs: IRealEstates) => {
    return rs?.facilities?.others.map((place: any) => {
      if (place === "School") {
        return <SchoolIcon sx={{ padding: "0px 5px" }} />;
      }
      if (place === "Market") {
        return <LocalGroceryStoreIcon sx={{ padding: "0px 5px" }} />;
      }
      if (place === "Hospital") {
        return <LocalHospitalIcon sx={{ padding: "0px 5px" }} />;
      }
      if (place === "Highway") {
        return <AddRoadIcon sx={{ padding: "0px 5px" }} />;
      }
      if (place === "IndustryZone") {
        return <FactoryIcon sx={{ padding: "0px 5px" }} />;
      }
      if (place === "River" || place === "Pool") {
        return <WaterIcon sx={{ padding: "0px 5px" }} />;
      }
      return null;
    });
  };

  return (
    <Box
      sx={{
        // width: isDesktop ? "30%": (isTablet ? "48%" : "100%"),
        height: "fit-content",
        flex: "0 1 calc(33% - 1em)",
        textAlign: "left",
        fontFamily: "Poppins,sans-serif",
        // margin: "auto",
        paddingTop: "60px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          position: "relative",
          display: "flex",
          gap: "40px",
        }}
      >
        <Button
          variant="contained"
          sx={{
            color: "#fff",
            position: "absolute",
            top: "20px",
            right: "-1%",
            backgroundColor: `${
              realestate?.isPopular
                ? "#d25319"
                : !realestate?.isPopular &&
                  realestate?.propertyTotal - realestate?.capacity <
                    realestate?.propertyTotal / 3
                ? "#51d219"
                : "#ffcc41"
            }`,
          }}
        >
          {realestate?.isPopular ? (
            <>
              <LocalFireDepartmentIcon /> Most Popular
            </>
          ) : null}
          {!realestate?.isPopular &&
          realestate?.propertyTotal - realestate?.capacity <
            realestate?.propertyTotal / 3
            ? "SOLD OUT SOON"
            : null}
          {!realestate?.isPopular &&
          !(
            realestate?.propertyTotal - realestate?.capacity <
            realestate?.propertyTotal / 3
          )
            ? "ON SELL"
            : null}
        </Button>
        <Box
          component="img"
          src={realestate?.image}
          sx={{
            width: `${
              selectedRealEstate?.selectedREs && onBooking ? "50%" : "inherit"
            }`,
            height: "50%",
          }}
        />
        {selectedRealEstate?.selectedREs && onBooking ? (
          <>
            <Box
              component="img"
              src={realestate?.apartmentMap}
              sx={{
                width: `${
                  selectedRealEstate?.selectedREs && onBooking
                    ? "50%"
                    : "inherit"
                }`,
                height: "50%",
              }}
            />
            <Box
              component="img"
              src={realestate?.propertyImages[0]}
              sx={{
                width: `${
                  selectedRealEstate?.selectedREs && onBooking
                    ? "50%"
                    : "inherit"
                }`,
                height: "50%",
              }}
            ></Box>
          </>
        ) : (
          ""
        )}
      </Box>
      <Typography
        sx={{
          padding: "10px 0px 0px",
          display: "flex",
          alignItems: "baseline",
        }}
      >
        <LocationOnIcon sx={{ padding: "0px 8px", fill: "#ffcc41" }} />
        <Link href="#" sx={{ textDecoration: "none" }}>
          {realestate?.location}
        </Link>
      </Typography>
      <Typography
        variant="h5"
        sx={{
          padding: "10px 0px 20px",
          fontFamily: "inherit",
          fontSize: 26,
        }}
      >
        {realestate?.title}
      </Typography>
      <Box sx={{ display: "flex", gap: "40px", paddingBottom: "20px" }}>
        <Typography>
          <em>
            <b>Total:</b> {realestate?.propertyTotal}
          </em>
        </Typography>
        <Typography>
          <em>
            <b>Cap:</b> {realestate?.capacity}
          </em>
        </Typography>
      </Box>
      <Typography sx={{ paddingBottom: "20px" }}>
        <em>Facilities:</em>{" "}
        <Box
          sx={{
            display: "inline-flex",
            verticalAlign: "middle",
            height: "30px",
          }}
        >
          <HomeIcon />
          <Typography sx={{ padding: "0px 15px 0px 5px" }}>
            <em>
              <span>
                {realestate?.floorArea}
                <span>
                  m<sup>2</sup>
                </span>
              </span>
            </em>
          </Typography>
          <BathtubIcon />
          <Typography sx={{ padding: "0px 15px 0px 5px" }}>
            <em>{realestate?.facilities?.bathroom}</em>
          </Typography>
          <BedIcon />
          <Typography sx={{ padding: "0px 15px 0px 5px" }}>
            <em>{realestate?.facilities?.bedroom}</em>
          </Typography>
        </Box>
      </Typography>
      <Box sx={{ display: "flex" }}>
        <Typography sx={{ fontSize: "inherit", paddingBottom: "20px" }}>
          <em>Near places:</em>{" "}
        </Typography>
        {renderComp(realestate)}
      </Box>
      <Typography sx={{ paddingBottom: "20px", width: "inherit" }}>
        <em>Address: {realestate?.address}</em>
      </Typography>
      <Typography
        sx={{
          width: "inherit",
          overflow: "hidden",
          height: `${posts?.length ? 100 : "fit-content"}`,
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: `${posts?.length ? 4 : "inherit"}`,
        }}
      >
        {posts?.length ? realestate?.description : lorem.generateParagraphs(10)}
      </Typography>
      <Box
        sx={{
          width: "80%",
          display: "flex",
          borderTop: "solid 1px rgb(0 0 0 / 27%)",
          marginTop: "10px",
          alignItems: "center",
          placeContent: "space-between",
          position: "relative",
        }}
      >
        <Typography
          sx={{
            fontSize: `${posts?.length ? "x-large" : "xxx-large"}`,
            fontWeight: 600,
            color: "#ffcc41",
            padding: "25px 0px 25px",
            margin: "auto 0px",
          }}
        >
          <Box>
            {getPrice(
              (realestate?.pricePerSquare * realestate.floorArea) as number
            )}
          </Box>
          <Box sx={{ color: "#ff4141", paddingTop: "15px" }}>
            <i>
              <b style={{ fontSize: "20px" }}>Best price buy in group:</b>
              <br />
              {highestDiscountPrice?.finalPrice}
            </i>
          </Box>
        </Typography>
        {posts?.length ? (
          <Button
            variant="contained"
            size="small"
            sx={{
              height: "fit-content",
              backgroundColor: "#ffcc41",
              fontWeight: 700,
              fontSize: "16px",
              bottom: "40px",
              position: "absolute",
              right: "-60px",
            }}
            onClick={() => {
              scrollTop && scrollTop();
              selectedRealEstate?.setSelectedREs(
                posts.find((p) => p.id === realestate?.id)
              );
              detailsDialog?.setIsOpenDetailsDialog(true);
            }}
          >
            Details
          </Button>
        ) : (
          <Box>
            <Typography sx={{ fontWeight: 600 }}>
              <i>
                List users booked{" "}
                <b style={{ color: "#ffbd41", fontSize: "24px" }}>
                  {realestate?.title}
                </b>
                :
              </i>
            </Typography>
            <ol>
              {[
                "Nguyễn Vũ Hoàng",
                "Đinh Thị Thắm",
                "Võ Hoài Thu",
                "Trần Quốc Sang",
                "User Anonymous 3",
                "User Anonymous 128",
              ].map((name) => (
                <Typography>{name}</Typography>
              ))}
            </ol>
            <Typography>
              <i>Another users +37</i>
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

import React from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  SxProps,
  Typography,
  styled,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import BathtubIcon from "@mui/icons-material/Bathtub";
import BedIcon from "@mui/icons-material/Bed";
import SchoolIcon from "@mui/icons-material/School";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import AddRoadIcon from "@mui/icons-material/AddRoad";
import FactoryIcon from "@mui/icons-material/Factory";
import WaterIcon from "@mui/icons-material/Water";
import { getPrice } from "./main";

const theBestProperties = [
  {
    title: "South Sun House",
    imgUrl:
      "https://newhome.qodeinteractive.com/wp-content/uploads/2023/03/list-sidebar-img-1-460x300.jpg",
    gridSize: 7,
    addr: "Ward 12, District Phu Nhuan, Ho Chi Minh City",
    price: 6000000000,
    size: "260",
    bathRoom: 3,
    bedRoom: 5,
    nearPlaces: [
      "School",
      "Market",
      "Highway",
      "River",
      "Hospital",
      "IndustryZone",
    ],
    sold: 40,
  },
  {
    title: "Mountain Cabin",
    imgUrl:
      "https://newhome.qodeinteractive.com/wp-content/uploads/2023/03/main-home-property-460x300.jpg",
    gridSize: 5,
    addr: "Ward 9, District 7, Ho Chi Minh City",
    price: 1890000000,
    size: "65",
    bathRoom: 2,
    bedRoom: 1,
    nearPlaces: ["School", "Highway", "River", "Hospital"],
    sold: 30,
  },
  {
    title: "Pine Forest Bungalow",
    imgUrl:
      "https://newhome.qodeinteractive.com/wp-content/uploads/2023/03/list-sidebar-img-2-460x300.jpg",
    gridSize: 4,
    addr: "Ward Tan Kieng, District 2, Ho Chi Minh City",
    price: 1800000000,
    size: "57",
    bathRoom: 2,
    bedRoom: 1,
    nearPlaces: ["School", "Market", "Hospital", "IndustryZone"],
    sold: 86,
  },
  {
    title: "White Stylish Loft",
    imgUrl:
      "https://newhome.qodeinteractive.com/wp-content/uploads/2023/03/list-half-map-image-3-460x300.jpg",
    gridSize: 4,
    addr: "Ward Hoa Binh, District Hoan Kiem, Ha Noi City",
    price: 3100000000,
    size: "89",
    bathRoom: 3,
    bedRoom: 2,
    nearPlaces: ["School", "Market", "Hospital", "IndustryZone"],
    sold: "SOLD OUT",
  },
  {
    title: "Avenue Apartment",
    imgUrl:
      "https://newhome.qodeinteractive.com/wp-content/uploads/2023/03/list-sidebar-img-2-460x300.jpg",
    gridSize: 4,
    addr: "Ward Ton That, District Bach Mai, Ha Noi City",
    price: 2500000000,
    size: "76",
    bathRoom: 2,
    bedRoom: 2,
    nearPlaces: ["School", "Market", "Hospital", "Highway", "IndustryZone"],
    sold: 15,
  },
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  paddingTop: theme.spacing(0.5),
  color: theme.palette.text.secondary,
}));

interface IStyleDefined {
  [k: string]: SxProps;
}

const styleDefined = (): IStyleDefined => {
  return {
    backgroundImage: {
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      height: "300px",
      position: "relative",
    },
    contentWrapper: {
      backgroundColor: "rgba(0, 0, 0, 0.3)",
      width: "100%",
      height: "100%",
      textAlign: "left",
      position: "relative",
      margin: "auto",
    },
    contentText: {
      fontSize: "18px",
      display: "inline-block",
      alignSelf: "flex-end",
      textAlign: "left",
    },
  };
};

export default function BestChoiceRealEstate() {
  const sxStyled = styleDefined();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography
        sx={{
          fontSize: "42px",
          fontWeight: 500,
          fontFamily: "Poppins,sans-serif",
          textAlign: "initial",
          marginLeft: "220px",
          padding: "20px 0px 30px 0px",
        }}
      >
        Our best choice of <br />
        popular <b>real estate</b>
      </Typography>
      <Grid container spacing={2} sx={{ maxWidth: "100vw", margin: "auto" }}>
        {theBestProperties.map((property) => {
          return (
            <Grid item xs={property.gridSize}>
              <Item
                sx={{
                  backgroundImage: `url(${property.imgUrl})`,
                  ...sxStyled.backgroundImage,
                }}
              >
                <Grid container spacing={2} sx={{ ...sxStyled.contentWrapper }}>
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid
                        item
                        xs={12}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          paddingTop: "0px !important",
                        }}
                      >
                        <Typography
                          sx={{
                            ...sxStyled.contentText,
                            padding: "10px",
                            color: "#fff",
                            fontSize: "30px",
                          }}
                        >
                          {property.title}
                        </Typography>
                        <Button
                          variant="contained"
                          sx={{
                            height: "fit-content",
                            paddingRight: "20px",
                            backgroundColor: "#ffcc41",
                            fontWeight: 600,
                            right: "-12px",
                            top: "18px",
                          }}
                        >
                          Details
                        </Button>
                      </Grid>
                      {/** Properties */}
                      <Grid item xs={12}>
                        <Box
                          sx={{
                            display: "inline-flex",
                            verticalAlign: "middle",
                            height: "30px",
                          }}
                        >
                          <HomeIcon sx={{ color: "#fff" }} />
                          <Typography
                            sx={{ color: "#fff", padding: "0px 5px 10px" }}
                          >
                            <span>
                              {property.size}
                              <span>
                                m<sup>2</sup>
                              </span>
                            </span>
                          </Typography>
                          <BathtubIcon sx={{ color: "#fff" }} />
                          <Typography
                            sx={{ color: "#fff", padding: "0px 5px 10px" }}
                          >
                            {property.bathRoom}
                          </Typography>
                          <BedIcon sx={{ color: "#fff" }} />
                          <Typography
                            sx={{ color: "#fff", padding: "0px 5px 10px" }}
                          >
                            {property.bedRoom}
                          </Typography>
                        </Box>
                      </Grid>
                      {/** Facilities */}
                      <Grid
                        item
                        xs={12}
                        sx={{
                          display: "flex",
                        }}
                      >
                        <Typography sx={{ fontSize: "18px", color: "#fff" }}>
                          Near places:{" "}
                        </Typography>
                        {property.nearPlaces.map((place) => {
                          if (place === "School") {
                            return (
                              <SchoolIcon
                                sx={{ padding: "0px 5px", color: "#fff" }}
                              />
                            );
                          }
                          if (place === "Market") {
                            return (
                              <LocalGroceryStoreIcon
                                sx={{ padding: "0px 5px", color: "#fff" }}
                              />
                            );
                          }
                          if (place === "Hospital") {
                            return (
                              <LocalHospitalIcon
                                sx={{ padding: "0px 5px", color: "#fff" }}
                              />
                            );
                          }
                          if (place === "Highway") {
                            return (
                              <AddRoadIcon
                                sx={{ padding: "0px 5px", color: "#fff" }}
                              />
                            );
                          }
                          if (place === "IndustryZone") {
                            return (
                              <FactoryIcon
                                sx={{ padding: "0px 5px", color: "#fff" }}
                              />
                            );
                          }
                          if (place === "River") {
                            return (
                              <WaterIcon
                                sx={{ padding: "0px 5px", color: "#fff" }}
                              />
                            );
                          }
                        })}
                      </Grid>
                      <Typography
                        sx={{
                          color: "#fff",
                          margin: "20px 0px 0px 15px",
                          padding: "5px",
                          fontWeight: 700,
                          fontSize: "24px",
                          borderRadius: "5px",
                          backgroundColor: "#ffcc41c7",
                        }}
                      >
                        SOLD: {property.sold}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      ...sxStyled.contentText,
                      paddingTop: "0px !important",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      sx={{
                        ...sxStyled.contentText,
                        color: "#fff",
                        padding: "10px",
                      }}
                    >
                      {property.addr}
                    </Typography>
                    <Box
                      sx={{
                        backgroundColor: "#fff",
                        fontWeight: 600,
                        padding: "5px",
                        margin: "10px",
                        borderRadius: "5px",
                        fontFamily: "Georgia, serif",
                      }}
                    >
                      {getPrice(property.price)}
                    </Box>
                  </Grid>
                </Grid>
              </Item>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
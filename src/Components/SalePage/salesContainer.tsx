import React from "react";
import { Box, Typography } from "@mui/material";
import BestChoiceRealEstate from "./bestChoiceRealEstate";
import ListRealEstate from "./listRealEstate";
import RDSearch from "../Features/Search";
import FullScreenDialog from "../Features/DetailsDialog";
import { IContext, RealDealContext } from "../utils/context";
import { IRealEstates, RealEstates } from "Components/utils/datas";
import { useViewport } from "../../contexts/ViewportContext";

export default function SalesContainer() {
  const [dataBestChoice, setDataBestChoice] = React.useState<IRealEstates[]>(
    []
  );
  const [listRes, setListRes] = React.useState<IRealEstates[]>([]);
  const [listSearch, setListSearch] = React.useState<any>(null);
  const { selectedRealEstate } = React.useContext<IContext>(RealDealContext);
  const {isDesktop} = useViewport();

  const handleBannerSearch = (searchOpts: any) => {
    console.log("handleBannerSearch: ", searchOpts);
  };

  const handleListRSSearch = (searchOpts: any) => {
    setListSearch(searchOpts);
  };

  const SalesBanner = () => {
    return (
      <Box
        sx={{
          width: "100%",
          height: "550px",
          margin: "auto",
          borderRadius: "10px",
          backgroundImage:
            "url(https://newhome.qodeinteractive.com/wp-content/uploads/2023/03/home-rev-img-2.jpg)",
          backgroundSize: "cover",
        }}
      >
        <Typography
          sx={{
            color: "#fff",
            fontSize: 36,
            top: "60%",
            position: "relative",
            right: isDesktop? "30%" : "0%",
          }}
        >
          Find you{" "}
          <em>
            <b>best places</b>
          </em>
        </Typography>
        <RDSearch
          handleSearchChange={handleBannerSearch}
          isShowProperty
          styling={{
            borderRadius: "3px",
            backgroundColor: "rgba(225, 225, 225, 0.3)",
            border: "solid 4px rgba(225, 225, 225, 1)",
            top:"60%",
            right: isDesktop ? "20%" : "0%",
          }}
        />
      </Box>
    );
  };

  React.useEffect(() => {
    const bestRes = RealEstates.slice(0, 5);
    const listRes = RealEstates.slice(5, RealEstates.length);
    setDataBestChoice(bestRes);
    setListRes(listRes);
  }, []);

  return (
    <>
      {/** Banner */}
      <SalesBanner />
      {/** Best choice real estates */}
      <BestChoiceRealEstate data={dataBestChoice} />
      {/** List real estate on sale */}
      <ListRealEstate
        data={listRes}
        handleListSearch={handleListRSSearch}
        searchOpts={listSearch}
      />
      <FullScreenDialog
        newsSelected={undefined}
        isRealestate={selectedRealEstate?.selectedREs ? true : false}
      />
    </>
  );
}

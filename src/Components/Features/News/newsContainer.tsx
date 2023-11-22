import { Box } from "@mui/material";
import React, { useEffect } from "react";
import Carousel from "../Carousel";
import RealEstateRegions from "../RealEstateRegions";
import ListRealEstate from "../../SalePage/listRealEstate";
import RealNews from ".";
import { splitRandomRes } from "Components/utils/rdutil";
import { RealEstates } from "Components/utils/datas";
import { RealEstateService } from "services/RealEstateService";

export default function NewsContainer() {
  const [realEstateData, setRealEstateData] = React.useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await RealEstateService().get();
      setRealEstateData(data);
    };
    fetchData();
  }
  , []);

  return (
    <Box>
      {/** CAROUSEL */}
      <Carousel />
      <Box>
        {/** REAL ESTATE REGIONS */}
        <RealEstateRegions />
        {/** SEARCH - NEWS */}
        <RealNews
          newsCounter={["first", "second", "third", "fourth", "five", "six"]}
        />
        {/** Real Estate on Sale */}
        <Box sx={{ paddingTop: "50px" }}>
          <ListRealEstate
            data={splitRandomRes(RealEstates)}
            handleListSearch={function (searchOpts: any): void {
              throw new Error("Function not implemented.");
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

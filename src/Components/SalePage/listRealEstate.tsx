import React from "react";
import { Box, Typography } from "@mui/material";

import { IRealEstates, RealEstates } from "../utils/datas";
import RDSearch from "../Features/Search";
import { IContext, RealDealContext } from "../utils/context";
import RealEstateItem from "./realEstateItem";
interface IListRealEstate {
  length?: number;
  handleListSearch?: (searchOpts: any) => void;
  scrollTop?: () => void;
  searchOpts?: any;
  data: IRealEstates[];
}

export default function ListRealEstate(props: IListRealEstate) {
  const { handleListSearch, scrollTop, searchOpts, length, data } = props;
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const [posts, setPosts] = React.useState<IRealEstates[]>(data);
  const [listRsRef, setListRsRef] = React.useState<number[]>([]);
  const { selectedRealEstate } = React.useContext<IContext>(RealDealContext);

  const handleRenderPagingNum = () => {
    const numberOfPages = (): number => {
      let pages = Math.round(
        (searchOpts?.searchLocation && searchOpts?.searchLocation !== "none"
          ? posts
          : RealEstates
        ).length / (length || 6)
      );
      const getDecimalVal = pages.toString().indexOf(".");
      const decimalPart = pages.toString().substring(getDecimalVal + 1);

      return Number(decimalPart) > 1 ? ++pages : pages;
    };
    const _listRsRef = Array.from(Array(numberOfPages()).keys());
    setListRsRef(_listRsRef);
  };

  const handleNumberPosts = () => {
    let posts = null;
    const numberPosts = length || 6;
    if (searchOpts?.searchLocation && searchOpts?.searchLocation !== "none") {
      posts = RealEstates.filter((rs: any) =>
        rs.searchKey.includes(searchOpts?.searchLocation)
      ).slice(
        currentPage * numberPosts,
        currentPage * numberPosts + numberPosts
      );
    } else {
      posts = RealEstates.slice(
        currentPage * numberPosts,
        currentPage * numberPosts + numberPosts
      );
    }
    setPosts(posts);
  };

  React.useEffect(() => {
    if (!(length && length <= 6)) {
      handleRenderPagingNum();
    }
  }, [posts, searchOpts]);

  React.useEffect(() => {
    handleNumberPosts();
  }, [searchOpts]);

  React.useEffect(() => {
    console.log("ListRealEstate: ", posts);
  }, []);

  const renderPaging = () => {
    return (
      <Box
        sx={{
          height: "40px",
          display: "flex",
          alignItems: "center",
          flex: "0 1 100%",
          justifyContent: "flex-end",
        }}
      >
        {listRsRef.map((p) => (
          <h3
            className="paging-number"
            onClick={() => setCurrentPage(p)}
            style={{
              cursor: "pointer",
              padding: "0px 20px",
              textDecoration: `${p === currentPage ? "underline" : ""}`,
            }}
          >
            <b>{p + 1}</b>
          </h3>
        ))}
      </Box>
    );
  };

  React.useEffect(() => {
    handleNumberPosts();
  }, [currentPage]);

  return (
    <Box
      sx={{
        width: "80%",
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
        justifyContent: "space-between",
        margin: "auto",
      }}
    >
      <Typography
        sx={{
          fontSize: "32px",
          flex: "0 1 100%",
          fontWeight: 200,
          padding: "40px 0px 20px 0px",
          textAlign: "right",
          right: "10%",
          position: "relative",
        }}
      >
        <em>Find The House of Your Dream</em> <br />
        <b style={{ fontSize: "36px" }}>Using Our Platform</b>
      </Typography>
      {handleListSearch && (
        <RDSearch
          handleSearchChange={handleListSearch}
          styling={{ flex: "0 1 100%", padding: "30px 0px !important" }}
        />
      )}
      <Box sx={{
        width: "100%",
        display: "flex",
        alignItems: "start",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}>
        {posts?.length
          ? posts.map((rs) => {
              console.log("posts posts : ", posts);
              return (
                <RealEstateItem
                  scrollTop={scrollTop}
                  realestate={rs}
                  posts={posts}
                />
              );
            })
          : ""}
      </Box>
      {renderPaging()}
    </Box>
  );
}

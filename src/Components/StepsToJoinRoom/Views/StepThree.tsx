import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { IContext, RealDealContext } from "../../utils/context";

interface IStepThree {
  changeStep: (stepNum: number) => void;
}

export default function StepThree(props: IStepThree) {
  const { changeStep } = props;
  const { processJoinRoom, creatingPayment, selectedRealEstate } = React.useContext<IContext>(RealDealContext);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      changeStep(4);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box className="content-container">
      <Box
        component="img"
        src="https://img.freepik.com/premium-vector/sample-qr-code-icon_322958-669.jpg?w=350"
        sx={{ gridColumn: "1/3" }}
      />
      <Box sx={{ textAlign: "left", gridColumn: "3/6", lineHeight: "1.3" }}>
        <Typography
          variant="h6"
          sx={{
            paddingBottom: "30px",
            fontWeight: 600,
          }}
        >
          Hướng dẫn thanh toán
        </Typography>
        <Typography sx={{ padding: "0px 10px 0px" }}>
          1. Đăng nhập ứng dụng thanh toán ( ứng dụng MOMO hoặc Ngân hàng )
        </Typography>
        <Typography sx={{ padding: "0px 10px 0px" }}>
          2. Chọn quét mã QR code
        </Typography>
        <Typography sx={{ padding: "0px 10px 0px" }}>
          3. Tiến hành quét mã QR code để thực hiện thanh toán
        </Typography>
        <Typography sx={{ padding: "0px 10px 0px" }}>
          4. Xác nhận thanh toán
        </Typography>
        <Typography
          sx={{ padding: "0px 10px 0px", fontWeight: 600, paddingTop: "50px" }}>
          Thông tin ghi chú khi thanh toán:
        </Typography>
        <Typography sx={{ padding: "10px 10px 0px" }}>
          {selectedRealEstate?.selectedREs?.title}
        </Typography>
      </Box>
      <Box
        sx={{
          gridColumn: "1/6",
          paddingTop: "20px",
          display: "flex",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <Button
          className="signin rd-buttons text-button"
          variant="text"
          onClick={() => 
          {
            creatingPayment.setUserCreatingPayment(null);
            processJoinRoom.setIsProcessJoinRoom(false);
          }}>
          Hủy và quay lại trang tin
        </Button>
      </Box>
    </Box>
  );
}

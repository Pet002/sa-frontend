import React from "react";
import { Button, Container } from "@mui/material";
import { Typography } from "@mui/material";
import re from "../../image/receipt.png"; 
import { Link as RouterLink } from "react-router-dom";
// import { createStyles, makeStyles, Theme } from "@mui/material/styles";

function PaymentHome() {
  
  

  return (
    <div>
      <Container className="container" maxWidth="md">
        <Typography align= "center">
            <img style={{width: "500px"}}
            className="img"
            src={re}></img>
        </Typography>
     
        <h4>Requirements</h4>
        <p>
        ระบบชำระเงินเป็นระบบย่อยที่จะรับข้อมูลชนิดและจำนวนของยามาจากระบบจ่ายยาโดยจะระบุชนิดและจำนวนของยา
        จากนั้นดึงข้อมูลราคาของชนิดยานั้นมาจากระบบคลังยาและคำนวณราคาที่จะต้องทำการชำระเงิน 
        มีให้เลือกประเภทการชำระเงินแบบทั้งเงินสดหรือแบบออนไลน์ Payment จากนั้นทำการบันทึกข้อมูลจำนวนเงินที่ผู้ป่วยจ่ายลงใน 
        Database ของการชำระเงินและทำการออกใบเสร็จให้ผู้ชำระเงิน
        </p> 
       
        <Button component={RouterLink} to="/Payment" variant="contained">ประวัติการชำระเงิน</Button> &nbsp;
        <Button component={RouterLink} to="/PaymentCreate" variant="contained">ระบบชำระเงิน</Button>&nbsp;
        

      </Container>
    </div>
  );
}
export default PaymentHome;
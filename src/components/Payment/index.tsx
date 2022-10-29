import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ReceiptInterface } from "../../models/IReceipt";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { MedicineInterface } from "../../models/IMedicine";
import { Button } from "@mui/material";
import { PrescriptionInterface } from "../../models/IPrescription";
function Payment() {
  const [Receipt, setHistory] = React.useState<ReceiptInterface[]>([]);

  const [medicine, setMedicine] = React.useState<MedicineInterface[]>([]);
  const [prescription, setPrescription] = React.useState<PrescriptionInterface[]>([])

  const getMedicine = async () => {
    const apiUrl = "http://localhost:8080/payment/medicine";
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    fetch(apiUrl, requestOptions)
    .then((res) => res.json())
    .then((res) => {
      if(res.data){
        setMedicine(res.data)
      }else{
        console.log("else")
      }
    })
  }

  const getPrescription = () => {
    const apiUrl = "http://localhost:8080/payment/prescriptions";
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setPrescription(res.data);
          // console.log(res.data);
        } else {
          console.log("else");
        }
      });

  }

  const getReceiptHistory = async () => {
    const apiUrl = "http://localhost:8080/payment/receipts";
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setHistory(res.data);
          // console.log(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    getReceiptHistory();
    getMedicine();
    getPrescription();
  }, []);



  <h1>Patient</h1>;

  const test = () => {
    console.log(Receipt)
  }
  const show = (id :number) => {
    //เงื่อนไขแรก ค้นหา prescription idจากที่โหลดมาทั้งหมดโดยเอาที่ค่า ID ตรงกับที่รับมาคือ PrescriptionID
    let medid = prescription.filter( (pre) => (pre.ID === id) ).at(0)?.MedicineID
    //เงื่อนไขแรก ค้นหา medid จากที่โหลดมาทั้งหมด ให้ตรงกับ medid ?ี่ไปค้นหามาจากเงื่อนไขแรก
    return medicine.filter((mid) => (mid.ID === medid)).at(0)?.Name;
  }

  return (
    <Container className="container" maxWidth="md">

      <Box sx={{ paddingX: 2, paddingY: 1 }}>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          ประวัติการชำระเงิน
        </Typography>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ width: "700" }} aria-label="customized table">
          <TableHead style={{ backgroundColor: "#bdbdbd ", color: "#F4F6F6" }}>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Employee ID</TableCell>
              <TableCell align="center">ชื่อยา</TableCell>
              <TableCell align="center">จำนวนยา</TableCell>
              <TableCell align="center">ราคารวม</TableCell>
              <TableCell align="center">ประเภทการชำระเงิน</TableCell>
              <TableCell align="center">จำนวนเงินที่รับมา</TableCell>
              <TableCell align="center">จำนวนเงินที่ต้องทอน</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {Receipt.map((Receipt: ReceiptInterface) => (
              <TableRow key={Receipt.ID}>
                <TableCell component="th" scope="row" align="center">
                  {Receipt.ID}
                </TableCell>
                <TableCell align="center">
                  {Receipt.Employee?.Name}
                </TableCell>
                <TableCell align="center">
                  {show(Receipt.PayMedicine?.PrescriptionID as number)}
                </TableCell>
                <TableCell align="center">
                {Receipt.PayMedicine?.Amount}
                </TableCell>
                <TableCell align="center">
                {Receipt.PayMedicine?.Price}
                </TableCell>
                <TableCell align="center">
                  {Receipt.Types?.TypeName}
                </TableCell>
                 <TableCell align="center">
                  {Receipt.Receive}
                </TableCell>
                <TableCell align="center">
                  {Receipt.Refund}
                </TableCell>
                 
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
    
  );
}

export default Payment;
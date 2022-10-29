import React, { useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Alert, Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Snackbar, TextField } from '@mui/material';
import Payment from '../Payment';
import { PayMedicineInterface } from '../../models/IPayMedicine';
import { ReceiptInterface } from '../../models/IReceipt';
import { EmployeeInterface } from '../../models/IEmployee';
import { PaymentTypeInterface } from '../../models/IReceipt';
import id from 'date-fns/esm/locale/id/index.js';

export default function PaymentCreate() {
  //main entity
  const [receipt, setReceipt] = React.useState<Partial<ReceiptInterface>>({})
  
  //sub entity
  const [employee, setEmployee] = React.useState<Partial<EmployeeInterface>>({})
  const [paymentType, setPaymentType] = React.useState<PaymentTypeInterface[]>([])
  const [payMedicine, setPayMedicine] = React.useState<PayMedicineInterface[]>([])

  const [price, setPrice] = React.useState(0)

  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  // const [PayMedicine, setPayMedicine] = useState<PayMedicineInterface[]>([]);
  // const [p, setPayMedicine1] = useState<PayMedicineInterface>();

  const apiUrl = "http://localhost:8080";

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

   const getEmployee = () => {
    fetch(`${apiUrl}/payment/employee/${localStorage.getItem("uid")}`, requestOptions)
    .then((res) => res.json())
    .then((res) => {
      if (res.data) {
        console.log(res.data);
        setEmployee(res.data);
      }
    })
   }
   const getPaymentType = () => {
    fetch(`${apiUrl}/payment/paymentTypes`, requestOptions)
    .then((res) => res.json())
    .then((res) => {
      if (res.data) {
        console.log(res.data);
        setPaymentType(res.data);
      }
    })
   }
   const getPayMedicine = () => {
    fetch(`${apiUrl}/payment/paymedicines`, requestOptions)
    .then((res) => res.json())
    .then((res) => {
      if (res.data) {
        console.log(res.data);
        setPayMedicine(res.data);
      }
    })
   }

   getEmployee();
   getPaymentType();
   getPayMedicine();

  },[]);


  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof receipt;
    setReceipt({ ...receipt, [name]: event.target.value });
    // console.log(name)
    if(name == "PayMedicineID"){
      const x = payMedicine.filter((paymed) => (String(paymed.ID) == event.target.value))
      // console.log(x)
      setPrice(convertType(x.at(0)?.Price) as number)
    }
    // else if(name == "Receive"){
    //   setReceipt({...receipt, ["refund" as keyof typeof receipt] : convertType(event.target.value) as number - price})
    // }

  }
  const handleInputChange = async (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof receipt;
    const { value } = event.target;
    if(id === "Receive"){
      console.log(value)
      setReceipt({ ...receipt, Receive: convertType(value) , Refund: convertType(value) as number - price});
      // setReceipt({ ...receipt, ["Refund" as keyof typeof receipt]: convertType(value) as number - price })
    }
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    
    setSuccess(false);
    setError(false);
  };

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  function submit() {
    let data = {
      TotalPrice: price,
      Receive: convertType(receipt.Receive),
      Refund: convertType(receipt.Refund),
      PayMedicineID: convertType(receipt.PayMedicineID),
      TypesID: convertType(receipt.TypeID),
      EmployeeID: convertType(localStorage.getItem("uid") as string ),

    };
    console.log(data);
    
    const apiUrl = "http://localhost:8080/payment/receipts";
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
    fetch(apiUrl, requestOptions)
    .then((response) =>  response.json())
    .then((res) => {
      if(res.data){
        setSuccess(true);
      }
      else{
        setError(true);
      }
    })
    
  }



  return (
  
      <Container maxWidth="xl">
        <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>

      <Snackbar open={error} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ
        </Alert>
      </Snackbar>
        <Grid container spacing={2}>
          
            <Grid item xs={3}>
            <p>กรุณาเลือกไอดีของใบสั่งยา</p>
            <FormControl style={{width: "200px"}} variant="outlined">
              <Select
                id="ID"
                native
                name="PayMedicineID"
                size="medium"
                value={String(receipt.PayMedicineID)}
                onChange={handleChange}
                inputProps={{
                  name: "PayMedicineID",
                }}
              ><option></option>
                {payMedicine.map((item: PayMedicineInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.ID}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={8}>
            <p>กรุณาเลือกประเภทการชำระเงิน</p>
            <FormControl style={{width: "200px"}} variant="outlined">
              <Select
                id="ID"
                native
                name="TypeID"
                size="medium"
                value={String(receipt.TypeID)}
                onChange={handleChange}
                inputProps={{
                  name: "TypeID",
                }}
              ><option></option>
                {paymentType.map((item: PaymentTypeInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.TypeName}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3.5}>
            <p>จำนวนเงินทั้งหมด</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Name"
                type="string"
                size="medium"
                variant="filled"
                value= {price}
              />
            </FormControl>
          </Grid>

          <Grid item xs={3.5}>
            <p>จำนวนเงินที่รับมา</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Receive"
                type="number"
                size="medium"
                variant="filled"
                value= {receipt.Receive} 
                onChange = {handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={3.5}>
            <p>จำนวนเงินที่ต้องทอน</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Name"
                type="string"
                size="medium"
                variant="filled"
                value = {receipt.Refund} 
                
              />
            </FormControl>
          </Grid> 
            
           
                
          
      </Grid>
        <Grid item xs={6.5} >
           
           <Button
             style={{ float: "right" }}
             onClick={submit}
             variant="contained"
             color="primary"
           >
             Submit
           </Button>
         </Grid>
      </Container>
      
  );
}

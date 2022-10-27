import { Button, Container, Grid, Typography } from '@mui/material'
import pic from "../../image/ML.jpg";
import { Link as RouterLink } from "react-router-dom";


export const MedicineLabelHome = () => {
  return (
    <div>
      <Container maxWidth="md">

        <Typography align="center">
          <img style={{ width: "500px" }}
            alt="Medicine Label"
            className="img"
            src={pic}></img>
        </Typography>

        <h4>Requirements</h4>
        <p>
          ระบบฉลากยา เป็นระบบที่ให้เภสัชกรผู้ใช้ระบบสามารถ Login เข้าสู่ระบบเพื่อไปทำฉลากยา
          เพื่อที่ผู้ป่วยจะได้รับทราบข้อมูลบนฉลากยา ซึ่งจะส่งผลให้ผู้ป่วยสามารถใช้ยาได้อย่างถูกต้องและปลอดภัย
          โดยฉลากยาจะประกอบด้วยรายละเอียดดังต่อไปนี้ วิธีการใช้ยา, คำเตือน, วันที่และเวลา และเภสัชกร
          เมื่อเภสัชกรกรอกข้อมูลเสร็จแล้วจะทำการเพิ่มข้อมูลของฉลากยาที่ทำรายการเก็บไว้ในระบบฉลากยา
          เพื่อที่จะให้เภสัชกรผู้จ่ายยาสามารถเลือกฉลากยาที่อยู่ในระบบฉลากยาไปใช้งาน
          โดยจะพิมพ์ฉลากยาออกมาติดไว้ที่หีบห่อบรรจุยาตอนจ่ายยา
        </p>

        <Grid container xs={12} md={12} sx={{ justifyContent: "center" }}>

          <Button
            component={RouterLink}
            to="/medicine_labels/create"
            variant="contained"
          >
            เพิ่มข้อมูลฉลากยา
          </Button>

          &nbsp;
          <Button
            component={RouterLink}
            to="/medicine_labels"
            variant="contained"
          >
            ข้อมูลฉลากยา
          </Button>
        </Grid>


      </Container>
    </div>
  )
}
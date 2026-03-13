export const bookingConfirmationTemplate = ({
  customerName,
  barberName,
  serviceName,
  appointmentDate,
  appointmentTime,
  location,
  price,
  manageLink
}) => `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Appointment Confirmed</title>

<style>
body{
  margin:0;
  font-family: Arial, Helvetica, sans-serif;
  background:#f5f6fa;
}

.container{
  max-width:600px;
  margin:auto;
  background:#ffffff;
  border-radius:10px;
  overflow:hidden;
  box-shadow:0 4px 20px rgba(0,0,0,0.08);
}

.header{
  background:#111;
  color:white;
  text-align:center;
  padding:25px;
  font-size:24px;
  font-weight:bold;
}

.logo{
  font-size:20px;
}

.content{
  padding:30px;
}

.title{
  font-size:22px;
  font-weight:bold;
  margin-bottom:10px;
}

.booking-card{
  border:1px solid #eee;
  border-radius:8px;
  padding:20px;
  margin:20px 0;
  background:#fafafa;
}

.row{
  display:flex;
  justify-content:space-between;
  margin-bottom:10px;
}

.label{
  color:#666;
}

.value{
  font-weight:bold;
}

.button{
  display:block;
  text-align:center;
  padding:14px;
  margin-top:20px;
  background:#000;
  color:white;
  text-decoration:none;
  border-radius:6px;
}

.footer{
  padding:20px;
  text-align:center;
  font-size:12px;
  color:#777;
}
</style>

</head>

<body>

<div class="container">

<div class="header">
<span class="logo">StyleVault</span>
</div>

<div class="content">

<div class="title">
Your appointment is confirmed
</div>

<p>Hello ${customerName},</p>

<p>Your booking has been successfully confirmed.</p>

<div class="booking-card">

<div class="row">
<span class="label">Barber</span>
<span class="value">${barberName}</span>
</div>

<div class="row">
<span class="label">Service</span>
<span class="value">${serviceName}</span>
</div>

<div class="row">
<span class="label">Date</span>
<span class="value">${appointmentDate}</span>
</div>

<div class="row">
<span class="label">Time</span>
<span class="value">${appointmentTime}</span>
</div>

<div class="row">
<span class="label">Location</span>
<span class="value">${location}</span>
</div>

<div class="row">
<span class="label">Price</span>
<span class="value">$${price}</span>
</div>

</div>

<a href="${manageLink}" class="button">
Manage Appointment
</a>

</div>

<div class="footer">

<p>Need help? Contact support@stylevault.site</p>

<p>© ${new Date().getFullYear()} StyleVault</p>

</div>

</div>

</body>
</html>
`;
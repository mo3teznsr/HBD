import express from "express";
import companyRoutes from "./routes/company.routes";
// import userRoutes from "./routes/user.routes";
import employeeRoutes from "./routes/employee.routes";
//import familyRoutes from "./routes/family.routes";
import orderRoutes from "./routes/order.routes";
import invoiceRoutes from "./routes/invoice.routes";
import authRoutes from "./routes/auth.route";
// import paymentRoutes from "./routes/payment.routes";
// import authRoutes from "./routes/auth.routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/auth',authRoutes)
app.use("/companies", companyRoutes);
// app.use("/users", userRoutes);
app.use("/employees", employeeRoutes);
// app.use("/families", familyRoutes);
app.use("/orders", orderRoutes);
app.use("/invoices", invoiceRoutes);
// app.use("/payments", paymentRoutes);
// app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
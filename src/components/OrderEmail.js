import { Html } from "@react-email/html";
import { Text } from "@react-email/text";
import { Section } from "@react-email/section";
import { Container } from "@react-email/container";

export default function OrderEamil(order) {
  return (
    <Html>
      <Section style={main}>
        <Container style={container}>
          <Text style={heading}>Your Order has been Confirmed!</Text>
          <Text style={paragraph}>Order ID: {order.orderID}</Text>
          <Text style={paragraph}>Buyer: {order.user.fName + ' ' + order.user.lName}</Text>
          <Text style={paragraph}>Address: {order.user.address.main + ', ' + order.user.address.secondary + ', ' + order.user.address.city}</Text>
          <Text style={paragraph}>Products:</Text>
          {order.products.map(product=>{
            return <>
             <Text style={paragraph}>Name: {product.name}</Text>
             <Text style={paragraph}>Price: ${product.price}</Text>
             <Text style={paragraph}>Quantity: ${product.quantity}</Text>
             </>
          })}
           <Text style={paragraph}>Subtotal: ${order.subtotal}</Text>
           <Text style={paragraph}>Delivery: ${order.total - order.subtotal}</Text>
           <Text style={paragraph}>Total: ${order.total}</Text>
        </Container>
        <Text style={paragraph}>YOGAWITHOLYNDA</Text>
      </Section>
    </Html>
  );
}

// Styles for the email template
const main = {
  backgroundColor: "#ffffff",
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "580px",
};

const heading = {
  fontSize: "32px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#484848",
};

const paragraph = {
  fontSize: "18px",
  lineHeight: "1.4",
  color: "#484848",
};
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
          <Text style={paragraph}><Text style={subHeader}>Order ID: </Text>{order.orderID}</Text>
          <Text style={paragraph}><Text style={subHeader}>Buyer: </Text>{order.user.fName + ' ' + order.user.lName}</Text>
          <Text style={paragraph}><Text style={subHeader}>Address: </Text>{order.user.address.main + ', ' + order.user.address.secondary + ', ' + order.user.address.city}</Text>
          <Text style={heading}>Products:</Text>
          {order.products.map((product,index)=>{
            return <>
            {index++}
            <Text style={subHeader}>#{index}</Text>
             <Text style={paragraph}><Text style={subHeader}>Name: </Text>{product.name}</Text>
             <Text style={paragraph}><Text style={subHeader}>Price: </Text>${product.price}</Text>
             <Text style={paragraph}><Text style={subHeader}>Quantity: </Text> {product.quantity}</Text>
             </>
          })}
           <Text style={paragraph}><Text style={subHeader}>Subtotal: </Text>${order.subtotal}</Text>
           <Text style={paragraph}><Text style={subHeader}>Delivery: </Text>${order.total - order.subtotal}</Text>
           <Text style={paragraph}><Text style={subHeader}>Total: </Text>${order.total}</Text>
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
  width: window.innerWidth,
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
const subHeader={
    fontSize: "22px",
    lineHeight: "1.3",
    fontWeight: "700",
    color: "#484848",
}
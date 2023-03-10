import { Html } from "@react-email/html";
import { Text } from "@react-email/text";
import { Section } from "@react-email/section";
import { Container } from "@react-email/container";

export default function ForgetPassEmail(user) {
  return (
    <Html>
      <Section style={main}>
        <Container style={container}>
          <Text style={paragraph}>Dear {user.name.toUpperCase()},</Text>
          <Text style={paragraph}>We have received a request to reset your password for your Your Account on our website. To reset your password, please use the following token:</Text>
          <Text style={paragraph}>Token: {user.key}</Text>
          <Text style={paragraph}>Please click on the following link to reset your password: {user.reset}</Text>
           <Text style={paragraph}>If you did not request to reset your password, please ignore this email and your account will remain secure.</Text>
           <Text style={paragraph}>If you have any questions or concerns, please do not hesitate to contact our customer support team. They are available 24/7 to assist you with any queries you may have.</Text>
           <Text style={paragraph}>Thank you for choosing YOGAWITHOLYNDA as your preferred online platform. We are committed to providing you with the best user experience possible.</Text>
           <Text style={paragraph}>Best regards,</Text>
           <Text style={paragraph}>YOGAWITHOLYNDA</Text>
        </Container>
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
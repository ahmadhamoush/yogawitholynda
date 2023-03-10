import { Html } from "@react-email/html";
import { Text } from "@react-email/text";
import { Section } from "@react-email/section";
import { Container } from "@react-email/container";

export default function ForgetPassEmail(user) {
  return (
    <Html>
      <Section style={main}>
        <Container style={container}>
        <Text style={heading}>Password Reset Link</Text>
          <Text style={paragraph}>Dear {user.name.toUpperCase()},</Text>
          <Text style={paragraph}>We have received a request to reset your password for your Your Account on our website. To reset your password, please use the following 6 digits:</Text>
          <Text style={paragraph}>Key: {user.key}</Text>
          <Text style={link}>Please click on the following link to reset your password:</Text>
          <Text style={paragraph}>{user.reset}</Text>
          <Text style={paragraph}>The link will expire in 10 minutes.</Text>
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
const link={
    fontSize: "18px",
    lineHeight: "1.4",
    color: "#484848",
}
import { Issuer } from "openid-client";

const mitIssuer = await Issuer.discover("https://oidc.mit.edu/authorize");
console.log("Discovered issuer %s %O", mitIssuer.issuer, mitIssuer.metadata);

const client = new mitIssuer.Client({
  client_id: "baa96962-f4a6-4451-9c04-1fcf05c46c12",
  client_secret:
    "M5w0HVzW7szOSXGl2mk7kOykzShEkK7kc8pXZZKTCihNoCqAbEXSTU4Do92ysi9X_7SJMgSvQQIk2vxKhcaCzw",
  redirect_uris: ["http://localhost:3000/redirect"],
  response_types: ["code"],
});

client.authorizationUrl({
  scope: "openid phone email address profile",
  response_type: "code",
  client_id: redirect_uri,
});

console.log(authorizationURL);

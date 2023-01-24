import { Issuer } from "openid-client";

const mitIssuer = await Issuer.discover("https://oidc.mit.edu/authorize");
console.log("Discovered issuer %s %O", mitIssuer.issuer, mitIssuer.metadata);

const client = new mitIssuer.Client({
  client_id: "32e4f86c-7f80-453f-ba09-2114b9296b16",
  client_secret:
    "bbR_dEVLyKM_CEr1ubKwHeNiO9FhwHgBWSY7cfiqZmc3SIy0YBmeBa_1EEezL6owmCo5h9naSkw9SGCMR1yRgw",
  redirect_uris: ["https://treasuremit.herokuapp.com/redirect"],
  response_types: ["code"],
});

client.authorizationUrl({
  scope: "openid phone email address profile",
  response_type: "code",
  client_id: redirect_uri,
});

console.log(authorizationURL);

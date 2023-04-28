// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'ssxgek5p62'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map. For example:
  // domain: 'dev-nd9990-p4.us.auth0.com',
  domain: 'dev-0grm6tj5647j5xpu.us.auth0.com',            // Auth0 domain
  clientId: '0hl7g9ZeATAkv38kHOpKr2FORb4IUl8x',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}

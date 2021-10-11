import { google } from 'googleapis';

class GoogleOAuth {

  private client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
  );

  public getOAuth2Client() {
    this.client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
    return this.client;
  }
}

const config = new GoogleOAuth();
export default config.getOAuth2Client();
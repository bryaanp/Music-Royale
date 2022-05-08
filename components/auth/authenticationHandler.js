import {authorize, refresh} from 'react-native-app-auth';

// authenticate to twitter, PUT ON HOLD

class AuthenticationHandler {
  constructor() {
    this.twitterAuthConfig = {
      clientId: 'f2d456e66f1f453fa0219db32280afba',
      clientSecret: '1f28daea6f69473f9a96428c11a7eee3',
      redirectUrl: 'com.music-royale://oauthredirect',
      serviceConfiguration: {
        authorizationEndpoint: 'https://accounts.twitter.com/authorize',
        tokenEndpoint: 'https://accounts.twitter.com/api/token',
      },
    };
  }

  async onLogin() {
    try {
      const result = await authorize(this.twitterAuthConfig);
      alert(JSON.stringify(result));
      return result;
    } catch (error) {
      console.log(JSON.stringify(error));
    } 
  }

  async refreshLogin(refreshToken) {
    const result = await refresh(this.twitterAuthConfig, {
      refreshToken: refreshToken,
    });
    return result;
  }

}

const authHandler = new AuthenticationHandler();

export default authHandler;
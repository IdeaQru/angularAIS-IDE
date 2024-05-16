import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'myapp',
  webDir: 'src',
  server: {
    url : 'http://0.0.0.0:4200/dashboard',
    cleartext:true,
    androidScheme: 'http'
  }
};

export default config;

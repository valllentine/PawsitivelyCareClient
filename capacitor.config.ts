import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'PawsitivelyCareClient',
  webDir: 'www',
  server: {
    url:'http://192.168.1.4:4200',
    cleartext: true,
    androidScheme: 'http'
  }
};

export default config;

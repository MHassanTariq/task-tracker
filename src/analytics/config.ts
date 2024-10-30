// analytics.ts
import ReactGA from "react-ga4";

const gaKey = process.env.REACT_APP_GOOGLE_ANALYTICS_KEY! as string;

// Initialize with your GA4 Measurement ID
export const initGA = () => {
  ReactGA.initialize(gaKey);
};

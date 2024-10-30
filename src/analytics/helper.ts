import ReactGA from "react-ga4";
import { ActionLabelType, AnalyticPages } from "./consts";

export const fireEvent = (category: AnalyticPages, event: ActionLabelType) => {
  ReactGA.event({ ...event, category });
};

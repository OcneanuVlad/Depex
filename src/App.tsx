import { Redirect, Route } from "react-router-dom";
import { IonApp, IonContent, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";
import OneSignal from "onesignal-cordova-plugin";
import { useEffect } from "react";
import { Capacitor } from "@capacitor/core";

setupIonicReact();

const ONESIGNAL_APP_ID = "2974f0b6-b1b7-4c98-ae42-37ef219965b9";

const App: React.FC = () => {
  useEffect(() => {
    if (Capacitor.getPlatform() !== "web") {
      OneSignalInit();
    }
  }, []);

  async function OneSignalInit(): Promise<any> {
    // Remove this method to stop OneSignal Debugging
    OneSignal.Debug.setLogLevel(6);

    // Replace YOUR_ONESIGNAL_APP_ID with your OneSignal App ID
    OneSignal.initialize(ONESIGNAL_APP_ID);

    OneSignal.Notifications.addEventListener("click", async (e) => {
      let clickData = await e.notification;
      console.log("Notification Clicked : " + clickData);
    });
    console.log("ONESIGNAL registered");

    OneSignal.Notifications.requestPermission(true).then((success: Boolean) => {
      console.log("Notification permission granted " + success);
    });
  }

  return (
    <IonApp>
      <IonContent scrollY={false} style={{ width: "100vw", height: "100vh", border: "none" }}>
        <iframe src="https://norocosulcastigator.com/" style={{ width: "100vw", height: "100vh", border: "none" }} scrolling="yes"></iframe>
      </IonContent>
    </IonApp>
  );
};

export default App;

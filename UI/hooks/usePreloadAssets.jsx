import { useState, useEffect } from "react";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";

export function usePreloadAssets(assets) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function loadAssets() {
      try {
        await SplashScreen.preventAutoHideAsync();
        const assetPromises = assets.map((asset) =>
          Asset.fromModule(asset).downloadAsync()
        );
        await Promise.all(assetPromises);
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
        SplashScreen.hideAsync();
      }
    }

    loadAssets();
  }, []);

  return isReady;
}

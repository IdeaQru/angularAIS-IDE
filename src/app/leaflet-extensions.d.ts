import * as L from "leaflet";

declare module "leaflet" {
  namespace control {
    function fullscreen(options?: any): Control.Fullscreen;
  }

  namespace Control {
    class Fullscreen extends Control {
      constructor(options?: any);
    }
  }
    interface MapOptions {
        fullscreenControl?: true | FullscreenControlOptions | undefined;
        fullscreenControlOptions?: {
          position?: L.ControlPosition;
        };

    }


    interface FullscreenControlOptions extends ControlOptions {
        pseudoFullscreen?: boolean;
        title?: {
            "false": string;
            "true": string;
        };
    }

    interface Map {
        isFullscreen: () => boolean;
        toggleFullscreen: (options?: FullscreenControlOptions) => void;
    }
}

import * as L from "leaflet";
import "leaflet-search";

declare module "leaflet" {
  namespace control {
    function fullscreen(options?: any): Control.Fullscreen;
    function search(options?: SearchControlOptions): Control.Search;
  }

  namespace Control {
    class Fullscreen extends Control {
      constructor(options?: any);
    }

    class Search extends Control {
      constructor(options?: SearchControlOptions);
    }
  }

  interface FullscreenControlOptions extends ControlOptions {
    pseudoFullscreen?: boolean;
    title?: {
      "false": string;
      "true": string;
    };
  }

  interface SearchControlOptions extends ControlOptions {
    layer?: L.LayerGroup<any> | L.Layer | undefined;
    initial?: boolean;
    propertyName?: string;
    marker?: boolean;
    moveToLocation?: (latlng: L.LatLng, title: string, map: L.Map) => void;
    autoCollapse?: boolean;
    autoType?: boolean;
    minLength?: number;
    position?: L.ControlPosition;
    zoom?: number;
  }

  interface MapOptions {
    fullscreenControl?: true | FullscreenControlOptions | undefined;
    fullscreenControlOptions?: {
      position?: L.ControlPosition;
    };
    searchControl?: true | SearchControlOptions | undefined;
    searchControlOptions?: SearchControlOptions;
  }

  interface Map {
    isFullscreen: () => boolean;
    toggleFullscreen: (options?: FullscreenControlOptions) => void;
  }
}

// globals.d.ts
interface Window {
    google: {
      maps: {
        Geocoder: any;
        places: {
          AutocompleteService: new () => google.maps.places.AutocompleteService;
        };
      };
    };
  }
import WebMap from 'esri/WebMap';
import MapView from 'esri/views/MapView';
import Search from 'esri/widgets/Search';
import FeatureLayer from 'esri/layers/FeatureLayer';

import store from '../store/store';

const noop = () => {};
//Local Functions
let _handleMapClick = null;
let _searchWidget = null;

//Esri Stuff

// initialize our webmap
export const webmap = new WebMap({
  portalItem: {
    id: "81df90a93ad24e00ae30e5930ff5335a"
  }
});

export const view = new MapView({
  map: webmap
});

const doggoLayer = new FeatureLayer({
  url:
    "https://services3.arcgis.com/6j1KwZfY2fZrfNMR/arcgis/rest/services/Dog_GardensPet_Gardens_in_Hong_Kong/FeatureServer/0"
});

const english = {
  layer: doggoLayer,
  searchFields: ["Name_en", "Address_en", "Ancillary_facilities_en", "District_en"],
  displayField: "",
  exactMatch: false,
  outFields: ["Name_en", "Address_en", "Ancillary_facilities_en", "Phone", "District_en"],
  name: "Dog Park Locations",
  placeholder: "Search Dog Park Locations"
};
const 中文 = {
  layer: doggoLayer,
  searchFields: ["Name_cn", "Address_cn", "Ancillary_facilities_cn", "District_cn"],
  displayField: "",
  exactMatch: false,
  outFields: ["Name_cn", "Address_cn", "Ancillary_facilities_cn", "Phone", "District_cn"],
  name: "狗公園",
  placeholder: "搜索狗公園"
};
_searchWidget = new Search({
  view: view,
  resultGraphicEnabled: true,
  allPlaceholder: '搜索地址或地點',
  sources: [中文] //set Chinese as default source
});

export const switchSearchLang = (lang) => {
  const placeholder = lang === 'cn' ? '搜索地址或地點' : 'Find a dog park or location';
  const newSource = lang === 'cn' ? 中文 : english;
  _searchWidget.allPlaceholder = placeholder;
  _searchWidget.sources.items = [];
  _searchWidget.sources.items.push(newSource);
  _searchWidget.sources.length = 1;
  console.log('switch lang?? ', _searchWidget);
};

export const attachSearchWidget = container => {
  _searchWidget.container = container;
};


_handleMapClick = (e) => {
  //disable default popups
  e.stopPropagation();

  view.hitTest(e).then(response => {
    if (response.results.length === 0) {
      console.log("no features here");
      return;

    } else {

      const language = store.getState().mapview.language;

      const layerToQuery = response.results[0].graphic.layer;
      layerToQuery.popupEnabled = false;
      const query = layerToQuery.createQuery();
      query.where = `OBJECTID = ${
        response.results[0].graphic.attributes.OBJECTID
      }`;
      layerToQuery.queryFeatures(query).then(queryRes => {
        console.log(queryRes);
        if (queryRes.features && queryRes.features.length > 0) {

          const attributes = {
            district: queryRes.features[0].attributes[`District_${language}`],
            name: queryRes.features[0].attributes[`Name_${language}`],
            address: queryRes.features[0].attributes[`Address_${language}`],
            facilities:
              queryRes.features[0].attributes[
                `Ancillary_facilities_${language}`
              ],
            hours:
              queryRes.features[0].attributes[`Opening_hours_${language}`],
            phone: queryRes.features[0].attributes.Phone,
            remarks: queryRes.features[0].attributes[`Remarks_${language}`]
          };
          console.log(attributes);
          view.popup.open({
            location: e.mapPoint,
            dockOptions: {
              position: "top-right"
            },
            title: attributes.name,
            content: `
            <p>${attributes.address}</p>
            <p>${attributes.district}</p>
            <p>${attributes.facilities}</p>
            <p>${attributes.hours}</p>
            <p>${attributes.phone}</p>
            <p>${attributes.remarks}</p>
            `,
            updateLocationEnabled: true
          });
        }
      });
    }
  });
};


export const initialize = container => {
  view.container = container;
  view
    .when(_ => {
      view.ui.move(['zoom'], 'top-left');
      view.on('click', _handleMapClick);

    })
    .catch(noop);

  return () => {
    //Unmount / get ready for garbage collection
    view.container = null;
  };
};

window.view = view;

let map, places, infoWindow, autocomplete;
const markers = [];
const maxResults = 5;

function initMap(){
  const defaultCenter = { lat: 35.4676, lng: -97.5164 };
  map = new google.maps.Map(document.getElementById('map'), { center: defaultCenter, zoom: 11, mapTypeControl: true });
  infoWindow = new google.maps.InfoWindow();
  places = new google.maps.places.PlacesService(map);

  const input = document.getElementById('q');
  const btn = document.getElementById('search');
  autocomplete = new google.maps.places.Autocomplete(input, { fields: ["geometry","name"] });
  autocomplete.bindTo("bounds", map);
  autocomplete.addListener("place_changed", ()=>{
    const place = autocomplete.getPlace();
    if(!place.geometry) return;
    map.panTo(place.geometry.location); map.setZoom(13);
    textSearch(input.value);
  });
  btn.addEventListener('click', ()=> textSearch(input.value));

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(pos=>{
      const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      map.setCenter(loc); map.setZoom(13);
    }, ()=>{});
  }
}

function clearMarkers(){ while(markers.length){ markers.pop().setMap(null); } }

function textSearch(query){
  if(!query) return;
  const request = { query, fields: ["name","geometry","place_id","formatted_address","business_status","rating","types"] };
  places.textSearch(request, (results, status)=>{
    if(status !== google.maps.places.PlacesServiceStatus.OK || !results) return;
    renderResults(results.slice(0, maxResults));
  });
}

function renderResults(items){
  clearMarkers();
  const list = document.getElementById('results');
  list.innerHTML = "";
  const bounds = new google.maps.LatLngBounds();

  items.forEach((p, i)=>{
    const pos = p.geometry.location;
    bounds.extend(pos);
    const marker = new google.maps.Marker({ map, position: pos, label: String(i+1) });
    marker.addListener("click", ()=>{
      infoWindow.setContent(`<div><strong>${p.name}</strong><br>${p.formatted_address||""}</div>`);
      infoWindow.open(map, marker);
    });
    markers.push(marker);

    const subtype = p.types && p.types.length ? p.types[0].replace(/_/g," ") : "N/A";
    const rating = typeof p.rating === "number" ? `⭐ ${p.rating.toFixed(1)}` : "No rating";

    const card = document.createElement('article');
    card.className = "place-card";
    card.innerHTML = `
      <h3>${i+1}. ${p.name}</h3>
      <div class="badges">
        <span class="badge">${subtype}</span>
        <span class="badge">${rating}</span>
      </div>
      <p>${p.formatted_address||""}</p>
      <button class="btn" type="button" aria-label="Focus ${p.name} on map">Focus on map</button>
    `;
    card.querySelector('button').addEventListener('click', ()=>{
      map.panTo(pos); map.setZoom(15); google.maps.event.trigger(marker, 'click');
    });
    list.appendChild(card);
  });

  if(!bounds.isEmpty()) map.fitBounds(bounds);
}

window.initMap = initMap;

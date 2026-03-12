class LeafletMap {

  /**
   * Class constructor with basic configuration
   * @param {Object}
   * @param {Array}
   */
  constructor(_config, _data) {
    this.config = {
      parentElement: _config.parentElement,
    }
    this.data = _data;
    this.initVis();
  }
  
  /**
   * Initialize the map.
   */
  initVis() {
    let vis = this;


    //OpenStreetMap - shows neighborhoods clearly
    vis.openStreetUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
    vis.openStreetAttr = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';


    //this is the base map layer, where we are showing the map background
    vis.base_layer = L.tileLayer(vis.openStreetUrl, {
      id: 'openStreet-image',
      attribution: vis.openStreetAttr,
      ext: 'png'
    });

    // Init map with base layer image
    vis.theMap = L.map('my-map', {
      center: [30, 0],
      zoom: 2,
      layers: [vis.base_layer]
    });

    // Set default zoom to Cincinnati upon open
    vis.theMap.setView([39.1413, -84.5061], 12);

  }

  updateVis() {
    let vis = this;
    //not using yet... 


  }


  renderVis() {
    let vis = this;

    //not using right now... 
 
  }
}
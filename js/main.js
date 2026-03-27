d3.csv('/js/data/311Sample.csv') // Might be replaced with a new preprocessed CSV for specific attr
.then(data => {
    console.log("number of items: " + data.length);
    


    function parseDate(str) {
      if (!str || str.trim() === '') return null;
      const parts = str.trim().split(/\s+/);
      const months = {Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};
      return new Date(+parts[0], months[parts[1]], +parts[2]); // local midnight
    }

    data.forEach(d => {
      d.LATITUDE = +d.LATITUDE; 
      d.LONGITUDE = +d.LONGITUDE;  
      d.DATE_CREATED = parseDate(d.DATE_CREATED);
      // d.SR_TYPE = d.SR_TYPE; // Get the service type - will need to preprocess 311Sample first after deciding which attr to go with
    });

    // Initialize map and then show it
    leafletMap = new LeafletMap({ parentElement: '#my-map'}, data);

    // Service Type Filter
    document.getElementById('sr-type-filter').addEventListener('change', function() {
    leafletMap.filterBySRType(this.value);
    });
  d3.select('#btn-light').on('click', () => {
    leafletMap.setBackground(
      'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    );
    });

  d3.select('#btn-dark').on('click', () => {
    leafletMap.setBackground(
      'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}',
      '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a>'
    );
  });

    // Color Filter
    document.getElementById('color-by-filter').addEventListener('change', function() {
        leafletMap.changeColorBy(this.value);
    });

    d3.select('#btn-light').on('click', () => {
    leafletMap.setBackground(
      'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    );
    });

    d3.select('#btn-dark').on('click', () => {
    leafletMap.setBackground(
      'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}',
      '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a>'
    );
  });

  const barchartData = d3.rollups(
  data,
  v => v.length,
  d => d.PRIORITY        // ← d not d3
)
.map(([priority, count]) => ({ priority, count }))
.sort((a, b) => a.priority - b.priority);  // sort numerically by priority

console.log('barchart data:', barchartData);  // verify it looks right

barchart = new Barchart({ parentElement: '#chart', yAxisLabel: 'Number of Calls' }, barchartData);
barchart.updateVis();



 const binnedData = d3.rollups(
  data.filter(d => d.DATE_CREATED !== null),
  v => v.length,          
  d => +d3.timeDay.floor(d.DATE_CREATED)  // ← groups records by day
)
.map(([date, count]) => ({ date, count }))
.sort((a, b) => a.date - b.date);   // sort chronologically
console.log('max count:', d3.max(binnedData, d => d.count));
lineChart = new LineChart({ parentElement: '#line-chart' }, binnedData);
lineChart.updateVis();

})
  .catch(error => console.error(error));


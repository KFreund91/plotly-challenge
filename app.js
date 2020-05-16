//update page based on dropdown selection -- code given graciously by Brent :)
function optionChanged(d) {
  console.log("option changed function");
  const isNumber = (element) => element === d;
  var idx = (names.findIndex(isNumber));
  d3.selectAll("td").remove();
  d3.selectAll("option").remove();
  var dropMenu = d3.select("#selDataset")
  dropMenu.append("option").text(d);
  init(idx);
}

function init(i) {


  d3.json("samples.json").then((sampledata) => {
    console.log(sampledata);
    names = sampledata.names;
    var OTU_top = sampledata.samples[i].otu_ids;
    var ids = OTU_top.map(d => "OTU " + d);
    var sampleValues = sampledata.samples[i].sample_values;
    var otuLabels = sampledata.samples[i].otu_labels;
    var metadata = sampledata.metadata[i];

    var dropMenu = d3.select("#selDataset")
    for (i in names) {
      var newOption = dropMenu.append("option")
      newOption.text(names[i]);
    }

    //bar chart
    var barchart = [
      {
        x: sampleValues.slice(0, 10).reverse(),
        y: ids,
        text: otuLabels.slice(0, 10),
        marker: {
          color: 'green'
        },
        type: "bar",
        orientation: "h",
      }]
    var layout = {
      title: "Top 10 OTU",
      yaxis: { title: "OTU IDs" },
      xaxis: { title: "Sample Values" }
    }
    Plotly.newPlot("bar", barchart, layout);


    //bubble chart

    var bubble = {
      x: OTU_top,
      y: sampleValues,
      text: otuLabels,
      mode: `markers`,
      marker: {
        size: sampleValues,
        color: OTU_top
      }
    };

    var data = [bubble];
    var layout = {
      title: "Belly Button Bacteria",
      xaxis: { title: "OTU ID" }
    };
    Plotly.newPlot("bubble", data, layout);


    //demographics    
    var sampleData = d3.select(`#sample-metadata`);
    sampleData.html("");
    Object.entries(metadata).forEach(function ([key, value]) {
      var row = sampleData.append("p");
      row.text(`${key.toUpperCase()}:${value}`)
    })


  })
}

init(0);


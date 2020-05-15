  //bar chart
  d3.json("samples.json").then(sampledata => {
    //console.log(sampledata.samples)
    var OTU_top = sampledata.samples[0].otu_ids;
    //console.log(OTU_top);
    var ids = OTU_top.map(d => "OTU " + d);
    var sampleValues = sampledata.samples[0].sample_values;
    //console.log(sampleValues);
    var otuLabels = sampledata.samples[0].otu_labels;
    //console.log(otuLabels);

    var barchart = [
      {
        x: sampleValues.slice(0, 10).reverse(),
        y: ids,
        text: otuLabels.slice(0, 10),
        marker: {
          color: 'blue'
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
  });

  //bubble chart
  d3.json("samples.json").then(sampledata => {
    var OTU_top = sampledata.samples[0].otu_ids;
    var sampleValues = sampledata.samples[0].sample_values;
    var otuLabels = sampledata.samples[0].otu_labels;

    var bubble = {
      x: OTU_top,
      y: sampleValues,
      text: otuLabels,
      mode: `markers`,
      marker: {
        size: sampleValues
      }
    };

    var data = [bubble];
    var layout = {
      title: "Belly Button Bacteria",
      xaxis: { title: "OTU ID" }
    };
    Plotly.newPlot("bubble", data, layout);
  })


//demographics

  d3.json("samples.json").then(sampledata => {
    var sampleData = d3.select(`#sample-metadata`);
    Object.entries(sampledata.metadata[0]).forEach(function ([key, value]) {
      var row = sampleData.append("p");
      row.text(`${key}:${value}`)
    })
  })











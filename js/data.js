const dimensions = ({ 
  height: 400,
  width: 600,  
  margin: {
      top: 10,
      right: 30,
      bottom: 20,
      left: 50,
    } 
  })
//d3 = require("d3@5")

d3.csv("../data/ingestion.csv", function(data) {
  
  
    
  const subgroups = data.columns.slice(1)
  

  const groups = d3.map(data, d => d['Type de plastique']).keys()

  const y = d3.scaleLinear()
    .domain([0, 180])
    .range([ dimensions.height, 0 ]);

  const x = d3.scaleBand()
        .domain(groups)
        .range([0, dimensions.width])
        .padding([0.2])

  const color = d3.scaleOrdinal()
      .domain(subgroups)
      .range(['#9CADCE','#7EC4CF','#52B2CF','#52B9CF'])

  const stackedData = d3.stack()
      .keys(subgroups)
      (data)


  const svg = d3.select("#chart")
    .append("svg")
      .attr("width", dimensions.width + dimensions.margin.left + dimensions.margin.right)
      .attr("height", dimensions.height + dimensions.margin.top + dimensions.margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + dimensions.margin.left + "," + dimensions.margin.top + ")")
  

    svg.append("g")
      .selectAll("g")
      // Enter in the stack data = loop key per key = group per group
      .data(stackedData)
      .enter().append("g")
        .attr("fill", d => color(d.key))
        .selectAll("rect")
        // enter a second time = loop subgroup per subgroup to add all rectangles
        .data(d => d)
        .enter().append("rect")
          .attr("x", d => x(d.data['Type de plastique'])) // <----le problem est la 
          .attr("y", d => y(d[1]))
          .attr("height", d => y(d[0]) - y(d[1]))
          .attr("width",x.bandwidth())
          .on("mouseover", function() { tooltip.style("display", null); })
          .on("mouseout", function() { tooltip.style("display", "none"); })
          .on("mousemove", function(d) {
            var xPosition = d3.mouse(this)[0] - 15;
            var yPosition = d3.mouse(this)[1] - 25;
            tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
            tooltip.select("text").text(d[1]-d[0]);
          });
       
      console.log()
    svg.append("g")
      .attr("transform", "translate(0," + dimensions.height + ")")
      .call(d3.axisBottom(x).tickSizeOuter(0));

    svg.append("g")
      .call(d3.axisLeft(y));

    const colors = ['#9CADCE','#7EC4CF','#52B2CF','#52B9CF'],
      keys = subgroups,
      legendCellSize = 20,
      tooltipWidth = 210,
      nbCategories = keys.length;

    //======================================================
    //                     LEGENDE
    //======================================================

    let reverseColors = colors.reverse(); 
    let reverseKeys = keys.reverse();

    let legend = svg.append('g')
        .attr('transform', 'translate(10, 20)'); // Représente le point précis en haut à gauche du premier carré de couleur
        
    // Pour chaque couleur, on ajoute un carré toujours positionné au même endroit sur l'axe X et décalé en fonction de la 
    // taille du carré et de l'indice de la couleur traitée sur l'axe Y
    legend.selectAll()
        .data(reverseColors)
        .enter().append('rect')
            .attr('height', legendCellSize + 'px')
            .attr('width', legendCellSize + 'px')
            .attr('x', 5)
            .attr('y', (d,i) => i * legendCellSize)
            .style("fill", d => d);
    
    // On procéde de la même façon sur les libellés avec un positionement sur l'axe X de la taille des carrés 
    // à laquelle on rajoute 10 px de marge
    legend.selectAll()
        .data(reverseKeys)
        .enter().append('text')
            .attr("transform", (d,i) => "translate(" + (legendCellSize + 10) + ", " + (i * legendCellSize) + ")")
            .attr("dy", legendCellSize / 1.6) // Pour centrer le texte par rapport aux carrés
            .style("font-size", "13px")
            .style("fill", "grey")
            .text(d => d);

    var tooltip = svg.append("g")
      .attr("class", "tooltip")
      .style("display", "none");
        
    tooltip.append("rect")
      .attr("width", 30)
      .attr("height", 20)
      .attr("fill", "white")
      .style("opacity", 0.5);

    tooltip.append("text")
      .attr("x", 15)
      .attr("dy", "1.2em")
      .style("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("font-weight", "bold");

});

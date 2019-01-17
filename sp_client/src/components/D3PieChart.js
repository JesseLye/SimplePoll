import React from "react";
import * as d3 from "d3";

const D3PieChart = props => {

  if(props.chartData.length > 0){

    var width = 1080;
    // var height = 600;
    var increment = 0;

    d3.select("#pieChart")
      .attr("width", 400)
      .attr("height", 300)
    .append("g")
      .attr('transform', 'translate(' + 400 / 2 + ',' + 300 / 2 + ')')
      .classed('chart', true);

      var tooltip = d3.select("body")
                      .append("div")
                        .classed("tooltip", true);

      var arcs = d3.pie()
                .value(assortData => assortData.voteCount)
                (props.chartData);

      var paths = d3.arc()
                .outerRadius(width / 8 - 10)
                .innerRadius(0);

      var update = d3.select(".chart")
                  .selectAll(".arc")
                  .data(arcs);

      var colorScale = d3.scaleOrdinal()
                       .domain(props.chartData.length)
                       .range(d3.schemeSet3);

          update
            .exit()
            .remove();

            update
              .enter()
              .append("path")
                .classed("arc", true)
              .on("mousemove", showTooltip)
              .on("mouseout", hideTooltip)
              .merge(update)
                .transition()
                .duration(300)
                .ease(d3.easeLinear)
                // .delay((d,i) => i * 250)
                .attr("fill", d => colorScale(increment++))
                .attr("stroke", "white")
                .attr("d", paths);

                function showTooltip(d){
                  if(d.data){
                    tooltip
                      .style("opacity", 1)
                      .style("left", d3.event.x - (tooltip.node().offsetWidth / 2) + "px")
                      .style("top", d3.event.y + 25 + "px")
                      .html(`
                        <p>Title: ${d.data.voteFor}</p>
                        <p>Votes: ${d.data.voteCount}</p>
                      `);
                    }
                }

                function hideTooltip(){
                  tooltip
                    .style("opacity", 0);
                }
    }




  return (
    <div className="d3-pieChart">
      <svg
        version="1.1"
        baseProfile="full"
        xmlns="https://www.w3.org/2000/svg"
        id="pieChart"
      >
      </svg>
    </div>
  );
};

export default D3PieChart;

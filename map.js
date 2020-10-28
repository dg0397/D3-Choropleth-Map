async function drawMap(){
    //1)Acces Data

    //Fetching data

    //Fetching education data
    const dataset = await d3.json("https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json")
    
    //fetching counties data
    const countyShapes = await d3.json("https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json")
    const countyData = topojson.feature(countyShapes,countyShapes.objects.counties).features//getting the correct data and format
    
    //Seeting accesors functions '

    const countyIdAccessor = d => d.id
    console.log(dataset)
    console.log(countyData)

    let metricDataByCounty = {}

    dataset.forEach(d => {
        metricDataByCounty[d["fips"]] = +d["bachelorsOrHigher"] || 0
    })

    console.log(metricDataByCounty)
    //2) Create Chart Dimensions

    

    let dimensions = {
        width: window.innerWidth * 0.9 <= 600 ? window.innerWidth * 0.9 : 1100,
        margin: {
            top: 30,
            right: 30,
            bottom: 60,
            left: 60,
        },
    }

    //dimensions.boundedWidth = dimensions.width - dimensions.margin.left  - dimensions.margin.right ;

    ////Setting projection
//
    //const Rect = ({type: "Sphere"})
//
    //const projection = d3.geoAlbersUsa()
    //                        .fitWidth(dimensions.boundedWidth,Rect)
//
    //const pathGenerator = d3.geoPath(projection)
//
    //const [[x0, y0], [x1, y1]] = pathGenerator.bounds(Rect)
//
//
    //dimensions.boundedHeight = y1
    //dimensions.height = dimensions.boundedHeight + dimensions.margin.top + dimensions.margin.bottom


    //3) Draw Canvas 

    //adding main svg 

    const canvas = d3.select("#canvas")
                        .append('svg')
                        .attr('width',dimensions.width)
                        .style('fill','aliceblue')

    //adding bound(framework or whiteboard)

    const bounds = canvas.append('g')
                            .style('transform', `translate(${
                                dimensions.margin.left
                            }px, ${
                                dimensions.margin.top
                            }px)`);

    //4) Create Scales

    //Setting scales
    const metricValues = Object.values(metricDataByCounty)
    const colorScale = d3.scaleLinear()
                            .domain(d3.extent(metricValues))
                            .range(["white", "darkgreen"])                        

     //5) Draw Data

    // const map = bounds.append("path")
    //                        .attr("class", "earth")
    //                        .attr("d", pathGenerator(Rect))

    const counties = bounds.selectAll(".county")
                                .data(countyData)
                                .enter().append("path")
                                .attr("class", "county")
                                .attr("d", d3.geoPath())
                                .style('fill',d => {
                                    const metricValue = metricDataByCounty[countyIdAccessor(d)]
                                    if (typeof metricValue == "undefined") return "#e2e6e9"
                                    return colorScale(metricValue)
                                })
                                .attr('data-fips', d => countyIdAccessor(d))
                                .attr('data-education', d => metricDataByCounty[countyIdAccessor(d)])


    //selecting tooltip 

    const tooltip = d3.select('#tooltip');

    //setting transition 

    


    ////drawing cells

    //setting cell dimensions  
    

    //addding cells
    
                            
    //adding transition to cells

    

    //6)Draw Peripherals

    //settup legend


    //7) Set up Interactions

    //7) Set up Interactions

    counties.on("mouseenter", onMouseEnter)
        .on("mouseleave", onMouseLeave)

    function onMouseEnter(datum,index){
    
        tooltip.attr("data-education",metricDataByCounty[countyIdAccessor(index)])
                .style('opacity',1)


        //Updating tooltip information
        const point = dataset.find(location => location.fips === countyIdAccessor(index))
        //console.log(point)

        tooltip.select("#education").text(`bachelor's Or Higher: ${point.bachelorsOrHigher}%`);
        tooltip.select("#location").text(`${point.fips} - ${point.state}. ${point.area_name}`)
    }

    function onMouseLeave(datum,index){
        tooltip.style('opacity',0)
    }
}
drawMap()
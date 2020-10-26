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

    const wrapper = d3.select("#wrapper")
                        .append('svg')
                        .attr('width',dimensions.width)
                        .style('min-height','700px')
                        .style('fill','aliceblue')

    //adding bound(framework or whiteboard)

    const bounds = wrapper.append('g')
                            .style('transform', `translate(${
                                dimensions.margin.left
                            }px, ${
                                dimensions.margin.top
                            }px)`);

    //4) Create Scales

    //Setting scales
    const metricValues = Object.values(metricDataByCounty)

    const metricValueExtent = d3.extent(metricValues)

    const maxChange = d3.max([-metricValueExtent[0], metricValueExtent[1]])
    const colorScale = d3.scaleLinear()
                            .domain([-maxChange, 0, maxChange])
                            .range(["indigo", "white", "darkgreen"])                        

     //5) Draw Data

    // const map = bounds.append("path")
    //                        .attr("class", "earth")
    //                        .attr("d", pathGenerator(Rect))

    const countries = bounds.selectAll(".county")
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

    

    //setting transition 

    


    ////drawing cells

    //setting cell dimensions  
    

    //addding cells
    
                            
    //adding transition to cells

    

    //6)Draw Peripherals

    //Setting axis 
    
    //Adding X axis 
    

    //Adding Y axis 
    

    //settup legend


    //7) Set up Interactions
}
drawMap()
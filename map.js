async function drawMap(){
    //1)Acces Data

    //Fetching data

    const {monthlyVariance: dataset , baseTemperature} = await d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json");

    const colorData = ["#e2f4ff","#bbe1fa","#3282b8","#0f4c75","#651441","#942246","#d54153","#f45d51"]

    //Seeting accesors functions 

    //2) Create Chart Dimensions

    let dimensions = {
        width: window.innerWidth * 0.9 <= 600 ? window.innerWidth * 0.9 : 1100,
        height: 400,
        margin: {
            top: 30,
            right: 30,
            bottom: 60,
            left: 60,
        },
    }

    dimensions.boundedWidth = dimensions.width - dimensions.margin.left  - dimensions.margin.right ;
    dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom ;

    //3) Draw Canvas 

    //adding main svg 

    const wrapper = d3.select("#wrapper")
                        .append('svg')
                        .attr('width',dimensions.width)
                        .attr('height',dimensions.height)

    //adding bound(framework or whiteboard)

    const bounds = wrapper.append('g')
                            .style('transform', `translate(${
                                dimensions.margin.left
                            }px, ${
                                dimensions.margin.top
                            }px)`);

    //4) Create Scales

    //Setting scales


     //5) Draw Data

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
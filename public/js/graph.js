window.onload = function () {
    var chart = new CanvasJS.Chart("chartContainer", {
        backgroundColor: "rgba(225,225,225,0.5)",
        title:{
            text: "Distribution of Population"              
        },
        data: [              
        {
            // Change type to "doughnut", "line", "splineArea", etc.
            type: "column",
            dataPoints: [
                { label: "European",  y: 70  },
                { label: "Asian", y: 14.9  },
                { label: "aboriginal", y: 3.7  },
                { label: "south America",  y: 3 },
                { label: "African",  y: 2.7  },
                { label: "Caribbean",  y: 3.7  },
                { label: "Oceania",  y: 0.2  }
            ]
        }
        ]
    });

    
    chart.render();
}
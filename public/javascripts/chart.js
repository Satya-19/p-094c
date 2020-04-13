$(document).ready(function(){
  
    var ctx1 = $('#pie-chartcanvas-1');
    var ctx2 = $('#pie-chartcanvas-2');
    var ctx3 = $('#pie-chartcanvas-3');
    var ctx4 = $('#pie-chartcanvas-4');
  
    var data1 = {
      labels: ["Analog Devices", "TATA Steel", "Maruti Suzuki India Limited", "Factset", "Symphony Talent", "Infosys", "Red Hat", "Vedanta", "Deloitte", "Tejas Networks", "PRADAN", "Godrej & Boyce", "TCS", "MuSigma", "Incture Technologies", "Eurofins", "Accenture", "Robert Bosch", "Kreeti Technologies", "TATA Steel BSL", "Nineleaps", "Gyansys", "IBM", "JK Paper", "Cognizant", "TATA Advanced Systems", "TRL Krosaki", "Capgemini", "ITC Infotech", "Ajatus", "Wipro", "Windmoller and Holscher", "Thoomri", "Macleods Pharmaceuticals", "Genpact"],
      datasets: [
        {
          label: "",
          data: [2, 5, 5, 4, 1, 29, 1, 9, 17, 3, 6, 1, 128, 4, 5, 1, 134, 25, 1, 5, 1, 6, 6, 5, 14, 4, 1, 3, 12, 3, 2, 2, 7, 12, 12],
          backgroundColor: [
            "#ddff11",
            "#a78fa9",
            "#acd123",
            "#abd123",
            "#45df54",
            "#8950C7",
            "#50C75A",
            "#C75B50",
            "#C7C150",
            "#CF5063",
            "#509DC7",
            "#C3C750",
            "#5069C7",
            "#297597",
            "#E8DFDF",
            "#999999",
            "#595287",
            "#ddff00",
            "#a78fa9",
            "#acd123",
            "#abd123",
            "#45df54",
            "#8950C7",
            "#50C75A",
            "#C75B50",
            "#C7C150",
            "#CF5063",
            "#509DC7",
            "#C3C750",
            "#5069C7",
            "#898989",
            "#E8DFDF",
            "#101AE0",
            "#595287",
            "#fff121"
          ],
          borderColor: [
            "#ddff11",
            "#a78fa9",
            "#acd123",
            "#abd123",
            "#45df54",
            "#8950C7",
            "#50C75A",
            "#C75B50",
            "#C7C150",
            "#CF5063",
            "#509DC7",
            "#C3C750",
            "#5069C7",
            "#999999",
            "#E8DFDF",
            "#297597",
            "#595287",
            "#ddff00",
            "#a78fa9",
            "#acd123",
            "#abd123",
            "#45df54",
            "#8950C7",
            "#50C75A",
            "#C75B50",
            "#C7C150",
            "#CF5063",
            "#509DC7",
            "#C3C750",
            "#5069C7",
            "#898989",
            "#E8DFDF",
            "#101AE0",
            "#595287",
            "#fff121"
          ],
          borderWidth: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        }
      ]
    }

    var data3 = {
        labels: ["Factset", "Symphony Talent", "Infosys", "Red Hat", "Deloitte", "PRADAN", "TCS", "MuSigma", "Incture Technologies", "Accenture", "Kreeti Technologies", "Nineleaps", "Gyansys", "IBM", "Cognizant", "Capgemini", "ITC Infotech", "Ajatus", "Wipro", "Thoomri", "Genpact"],
        datasets: [
          {
            label: "Team A",
            data: [4, 1, 29, 1, 17, 6, 128, 4, 5, 134, 1, 1, 6, 6, 14, 3, 12, 3, 2, 7, 12],
            backgroundColor: [
                "#a78fa9",
                "#acd123",
                "#abd123",
                "#45df54",
                "#8950C7",
                "#50C75A",
                "#C75B50",
                "#C7C150",
                "#CF5063",
                "#509DC7",
                "#C3C750",
                "#5069C7",
                "#999999",
                "#E8DFDF",
                "#297597",
                "#595287",
                "#ddff00",
                "#a78fa9",
                "#acd123",
                "#abd123",
                "#45df54"
            ],
            borderColor: [
                "#a78fa9",
                "#acd123",
                "#abd123",
                "#45df54",
                "#8950C7",
                "#50C75A",
                "#C75B50",
                "#C7C150",
                "#CF5063",
                "#509DC7",
                "#C3C750",
                "#5069C7",
                "#999999",
                "#E8DFDF",
                "#297597",
                "#595287",
                "#ddff00",
                "#a78fa9",
                "#acd123",
                "#abd123",
                "#45df54"
            ],
            borderWidth: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
          }
        ]
      }
  
    var data2 = {
      labels: ["Analog Devices", "TATA Steel", "Maruti Suzuki India Limited", "Vedanta", "Tejas Networks", "Godrej & Boyce", "Robert Bosch", "TATA Steel BSL", "JK Paper", "TATA Advanced Systems", "TRL Krosaki", "Windmoller and Holscher", "Macleods Pharmaceuticals"],
      datasets: [
        {
          label: "Team A",
          data: [2, 5, 5, 9, 3, 1, 25, 5, 5, 4, 1, 2, 12],
          backgroundColor: [
            "#297597",
            "#E8DFDF",
            "#999999",
            "#595287",
            "#ddff00",
            "#a78fa9",
            "#acd123",
            "#abd123",
            "#45df54",
            "#8950C7",
            "#50C75A",
            "#C75B50",
            "#C7C150"
          ],
          borderColor: [
            "#297597",
            "#E8DFDF",
            "#999999",
            "#595287",
            "#ddff00",
            "#a78fa9",
            "#acd123",
            "#abd123",
            "#45df54",
            "#8950C7",
            "#50C75A",
            "#C75B50",
            "#C7C150"
          ],
          borderWidth: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        }
      ]
    }
  
    var options = {
      title: {
        display: true,
        position: "top",
        text: "Core Companies",
        fontSize: 18,
        fontColor: "#111"
      },
      legend: {
        display: true,
        position: 'right',
        labels: {
          boxWidth: 8,
          padding: 4,
          fontSize: 10,
          fontColor: '#000750'
        }
      },
      animation: {
        animateScale: true,
        animateRotate: true,
      }
    }

    var options0 = {
        title: {
          display: true,
          position: "top",
          text: "Non - Core Companies",
          fontSize: 18,
          fontColor: "#111"
        },
        legend: {
            display: true,
            position: 'right',
            labels: {
              boxWidth: 8,
              padding: 4,
              fontSize: 9,
              fontColor: '#000750'
            }
          },
        animation: {
          animateScale: true,
          animateRotate: true,
        }
      }

    var options1 = {
        title: {
          display: false
        },
        legend: {
          display: true,
          position: 'right',
          labels: {
            boxWidth: 12,
            padding: 10,
            fontColor: '#000750'
          }
        },
        animation: {
          animateScale: true,
          animateRotate: true
        },
      }

      var options2 = {
        title: {
          display: false
        },
        legend: {
          display: false
        },
        animation: {
          animateScale: true,
          animateRotate: true
        },
      }
  
    var chart1 = new Chart(ctx1, {
      type: "doughnut",
      data: data1,
      options: options1
    });
  
    var chart2 = new Chart(ctx2, {
      type: "doughnut",
      data: data2,
      options: options
    });

    var chart3 = new Chart(ctx3, {
        type: "doughnut",
        data: data3,
        options: options0
      });

      var chart4 = new Chart(ctx4, {
        type: "doughnut",
        data: data1,
        options: options2
      });
  });
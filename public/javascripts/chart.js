$(document).ready(function () {
  var ctx1 = $("#pie-chartcanvas-1");
  var ctx2 = $("#pie-chartcanvas-2");
  var ctx3 = $("#pie-chartcanvas-3");
  var ctx4 = $("#pie-chartcanvas-4");
  var ctx5 = $("#pie-chartcanvas-5");
  var ctx6 = $("#pie-chartcanvas-6");
  var ctx7 = $("#pie-chartcanvas-7");
  var ctx8 = $("#pie-chartcanvas-8");
  var ctx9 = $("#pie-chartcanvas-9");
  var ctx10 = $("#pie-chartcanvas-10");

  var data1 = {
    labels: [
      "TATA Steel",
      "Pentair Water India",
      "Asian Paints",
      "Maruti Suzuki India Limited",
      "Deloitte",
      "Godrej & Boyce",
      "Tata Power",
      "AM/NS",
      "JK Paper",
      "L&T",
      "Adani",
      "Reliance Industries Limited",
      "CoreEl",
      "TASL",
      "Tata Consulting Engineers",
      "Titagarh Wagons",
      "Beumer Group",
      "Himatsingka",
      "Century Enka",
      "Aurigene Oncology Limited",
      "Aditya Birla FRL",
      "Asiczen",
      "Teejay",
      "Macleods Pharmaceuticals",
    ],
    datasets: [
      {
        label: "",
        data: [
          1, 1, 6, 21, 12, 3, 7, 1, 10, 80, 12, 9, 2, 8, 11, 10, 1, 3, 3, 5, 7,
          2, 5, 3,
        ],
        backgroundColor: [
          "#e28743",
          "#a78fa9",
          "#873423",
          "#abd123",
          "#45df54",
          "#8950C7",
          "#50C75A",
          "#C75B50",
          "#C7C150",
          "#CF5063",
          "#509DC7",
          "#297597",
          "#5069C7",
          "#C3C750",
          "#E8DFDF",
          "#999999",
          "#595287",
          "#ddff00",
          "#a78fa9",
          "#5069C7",
          "#abd123",
          "#45df54",
          "#8950C7",
          "#50C75A",
        ],
        borderColor: [
          "#e28743",
          "#a78fa9",
          "#873423",
          "#abd123",
          "#45df54",
          "#8950C7",
          "#50C75A",
          "#C75B50",
          "#C7C150",
          "#CF5063",
          "#509DC7",
          "#297597",
          "#5069C7",
          "#C3C750",
          "#E8DFDF",
          "#999999",
          "#595287",
          "#ddff00",
          "#a78fa9",
          "#5069C7",
          "#abd123",
          "#45df54",
          "#8950C7",
          "#50C75A",
        ],
        borderWidth: [
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1,
        ],
      },
    ],
  };

  var data2 = {
    labels: [
      "American Express",
      "RedHat",
      "eQ Technologies",
      "IBM",
      "Hughes Systique Corporation",
      "Vassar Labs",
      "Cummins India",
      "Pradan",
      "LG",
      "Spotline",
      "Argusoft",
      "Edmingle",
      "TCS",
      "Open Financial Technologies",
      "Kfintech",
      "SAP Labs",
      "Accenture",
      "Comviva",
      "Itobuz Technologies",
    ],
    datasets: [
      {
        label: "Team A",
        data: [1, 1, 1, 1, 5, 7, 1, 11, 1, 2, 14, 2, 184, 11, 14, 2, 54, 12, 3],
        backgroundColor: [
          "#e28743",
          "#a78fa9",
          "#873423",
          "#abd123",
          "#45df54",
          "#8950C7",
          "#50C75A",
          "#C75B50",
          "#C7C150",
          "#CF5063",
          "#509DC7",
          "#297597",
          "#5069C7",
          "#C3C750",
          "#E8DFDF",
          "#999999",
          "#595287",
          "#ddff00",
          "#a78fa9",
          "#5069C7",
        ],
        borderColor: [
          "#e28743",
          "#a78fa9",
          "#873423",
          "#abd123",
          "#45df54",
          "#8950C7",
          "#50C75A",
          "#C75B50",
          "#C7C150",
          "#CF5063",
          "#509DC7",
          "#297597",
          "#5069C7",
          "#C3C750",
          "#E8DFDF",
          "#999999",
          "#595287",
          "#ddff00",
          "#a78fa9",
          "#5069C7",
        ],
        borderWidth: [
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        ],
      },
    ],
  };

  var data3 = {
    labels: [
      "Kreeti Technologies",
      "Kyndryl GTS (IBM)",
      "Moveasy",
      "NCompass Tech Studio",
      "NetProphets Cyberworks Pvt. Ltd",
      "Quest Global",
      "Reliance Industries Limited",
      "Rumango",
      "Sunera Technologies",
      "Syntel Private Limited",
      "Tata Electronics Pvt. Ltd.",
      "TATA Elxsi",
      "TCS",
      "V2 Solutions",
      "Vaave",
      "Vassar labs",
      "VVDN Technologies",
      "Wipro",
      "WonderBotz",
      "Pradhan",
    ],
    datasets: [
      {
        label: "Team A",
        data: [
          1, 77, 1, 2, 5, 7, 13, 5, 13, 1, 5, 1, 93, 13, 1, 1, 7, 40, 7, 6,
        ],
        backgroundColor: [
          "#e28743",
          "#a78fa9",
          "#873423",
          "#abd123",
          "#45df54",
          "#8950C7",
          "#50C75A",
          "#C75B50",
          "#C7C150",
          "#CF5063",
          "#509DC7",
          "#297597",
          "#5069C7",
          "#C3C750",
          "#E8DFDF",
          "#999999",
          "#595287",
          "#ddff00",
          "#a78fa9",
          "#ddff11",
        ],
        borderColor: [
          "#e28743",
          "#a78fa9",
          "#873423",
          "#abd123",
          "#45df54",
          "#8950C7",
          "#50C75A",
          "#C75B50",
          "#C7C150",
          "#CF5063",
          "#509DC7",
          "#297597",
          "#5069C7",
          "#C3C750",
          "#E8DFDF",
          "#999999",
          "#595287",
          "#ddff00",
          "#a78fa9",
          "#ddff11",
        ],
        borderWidth: [
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        ],
      },
    ],
  };

  var data4 = {
    labels: [
      "Amazon",
      "HackerRank",
      "CISCO",
      "Tejas Networks",
      "Incture Technologies",
      "Continental Tech Center",
      "AM/NS",
    ],
    datasets: [
      {
        label: "Team A",
        data: [11, 1, 5, 6, 11, 1, 1],
        backgroundColor: [
          "#e28743",
          "#a78fa9",
          "#873423",
          "#abd123",
          "#45df54",
          "#8950C7",
          "#50C75A",
        ],
        borderColor: [
          "#e28743",
          "#a78fa9",
          "#873423",
          "#abd123",
          "#45df54",
          "#8950C7",
          "#50C75A",
        ],
        borderWidth: [
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        ],
      },
    ],
  };

  var data5 = {
    labels: [
      "Mahindra Comviva",
      "Aditya Birla Fashion and Retail",
      "BYJUs",
      "Interview Bit Solutions Services",
      "Planet Spark",
      "Simplilearn",
      "Factset",
      "Hypto",
      "Kfintech",
      "Milk Mantra",
      "Transport Department",
      "2tab Healthtech Private Limited",
      "88 Pictures",
      "Detour Odisha Pvt Ltd.",
    ],
    datasets: [
      {
        label: "Team A",
        data: [6, 7, 10, 1, 1, 1, 5, 1, 5, 3, 7, 1, 1, 1],
        backgroundColor: [
          "#e28743",
          "#a78fa9",
          "#873423",
          "#abd123",
          "#45df54",
          "#8950C7",
          "#50C75A",
          "#C75B50",
          "#C7C150",
          "#CF5063",
          "#ddff11",
          "#509DC7",
          "#297597",
          "#5069C7",
        ],
        borderColor: [
          "#e28743",
          "#a78fa9",
          "#873423",
          "#abd123",
          "#45df54",
          "#8950C7",
          "#50C75A",
          "#C75B50",
          "#C7C150",
          "#CF5063",
          "#ddff11",
          "#509DC7",
          "#297597",
          "#5069C7",
        ],
        borderWidth: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
    ],
  };

  var options = {
    legend: {
      display: true,
      position: "right",
      labels: {
        boxWidth: 7,
        padding: 7,
        fontSize: 7,
        fontColor: "#000750",
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  var options0 = {
    legend: {
      display: true,
      position: "left",
      fontSize: 18,
      labels: {
        boxWidth: 10,
        padding: 14,
        fontSize: 10,
        fontColor: "#000750",
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  var options1 = {
    legend: {
      display: true,
      position: "right",
      fontSize: 18,
      labels: {
        boxWidth: 10,
        padding: 14,
        fontSize: 10,
        fontColor: "#000750",
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  var options01 = {
    title: {
      display: true,
      text: "Core, Consultancy and Manufacturing",
      fontSize: 24,
      fontColor: "#111",
    },
    legend: {
      display: true,
      position: "right",
      fontSize: 18,
      labels: {
        boxWidth: 14,
        padding: 14,
        fontSize: 14,
        fontColor: "#000750",
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  var options02 = {
    title: {
      display: true,
      text: "Service Based Companies",
      fontSize: 24,
      fontColor: "#111",
    },
    legend: {
      display: true,
      position: "left",
      fontSize: 18,
      labels: {
        boxWidth: 14,
        padding: 14,
        fontSize: 14,
        fontColor: "#000750",
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  var options03 = {
    title: {
      display: true,
      text: "Service Based Companies",
      fontSize: 24,
      fontColor: "#111",
    },
    legend: {
      display: true,
      position: "right",
      fontSize: 18,
      labels: {
        boxWidth: 14,
        padding: 14,
        fontSize: 14,
        fontColor: "#000750",
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  var options04 = {
    title: {
      display: true,
      text: "Product, Networking and Semiconductors",
      fontSize: 24,
      fontColor: "#111",
    },
    legend: {
      display: true,
      position: "left",
      fontSize: 18,
      labels: {
        boxWidth: 14,
        padding: 14,
        fontSize: 14,
        fontColor: "#000750",
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  var options05 = {
    title: {
      display: false,
      text: "Recruiters",
      fontSize: 24,
      fontColor: "#111",
    },
    legend: {
      display: true,
      position: "right",
      fontSize: 18,
      labels: {
        boxWidth: 14,
        padding: 14,
        fontSize: 14,
        fontColor: "#000750",
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  var options1 = {
    legend: {
      display: true,
      position: "right",
      fontSize: 18,
      labels: {
        boxWidth: 10,
        padding: 14,
        fontSize: 10,
        fontColor: "#000750",
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  var options2 = {
    title: {
      display: true,
      text: "Core, Consultancy and Manufacturing",
      fontSize: 24,
      fontColor: "#111",
    },
    legend: {
      display: true,
      position: "right",
      fontSize: 18,
      labels: {
        boxWidth: 14,
        padding: 14,
        fontSize: 14,
        fontColor: "#000750",
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  var chart1 = new Chart(ctx1, {
    type: "doughnut",
    data: data1,
    options: options01,
  });

  var chart2 = new Chart(ctx2, {
    type: "doughnut",
    data: data2,
    options: options02,
  });

  var chart3 = new Chart(ctx3, {
    type: "doughnut",
    data: data3,
    options: options03,
  });

  var chart4 = new Chart(ctx4, {
    type: "doughnut",
    data: data4,
    options: options04,
  });

  // var chart5 = new Chart(ctx5, {
  //   type: "doughnut",
  //   data: data5,
  //   options: options05,
  // });

  var chart6 = new Chart(ctx6, {
    type: "doughnut",
    data: data1,
    options: options,
  });

  var chart6 = new Chart(ctx7, {
    type: "doughnut",
    data: data2,
    options: options,
  });

  var chart6 = new Chart(ctx8, {
    type: "doughnut",
    data: data3,
    options: options,
  });

  var chart6 = new Chart(ctx9, {
    type: "doughnut",
    data: data4,
    options: options,
  });

  // var chart6 = new Chart(ctx10, {
  //   type: "doughnut",
  //   data: data5,
  //   options: options,
  // });
});

var obj;
var temp, temp_data;
var myChart, oneDay;
var month_list = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var burgerList = [], customerList = [];

$(document).ready(function(){                
    $('input[type="file"]').change(function(e){
        for(var i = 0; i < e.target.files.length; i++) {
            var fileName = e.target.files[i].name;   
            $.get(fileName, function(data) {
                upload($.parseJSON(data));
            }); 
        }
    });
    $.get("krustykrab_array.json", function(data) {
        start($.parseJSON(data));
    })
});

function start(something) {
    obj = something.sales;
    // window.localStorage.clear();
    var prev = JSON.parse(window.localStorage.getItem("data"));
    if(prev != undefined) {
        obj = prev;
    }
    constructChartComponent(obj);
    init();
}

function init() {
    window.localStorage.setItem("data", JSON.stringify(obj));
    var test = document.getElementById('chart_detail');
    test.hidden = true;
    var test1 = document.getElementById('showData');
    test1.hidden = true;
}

function updateChartSales(name, num, list) {    
    var ctx = document.getElementById('myChart');
    myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: list,
        datasets: [{
            label: '',
            data: temp_data,
            backgroundColor: randomColorFilter(num),
            borderColor: [],
            borderWidth: 1
        }]
    },
    options: {
        title: {
            display: true,
            text: name
        },
        legend: {
            display: false
        },
        scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true,
                  fontColor: "blue",
                  fontStyle: "bold"
              }
          }],
          xAxes: [{
            ticks: {
                fontColor: "blue",
                fontStyle: "bold"
            }
        }]
      }
    }
  });
}

function loadSalesByBurger(burger_type) {
    var filtered = obj.filter(function(item) {
        return item.burger == burger_type;
    })
    var arr = [];
    for(var i = 0; i < customerList.length; i++) {
      arr.push(0);
    }
    for(var i = 0; i < filtered.length; i++) {
        var index = customerList.indexOf(filtered[i].species);
        arr[index] += 1;
    }
    temp_data = arr;
    refresh();
    updateChartSales(burger_type + " Sales", customerList.length, customerList);
}

function loadSalesByBurgerDate(date, burger_type) {
    var new_date = new Date(date);
    var aa = new_date.getFullYear();
    var bb = new_date.getMonth() + 1;
    var cc = new_date.getDate();

    var filtered = obj.filter(function(item) {
        return item.datetime.substring(0, 10) == date && item.burger == burger_type;
    })
    var arr = [];
    for(var i = 0; i < customerList.length; i++) {
      arr.push(0);
    }
    
    for(var i = 0; i < filtered.length; i++) {
        var index = customerList.indexOf(filtered[i].species);
        arr[index] += 1;
    }
    temp_data = arr;
    refresh();
    updateChartSales(burger_type + " Sales in " + month_list[bb - 1] + " " + cc + ", " + aa, arr.length, customerList);
}

function loadSalesByCustomer(customer) {
    var filtered = obj.filter(function(item) {
        return item.species == customer;
    })

    var arr = [];
    for(var i = 0; i < burgerList.length; i++) {
      arr.push(0);
    }
    for(var i = 0; i < filtered.length; i++) {
        var index = burgerList.indexOf(filtered[i].burger);
        arr[index] += 1; 
    }
    temp_data = arr;
    refresh();
    updateChartSales("Burger Orders by " + customer, burgerList.length, burgerList);
}

function loadSalesByCustomerDate(date, customer) {
    var new_date = new Date(date);
    var aa = new_date.getFullYear();
    var bb = new_date.getMonth() + 1;
    var cc = new_date.getDate();
    var filtered = obj.filter(function(item) {
        return item.datetime.substring(0, 10) == date && item.species == customer;
    })

    var arr = [];
    for(var i = 0; i < burgerList.length; i++) {
      arr.push(0);
    }
    
    for(var i = 0; i < filtered.length; i++) {
        var index = burgerList.indexOf(filtered[i].burger);
        arr[index] += 1; 
    }
    temp_data = arr;
    refresh();
    updateChartSales("Burger Order by " + customer + " in " + month_list[bb - 1] + " " + cc + ", " + aa, burgerList.length, burgerList);
}

function loadAllSalesByDate(input) {
    var new_date = new Date(input);
    var aa = new_date.getFullYear();
    var bb = new_date.getMonth() + 1;
    var cc = new_date.getDate();
    if(input == '') {
        alert('Please input a valid date');
    } else {
        var filtered = obj.filter(function(item) {
            return item.datetime.substring(0, 10) == input;
        })
        var arr = [];
        var color = randomColorFilter(customerList.length);
        for(var i = 0; i < customerList.length; i++) {
            var curr1 = filtered.filter(function(item1) {
                return item1.species == customerList[i];
            });
            var chartdata = [];
            for(var j = 0; j < burgerList.length; j++) {
                var curr2 = curr1.filter(function(item2) {
                    return item2.burger == burgerList[j];
                })
                chartdata.push(curr2.length);
            }
            arr.push(chartdata);
        }    
        var objects = [];
        for(var i = 0; i < customerList.length; i++) {
            var colors = [];
            colors.push(color[i]);
            colors.push(color[i]);
            colors.push(color[i]);
            objects.push(generateObjects(customerList[i], arr[i], color[i]));
        }

        refresh();
        var a = arr[0][0] + arr[1][0] + arr[2][0] + arr[3][0] + arr[4][0] + arr[5][0] + arr[6][0];
        var b = arr[0][2] + arr[1][2] + arr[2][2] + arr[3][2] + arr[4][2] + arr[5][2] + arr[6][2];
        var c = arr[0][1] + arr[1][1] + arr[2][1] + arr[3][1] + arr[4][1] + arr[5][1] + arr[6][1];
        var d = arr[3][0] + arr[3][1] + arr[3][2];
        var e = arr[4][0] + arr[4][1] + arr[4][2];
        var f = arr[6][0] + arr[6][1] + arr[6][2];
        var g = arr[0][0] + arr[0][1] + arr[0][2];
        var h = arr[1][0] + arr[1][1] + arr[1][2];
        var i = arr[2][0] + arr[2][1] + arr[2][2];
        var j = arr[5][0] + arr[5][1] + arr[5][2];
        showCount(a, b, c, d, e, f, g, h, i, j);
        updateSalesByDate("Burger Sales in " + month_list[bb - 1] + " " + cc + ", " + aa, customerList.length, objects);        
    }
}

function loadAllSales() {
    var arr = [];
    var color = randomColorFilter(customerList.length);
    for(var i = 0; i < customerList.length; i++) {
        var curr1 = obj.filter(function(item1) {
            return item1.species == customerList[i];
        });
        var chartdata = [];
        for(var j = 0; j < burgerList.length; j++) {
            var curr2 = curr1.filter(function(item2) {
                return item2.burger == burgerList[j];
            })
            chartdata.push(curr2.length);
        }
        arr.push(chartdata);
    }    
    var objects = [];
    for(var m = 0; m < customerList.length; m++) {
        var colors = [];
        colors.push(color[m]);
        colors.push(color[m]);
        colors.push(color[m]);
        objects.push(generateObjects(customerList[m], arr[m], color[m]));
    }
    refresh();
    var a = arr[0][0] + arr[1][0] + arr[2][0] + arr[3][0] + arr[4][0] + arr[5][0] + arr[6][0];
    var b = arr[0][2] + arr[1][2] + arr[2][2] + arr[3][2] + arr[4][2] + arr[5][2] + arr[6][2];
    var c = arr[0][1] + arr[1][1] + arr[2][1] + arr[3][1] + arr[4][1] + arr[5][1] + arr[6][1];
    var d = arr[3][0] + arr[3][1] + arr[3][2];
    var e = arr[4][0] + arr[4][1] + arr[4][2];
    var f = arr[6][0] + arr[6][1] + arr[6][2];
    var g = arr[0][0] + arr[0][1] + arr[0][2];
    var h = arr[1][0] + arr[1][1] + arr[1][2];
    var i = arr[2][0] + arr[2][1] + arr[2][2];
    var j = arr[5][0] + arr[5][1] + arr[5][2];
    showCount(a, b, c, d, e, f, g, h, i, j);
    updateSalesByDate("Burger Sales" , customerList.length, objects);
}

function generateObjects(name, value, color) {
    var obj = new Object();
    obj.label = name;
    obj.data = value;
    obj.backgroundColor = color;
    obj.borderWidth = 1;
    return obj;
}

function updateSalesByDate(name, num, alldata) {
    var ctx = document.getElementById('myChart');
    var color = randomColorFilter(num);
    myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: burgerList,
        datasets: alldata,
    },
    options: {
      title: {
          display: true,
          text: name
      },
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
      }
    }
  }); 
}

function loadTimePerDayBurger(date, burger_type) {
    var new_date = new Date(date);
    var aa = new_date.getFullYear();
    var bb = new_date.getMonth() + 1;
    var cc = new_date.getDate();
    
    var filtered = obj.filter(function(item) {
        return item.datetime.substring(0, 10) == date && item.burger == burger_type;
    })
    var arr = [], time_arr = [];

    for(var i = 0; i < filtered.length; i++) {
        var time = filtered[i].datetime.substring(11, 14) + "00";
        if(time_arr.includes(time)) {
            var index = time_arr.indexOf(time);
            arr[index] += 1;
        } else {
            time_arr.push(time);
            var num = 1;
            arr.push(num);
        }
    }
    temp = time_arr;
    temp_data = arr;
    updateTimePerDay(time_arr.length, aa, bb, cc);
}

function loadTimePerDayCustomer(date, customer) {
    var new_date = new Date(date);
    var aa = new_date.getFullYear();
    var bb = new_date.getMonth() + 1;
    var cc = new_date.getDate();

    var filtered = obj.filter(function(item) {
        return item.datetime.substring(0, 10) == date && item.species == customer;
    })
    var arr = [], time_arr = [];

    for(var i = 0; i < filtered.length; i++) {
        var time = filtered[i].datetime.substring(11, 14) + "00";
        if(time_arr.includes(time)) {
            var index = time_arr.indexOf(time);
            arr[index] += 1;
        } else {
            time_arr.push(time);
            var num = 1;
            arr.push(num);
        }
    }
    temp = time_arr;
    temp_data = arr;
    updateTimePerDay(time_arr.length, aa, bb, cc);
}

function loadTimePerDayAll(date) {
    var new_date = new Date(date);
    var aa = new_date.getFullYear();
    var bb = new_date.getMonth() + 1;
    var cc = new_date.getDate();

    var filtered = obj.filter(function(item) {
        return item.datetime.substring(0, 10) == date;
    })
    var arr = [], time_arr = [];

    for(var i = 0; i < filtered.length; i++) {
        var time = filtered[i].datetime.substring(11, 14) + "00";

        if(time_arr.includes(time)) {
            var index = time_arr.indexOf(time);
            arr[index] += 1;
        } else {
            time_arr.push(time);
            var num = 1;
            arr.push(num);
        }
    }
    temp = time_arr;
    temp_data = arr;
    updateTimePerDay(time_arr.length, aa, bb, cc);
}

function updateTimePerDay(num, year, mon, day) {
    var ctx = document.getElementById('oneDay');
    oneDay = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: temp,
        datasets: [{
            label: '', 
            data: temp_data,
            backgroundColor: randomColorFilter(num),
            borderColor: [],
            borderWidth: 1
        }]
    },
    options: {
        title: {
            display: true,
            text: "Customers per hour in " + month_list[mon - 1] + " " + day + ", " + year
        },
        legend: {
            display: false
        },
        scales: { 
          yAxes: [{
              ticks: {
                    beginAtZero: true,
                    fontColor: "blue",
                    fontStyle: "bold"
              }
          }],
          xAxes: [{
                ticks: {
                    beginAtZero: true,
                    fontColor: "blue",
                    fontStyle: "bold"
                }
            }]
        }
      }
    });
}

function loadSalesByBurgerCustomer(burger_type, customer) {
    var arr = [], date_arr = [];
    var filtered = obj.filter(function(item) {
        return item.burger == burger_type && item.species == customer;
    })
     
    for(var i = 0; i < filtered.length; i++) {
        var date = filtered[i].datetime.substring(0, 10);

        if(date_arr.includes(date)) {
            var index = date_arr.indexOf(date);
            arr[index] += 1;
        } else {
            date_arr.push(date);
            var num = 1;
            arr.push(num);
        }
    }
    temp = date_arr;
    temp_data = arr;
    refresh();
    updateSalesByComplete(burger_type + " orders by " + customer, arr.length);
    createSalesPerDay(burger_type, customer);
}

function loadSalesByDateBurgerCustomer(date, burger_type, customer) {
    var new_date = new Date(date);
    var aa = new_date.getFullYear();
    var bb = new_date.getMonth() + 1;
    var cc = new_date.getDate();
    var arr = [], time_arr = [];
    var filtered = obj.filter(function(item) {
        return item.datetime.substring(0, 10) == date && item.burger == burger_type && item.species == customer;
    })

    for(var i = 0; i < filtered.length; i++) {
        var time = filtered[i].datetime.substring(11, 14) + "00";

        if(time_arr.includes(time)) {
            var index = time_arr.indexOf(time);
            arr[index] += 1;
        } else {
            time_arr.push(time);
            var num = 1;
            arr.push(num);
        }
    }
    temp = time_arr;
    temp_data = arr;
    refresh();
    updateSalesByComplete(burger_type + " orders by " + customer + " in " + month_list[bb - 1] + " " + cc + ", " + aa, time_arr.length);
}

function randomColorFilter(num) {
    var arr = [];
    var x = 0;
    while(x < num) {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        if(!arr.includes(color)) {
            arr.push(color);
            x++;
        }
    }
    return arr;
}

function updateSalesByComplete(name, num) {
    var ctx = document.getElementById('myChart');
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: temp,
            datasets: [{
                label: '',
                data: temp_data,
                backgroundColor: randomColorFilter(num),
                borderColor: [],
                borderWidth: 1
            }]
        },
        options: {
            title: {
                display: true,
                text: name
            },
            legend: {
                display: false
            },
            scales: { 
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        fontColor: "blue",
                        fontStyle: "bold"
                    }
                }],
                xAxes: [{
                    ticks: {
                        display: false,
                        fontColor: "blue",
                        fontStyle: "bold"
                    }
                }]
            }
        }   
    });
}

function constructChartComponent(object) {
    for(var i = 0; i < object.length; i++) {
        var temp_burger = object[i].burger;
        var temp_customer = object[i].species;

        if(!burgerList.includes(temp_burger)) {
            burgerList.push(temp_burger);
        }
        if(!customerList.includes(temp_customer)) {
            customerList.push(temp_customer);
        }
    }
    burgerList.sort();
    customerList.sort();
}

function filterData(date, burger, customer) {
    refresh();
    if(date == '') {
      if(burger == 'all' && customer == 'all') {
          loadAllSales();
          createAllSalesTable();
      } else {
        if(burger == 'all') {
            loadSalesByCustomer(customer);
        } else if(customer == 'all') {
            loadSalesByBurger(burger);
        } else {
            loadSalesByBurgerCustomer(burger, customer);
        }
      }
    } else {
      if(burger == 'all' && customer == 'all') {
          loadAllSalesByDate(date);
          loadTimePerDayAll(date);
      } else {
        if(burger == 'all') {
            loadSalesByCustomerDate(date, customer);
            loadTimePerDayCustomer(date, customer);
        } else if(customer == 'all') {
            loadSalesByBurgerDate(date, burger);
            loadTimePerDayBurger(date, burger);
        } else {
            loadSalesByDateBurgerCustomer(date, burger, customer);
        }
      }
    }
}

function showCount(a, b, c, d, e, f, g, h, i, j) {
    document.getElementById('total').innerHTML = a + b + c;
    document.getElementById('kpattie').innerHTML = a;
    document.getElementById('kdeluxe').innerHTML = b;
    document.getElementById('kcombo').innerHTML = c;
    document.getElementById('total_customer').innerHTML = d + e + f + g + h + i + j;
    document.getElementById('lt').innerHTML = d;
    document.getElementById('sal').innerHTML = e;
    document.getElementById('sh').innerHTML = f;
    document.getElementById('cor').innerHTML = g;
    document.getElementById('gc').innerHTML = h;
    document.getElementById('gw').innerHTML = i;
    document.getElementById('sl').innerHTML = j;

    var test = document.getElementById('chart_detail');
    test.hidden = false;
}

function createAllSalesTable() {
    var col = ['No.','Datetime','Burger','Species'];

    var table = document.createElement("table");
    var tr = table.insertRow(-1);                   // TABLE ROW.

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    var ctr = 0;
    for(var m = 0; m < obj.length; m++) {
        tr = table.insertRow(-1);
        var data = obj[m];
      
        for(var i = 0; i < col.length; i++) {
            var tabCell = tr.insertCell(-1);            
            if(i == 0) {
                tabCell.innerHTML = ctr+1;
            } else if(i == 1) {
                tabCell.innerHTML = data.datetime;
            } else if(i == 2) {
                tabCell.innerHTML = data.burger;
            } else if(i == 3) {
                tabCell.innerHTML = data.species;
            }
        }
        ctr++;
    }

    var tt = document.getElementById("showData");
    tt.hidden = false;
    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}

function createSalesPerDay(burger_type, customer) {
    var col = ['No.','Datetime','Burger','Species'];

    var table = document.createElement("table");
    var tr = table.insertRow(-1);                   // TABLE ROW.

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    var filtered = obj.filter(function(item) {
        return item.burger == burger_type && item.species == customer;
    })

    for(var m = 0; m < filtered.length; m++) {
        tr = table.insertRow(-1);
        var data = filtered[m];
        
        for(var i = 0; i < col.length; i++) {
            var tabCell = tr.insertCell(-1);            
            if(i == 0) {
                tabCell.innerHTML = i+1;
            } else if(i == 1) {
                tabCell.innerHTML = data.datetime;
            } else if(i == 2) {
                tabCell.innerHTML = data.burger;
            } else if(i == 3) {
                tabCell.innerHTML = data.species;
            }
        }
    }

    var tt = document.getElementById("showData");
    tt.hidden = false;
    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}

function customerPerDay() {
    var col = ['No.','Datetime','Customer'];

    var table = document.createElement("table");
    var tr = table.insertRow(-1);                   // TABLE ROW.

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    var time = [], number = [];
    for(var i = 0; i < obj.length; i++) {
        tr = table.insertRow(-1);
        var data = obj[i];
        
        var temps = data.datetime.substring(0, 10);
        if(!time.includes(temps)) {
            time.push(temps);
            var num = 1;
            number.push(num);
        } else {
            var index = time.indexOf(temps);
            number[index] += 1;
        }
    }

    temp = time;
    temp_data = number;
    updateSalesByComplete("Number of Customers per day", time.length);

    for(var x = 0; x < time.length; x++) {
        tr = table.insertRow(-1);
        for(var i = 0; i < col.length; i++) {
            var tabCell = tr.insertCell(-1);            
            if(i == 0) {
                tabCell.innerHTML = x+1;
            } else if(i == 1) {
                tabCell.innerHTML = time[x];
            } else if(i == 2) {
                tabCell.innerHTML = number[x];
            } 
        }
    }

    var tt = document.getElementById("showData");
    tt.hidden = false;
    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}

function refresh() {
    if(myChart != null) {
        myChart.clear();
        myChart.destroy();
        myChart = null;   
    }

    if(oneDay != null) {
        oneDay.clear();
        oneDay.destroy();
        oneDay = null;
    }
    init();
}

function upload(file) {
    if(file != undefined) {
        var alldata = obj.concat(file);
        obj = alldata;
        window.localStorage.setItem("data", JSON.stringify(obj));
        console.log(JSON.parse(window.localStorage.getItem("data")));
        constructChartComponent(obj);
    }
}
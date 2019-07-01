var obj;
var temp, temp_data;
var series;
var myChart, oneDay;
var month_list = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var burgerList = [],
    customerList = [],
    salesList = [];

function start(something) {
    obj = something;
    constructChartComponent(obj);
    init();
}

function init() {
    $(".scroll").css("overflow-y", "hidden");

    var test = document.getElementById('chart_detail');
    test.hidden = true;
    var test1 = document.getElementById('showData');
    test1.hidden = true;
}

function loadSalesByBurger(burger_type) {
    var sales = obj.sales;
    var arr = [];
    for (var i = 0; i < customerList.length; i++) {
        arr.push(0);
    }
    for (x in sales) {
        if (sales[x].burger == burger_type) {
            var index = customerList.indexOf(sales[x].species);
            arr[index] += 1;
        }
    }
    temp_data = arr;
    init();
    updateSalesByBurger(burger_type + " Sales", customerList.length);
}

function loadSalesByBurgerDate(date, burger_type) {
    var new_date = new Date(date);
    var aa = new_date.getFullYear();
    var bb = new_date.getMonth() + 1;
    var cc = new_date.getDate();

    var sales = obj.sales;
    var arr = [];
    for (var i = 0; i < customerList.length; i++) {
        arr.push(0);
    }

    for (x in sales) {
        var date = sales[x].datetime;
        var year = parseInt(date.substring(0, 4), 10);
        var mon = parseInt(date.substring(5, 7), 10);
        var day = parseInt(date.substring(8, 10), 10);

        if (year == aa && mon == bb && day == cc) {
            if (sales[x].burger == burger_type) {
                var index = customerList.indexOf(sales[x].species);
                arr[index] += 1;
            }
        }
    }
    temp_data = arr;
    init();
    updateSalesByBurger(burger_type + " Sales in " + month_list[bb - 1] + " " + cc + ", " + aa, arr.length);
}

function updateSalesByBurger(name, num) {
    var ctx = document.getElementById('myChart');
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: customerList,
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
                text: name,
                fontColor: "#FFFFFF"
            },
            legend: {
                display: false
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        fontColor: "#FFFFFF",
                        fontStyle: "bold"
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontColor: "#FFFFFF",
                        fontStyle: "bold"
                    }
                }]
            }
        }
    });
}

function loadSalesByCustomer(customer) {
    var sales = obj.sales;
    var arr = [];
    for (var i = 0; i < burgerList.length; i++) {
        arr.push(0);
    }
    for (x in sales) {
        if (sales[x].species == customer) {
            var index = burgerList.indexOf(sales[x].burger);
            arr[index] += 1;
        }
    }
    temp_data = arr;
    init();
    updateSalesByCustomer("Burger Orders by " + customer, burgerList.length);
}

function loadSalesByCustomerDate(date, customer) {
    var new_date = new Date(date);
    var aa = new_date.getFullYear();
    var bb = new_date.getMonth() + 1;
    var cc = new_date.getDate();

    var sales = obj.sales;
    var arr = [];
    for (var i = 0; i < burgerList.length; i++) {
        arr.push(0);
    }

    for (x in sales) {
        var date = sales[x].datetime;
        var year = parseInt(date.substring(0, 4), 10);
        var mon = parseInt(date.substring(5, 7), 10);
        var day = parseInt(date.substring(8, 10), 10);

        if (year == aa && mon == bb && day == cc) {
            if (sales[x].species == customer) {
                var index = burgerList.indexOf(sales[x].burger);
                arr[index] += 1;
            }
        }
    }
    temp_data = arr;
    init();
    updateSalesByCustomer("Burger Order by " + customer + " in " + month_list[bb - 1] + " " + cc + ", " + aa, burgerList.length);
}

function updateSalesByCustomer(name, num) {
    var ctx = document.getElementById('myChart');
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: burgerList,
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
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

function loadAllSalesByDate(input) {
    if (input == '') {
        alert('Please input a valid date');
    } else {
        var new_date = new Date(input);
        var aa = new_date.getFullYear();
        var bb = new_date.getMonth() + 1;
        var cc = new_date.getDate();
        var sales = obj.sales;
        var arr = [];
        var pattie = [],
            deluxe = [],
            combo = [];
        var plt = 0,
            psal = 0,
            psh = 0,
            pcor = 0,
            pgc = 0,
            pgw = 0,
            psl = 0;
        var dlt = 0,
            dsal = 0,
            dsh = 0,
            dcor = 0,
            dgc = 0,
            dgw = 0,
            dsl = 0;
        var clt = 0,
            csal = 0,
            csh = 0,
            ccor = 0,
            cgc = 0,
            cgw = 0,
            csl = 0;
        for (x in sales) {
            var date = sales[x].datetime;
            var year = parseInt(date.substring(0, 4), 10);
            var mon = parseInt(date.substring(5, 7), 10);
            var day = parseInt(date.substring(8, 10), 10);

            if (year == aa && mon == bb && day == cc) {
                if (sales[x].burger == 'Krabby Pattie') {
                    if (sales[x].species == 'leatherback turtle')
                        plt++;
                    else if (sales[x].species == 'salmon')
                        psal++;
                    else if (sales[x].species == 'seahorse')
                        psh++;
                    else if (sales[x].species == 'coral')
                        pcor++;
                    else if (sales[x].species == 'giant clam')
                        pgc++;
                    else if (sales[x].species == 'gray whale')
                        pgw++;
                    else if (sales[x].species == 'sea lion')
                        psl++;
                } else if (sales[x].burger == 'Krusty Deluxe') {
                    if (sales[x].species == 'leatherback turtle')
                        dlt++;
                    else if (sales[x].species == 'salmon')
                        dsal++;
                    else if (sales[x].species == 'seahorse')
                        dsh++;
                    else if (sales[x].species == 'coral')
                        dcor++;
                    else if (sales[x].species == 'giant clam')
                        dgc++;
                    else if (sales[x].species == 'gray whale')
                        dgw++;
                    else if (sales[x].species == 'sea lion')
                        dsl++;
                } else if (sales[x].burger == 'Krusty Combo') {
                    if (sales[x].species == 'leatherback turtle')
                        clt++;
                    else if (sales[x].species == 'salmon')
                        csal++;
                    else if (sales[x].species == 'seahorse')
                        csh++;
                    else if (sales[x].species == 'coral')
                        ccor++;
                    else if (sales[x].species == 'giant clam')
                        cgc++;
                    else if (sales[x].species == 'gray whale')
                        cgw++;
                    else if (sales[x].species == 'sea lion')
                        csl++;
                }
            }
        }
        pattie.push(plt);
        pattie.push(psal);
        pattie.push(psh);
        pattie.push(pcor);
        pattie.push(pgc);
        pattie.push(pgw);
        pattie.push(psl);
        deluxe.push(dlt);
        deluxe.push(dsal);
        deluxe.push(dsh);
        deluxe.push(dcor);
        deluxe.push(dgc);
        deluxe.push(dgw);
        deluxe.push(dsl);
        combo.push(clt);
        combo.push(csal);
        combo.push(csh);
        combo.push(ccor);
        combo.push(cgc);
        combo.push(cgw);
        combo.push(csl);
        arr.push(pattie);
        arr.push(deluxe);
        arr.push(combo);
        temp_data = arr;
        var x1 = plt + psal + psh + pcor + pgc + pgw + psl;
        var x2 = dlt + dsal + dsh + dcor + dgc + dgw + dsl;
        var x3 = clt + csal + csh + ccor + cgc + cgw + csl;
        var x4 = plt + dlt + clt;
        var x5 = psal + dsal + csal;
        var x6 = psh + dsh + csh;
        var x7 = pcor + dcor + ccor;
        var x8 = pgc + dgc + cgc;
        var x9 = pgw + dgw + cgw;
        var x10 = psl + dsl + csl;
        refresh();
        showCount(x1, x2, x3, x4, x5, x6, x7, x8, x9, x10);
        updateSalesByDate("Burger Sales in " + month_list[bb - 1] + " " + cc + ", " + aa, 7);
    }
}

function loadAllSales() {
    var sales = obj.sales;
    var arr = [];
    var pattie = [],
        deluxe = [],
        combo = [];
    var plt = 0,
        psal = 0,
        psh = 0,
        pcor = 0,
        pgc = 0,
        pgw = 0,
        psl = 0;
    var dlt = 0,
        dsal = 0,
        dsh = 0,
        dcor = 0,
        dgc = 0,
        dgw = 0,
        dsl = 0;
    var clt = 0,
        csal = 0,
        csh = 0,
        ccor = 0,
        cgc = 0,
        cgw = 0,
        csl = 0;
    for (x in sales) {
        if (sales[x].burger == 'Krabby Pattie') {
            if (sales[x].species == 'leatherback turtle')
                plt++;
            else if (sales[x].species == 'salmon')
                psal++;
            else if (sales[x].species == 'seahorse')
                psh++;
            else if (sales[x].species == 'coral')
                pcor++;
            else if (sales[x].species == 'giant clam')
                pgc++;
            else if (sales[x].species == 'gray whale')
                pgw++;
            else if (sales[x].species == 'sea lion')
                psl++;
        } else if (sales[x].burger == 'Krusty Deluxe') {
            if (sales[x].species == 'leatherback turtle')
                dlt++;
            else if (sales[x].species == 'salmon')
                dsal++;
            else if (sales[x].species == 'seahorse')
                dsh++;
            else if (sales[x].species == 'coral')
                dcor++;
            else if (sales[x].species == 'giant clam')
                dgc++;
            else if (sales[x].species == 'gray whale')
                dgw++;
            else if (sales[x].species == 'sea lion')
                dsl++;
        } else if (sales[x].burger == 'Krusty Combo') {
            if (sales[x].species == 'leatherback turtle')
                clt++;
            else if (sales[x].species == 'salmon')
                csal++;
            else if (sales[x].species == 'seahorse')
                csh++;
            else if (sales[x].species == 'coral')
                ccor++;
            else if (sales[x].species == 'giant clam')
                cgc++;
            else if (sales[x].species == 'gray whale')
                cgw++;
            else if (sales[x].species == 'sea lion')
                csl++;
        }
    }
    pattie.push(plt);
    pattie.push(psal);
    pattie.push(psh);
    pattie.push(pcor);
    pattie.push(pgc);
    pattie.push(pgw);
    pattie.push(psl);
    deluxe.push(dlt);
    deluxe.push(dsal);
    deluxe.push(dsh);
    deluxe.push(dcor);
    deluxe.push(dgc);
    deluxe.push(dgw);
    deluxe.push(dsl);
    combo.push(clt);
    combo.push(csal);
    combo.push(csh);
    combo.push(ccor);
    combo.push(cgc);
    combo.push(cgw);
    combo.push(csl);
    arr.push(pattie);
    arr.push(deluxe);
    arr.push(combo);
    temp_data = arr;
    var x1 = plt + psal + psh + pcor + pgc + pgw + psl;
    var x2 = dlt + dsal + dsh + dcor + dgc + dgw + dsl;
    var x3 = clt + csal + csh + ccor + cgc + cgw + csl;
    var x4 = plt + dlt + clt;
    var x5 = psal + dsal + csal;
    var x6 = psh + dsh + csh;
    var x7 = pcor + dcor + ccor;
    var x8 = pgc + dgc + cgc;
    var x9 = pgw + dgw + cgw;
    var x10 = psl + dsl + csl;
    refresh();
    showCount(x1, x2, x3, x4, x5, x6, x7, x8, x9, x10);
    updateSalesByDate("Burger Sales", 7);
}

function updateSalesByDate(name, num) {
    var ctx = document.getElementById('myChart');
    var color = randomColorFilter(num);
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Krabby Pattie', 'Krusty Deluxe', 'Krusty Combo'],
            datasets: [{
                    label: 'Leatherback Turtle',
                    data: [temp_data[0][0], temp_data[1][0], temp_data[2][0]],
                    backgroundColor: [color[0], color[0], color[0]],
                    borderColor: [],
                    borderWidth: 1
                },
                {
                    label: 'Salmon',
                    data: [temp_data[0][1], temp_data[1][1], temp_data[2][1]],
                    backgroundColor: [color[1], color[1], color[1]],
                    borderColor: [],
                    borderWidth: 1
                },
                {
                    label: 'Seahorse',
                    data: [temp_data[0][2], temp_data[1][2], temp_data[2][2]],
                    backgroundColor: [color[2], color[2], color[2]],
                    borderColor: [],
                    borderWidth: 1
                },
                {
                    label: 'Coral',
                    data: [temp_data[0][3], temp_data[1][3], temp_data[2][3]],
                    backgroundColor: [color[3], color[3], color[3]],
                    borderColor: [],
                    borderWidth: 1
                },
                {
                    label: 'Giant Clam',
                    data: [temp_data[0][4], temp_data[1][4], temp_data[2][4]],
                    backgroundColor: [color[4], color[4], color[4]],
                    borderColor: [],
                    borderWidth: 1
                },
                {
                    label: 'Gray Whale',
                    data: [temp_data[0][5], temp_data[1][5], temp_data[2][5]],
                    backgroundColor: [color[5], color[5], color[5]],
                    borderColor: [],
                    borderWidth: 1
                },
                {
                    label: 'Sea Lion',
                    data: [temp_data[0][6], temp_data[1][6], temp_data[2][6]],
                    backgroundColor: [color[6], color[6], color[6]],
                    borderColor: [],
                    borderWidth: 1
                }
            ],
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
    var sales = obj.sales;
    var arr = [],
        time_arr = [];

    for (x in sales) {
        var date = sales[x].datetime.substring(0, 10);
        var year = parseInt(date.substring(0, 4), 10);
        var mon = parseInt(date.substring(5, 7), 10);
        var day = parseInt(date.substring(8, 10), 10);
        var time = sales[x].datetime.substring(11, 14) + "00";

        if (year == aa && mon == bb && day == cc) {
            if (sales[x].burger == burger_type) {
                if (time_arr.includes(time)) {
                    var index = time_arr.indexOf(time);
                    arr[index] += 1;
                } else {
                    time_arr.push(time);
                    var num = 1;
                    arr.push(num);
                }
            }
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
    var sales = obj.sales;
    var arr = [],
        time_arr = [];

    for (x in sales) {
        var date = sales[x].datetime.substring(0, 10);
        var year = parseInt(date.substring(0, 4), 10);
        var mon = parseInt(date.substring(5, 7), 10);
        var day = parseInt(date.substring(8, 10), 10);
        var time = sales[x].datetime.substring(11, 14) + "00";

        if (year == aa && mon == bb && day == cc) {
            if (sales[x].species == customer) {
                if (time_arr.includes(time)) {
                    var index = time_arr.indexOf(time);
                    arr[index] += 1;
                } else {
                    time_arr.push(time);
                    var num = 1;
                    arr.push(num);
                }
            }
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
    console.log(cc);
    var sales = obj.sales;
    var arr = [],
        time_arr = [];

    for (x in sales) {
        var date = sales[x].datetime.substring(0, 10);
        var year = parseInt(date.substring(0, 4), 10);
        var mon = parseInt(date.substring(5, 7), 10);
        var day = parseInt(date.substring(8, 10), 10);
        var time = sales[x].datetime.substring(11, 14) + "00";

        if (year == aa && mon == bb && day == cc) {
            if (time_arr.includes(time)) {
                var index = time_arr.indexOf(time);
                arr[index] += 1;
            } else {
                time_arr.push(time);
                var num = 1;
                arr.push(num);
            }
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
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

function loadSalesByBurgerCustomer(burger_type, customer) {
    var sales = obj.sales;
    var arr = [],
        date_arr = [];

    for (x in sales) {
        var date = sales[x].datetime.substring(0, 10);

        if (sales[x].burger == burger_type && sales[x].species == customer) {
            if (date_arr.includes(date)) {
                var index = date_arr.indexOf(date);
                arr[index] += 1;
            } else {
                date_arr.push(date);
                var num = 1;
                arr.push(num);
            }
        }
    }
    temp = date_arr;
    temp_data = arr;
    init();
    updateSalesByComplete(burger_type + " orders by " + customer, arr.length);
    createSalesPerDay(burger_type, customer);
    $(".scroll").css("overflow-y", "scroll");
}

function loadSalesByDateBurgerCustomer(date, burger_type, customer) {
    var new_date = new Date(date);
    var aa = new_date.getFullYear();
    var bb = new_date.getMonth() + 1;
    var cc = new_date.getDate();
    var sales = obj.sales;
    var arr = [],
        time_arr = [];

    for (x in sales) {
        var date = sales[x].datetime.substring(0, 10);
        var year = parseInt(date.substring(0, 4), 10);
        var mon = parseInt(date.substring(5, 7), 10);
        var day = parseInt(date.substring(8, 10), 10);
        var time = sales[x].datetime.substring(11, 14) + "00";

        if (year == aa && mon == bb && day == cc) {
            if (sales[x].burger == burger_type && sales[x].species == customer) {
                if (time_arr.includes(time)) {
                    var index = time_arr.indexOf(time);
                    arr[index] += 1;
                } else {
                    time_arr.push(time);
                    var num = 1;
                    arr.push(num);
                }
            }
        }
    }
    temp = time_arr;
    temp_data = arr;
    init();
    updateSalesByComplete(burger_type + " orders by " + customer + " in " + month_list[bb - 1] + " " + cc + ", " + aa, time_arr.length);
    $(".scroll").css("overflow-y", "scroll");
}

function randomColorFilter(num) {
    var arr = [];
    var x = 0;
    while (x < num) {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        if (!arr.includes(color) && color != 'rgb(40,43,48)') {
            arr.push(color);
            x++;
        }
    }
    return arr;
}

function updateSalesByComplete(name, num) {
    $(".scroll").css("overflow-y", "scroll");
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
                borderWidth: 1,
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
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

function constructChartComponent(object) {

    salesList = Object.keys(object.sales);
    for (x in object.sales) {
        var temp_burger = object.sales[x].burger;
        var temp_customer = object.sales[x].species;

        if (!burgerList.includes(temp_burger)) {
            burgerList.push(temp_burger);
        }
        if (!customerList.includes(temp_customer)) {
            customerList.push(temp_customer);
        }
    }
    burgerList.sort();
    customerList.sort();
    console.log(salesList);
    console.log(burgerList);
    console.log(customerList);
}

function filterData(date, burger, customer) {
    refresh();
    if (date == '') {
        if (burger == 'all' && customer == 'all') {
            loadAllSales();
            createAllSalesTable();
        } else {
            if (burger == 'all') {
                loadSalesByCustomer(customer);
            } else if (customer == 'all') {
                loadSalesByBurger(burger);
            } else {
                loadSalesByBurgerCustomer(burger, customer);
            }
        }
    } else {
        if (burger == 'all' && customer == 'all') {
            loadAllSalesByDate(date);
            loadTimePerDayAll(date);
        } else {
            if (burger == 'all') {
                loadSalesByCustomerDate(date, customer);
                loadTimePerDayCustomer(date, customer);
            } else if (customer == 'all') {
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
    $(".scroll").css("overflow-y", "scroll");
    var col = ['No.', 'ID', 'Datetime', 'Burger', 'Species'];

    var table = document.createElement("table");
    var tr = table.insertRow(-1); // TABLE ROW.

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th"); // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    var ctr = 0;
    for (x in obj.sales) {
        tr = table.insertRow(-1);
        var data = obj.sales[x];

        for (var i = 0; i < col.length; i++) {
            var tabCell = tr.insertCell(-1);
            if (i == 0) {
                tabCell.innerHTML = ctr + 1;
            } else if (i == 1) {
                tabCell.innerHTML = salesList[ctr];
            } else if (i == 2) {
                tabCell.innerHTML = data.datetime;
            } else if (i == 3) {
                tabCell.innerHTML = data.burger;
            } else if (i == 4) {
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
    $(".scroll").css("overflow-y", "scroll");
    var col = ['No.', 'ID', 'Datetime', 'Burger', 'Species'];

    var table = document.createElement("table");
    var tr = table.insertRow(-1); // TABLE ROW.

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th"); // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    var ctr = 0;
    var counter = 0;
    for (x in obj.sales) {
        if (obj.sales[x].burger == burger_type && obj.sales[x].species == customer) {
            tr = table.insertRow(-1);
            var data = obj.sales[x];

            for (var i = 0; i < col.length; i++) {
                var tabCell = tr.insertCell(-1);
                if (i == 0) {
                    tabCell.innerHTML = ctr + 1;
                } else if (i == 1) {
                    tabCell.innerHTML = salesList[counter];
                } else if (i == 2) {
                    tabCell.innerHTML = data.datetime;
                } else if (i == 3) {
                    tabCell.innerHTML = data.burger;
                } else if (i == 4) {
                    tabCell.innerHTML = data.species;
                }
            }
            ctr++;
        }
        counter++;
    }

    var tt = document.getElementById("showData");
    tt.hidden = false;
    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);

}

function customerPerDay() {
    $(".scroll").css("overflow-y", "scroll");
    var col = ['No.', 'Datetime', 'Customer'];

    var table = document.createElement("table");
    var tr = table.insertRow(-1); // TABLE ROW.

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th"); // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    var time = [],
        number = [];
    for (x in obj.sales) {
        tr = table.insertRow(-1);
        var data = obj.sales[x];

        var temp = data.datetime.substring(0, 10);
        if (!time.includes(temp)) {
            time.push(temp);
            var num = 1;
            number.push(num);
        } else {
            var index = time.indexOf(temp);
            number[index] += 1;
        }
    }

    for (var x = 0; x < time.length; x++) {
        tr = table.insertRow(-1);
        for (var i = 0; i < col.length; i++) {
            var tabCell = tr.insertCell(-1);
            if (i == 0) {
                tabCell.innerHTML = x + 1;
            } else if (i == 1) {
                tabCell.innerHTML = time[x];
            } else if (i == 2) {
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
    if (myChart != null) {
        myChart.clear();
        myChart.destroy();
        myChart = null;
    }

    if (oneDay != null) {
        oneDay.clear();
        oneDay.destroy();
        oneDay = null;
    }
    init();
}

function upload(file) {
    obj = file;
    console.log(obj);
}
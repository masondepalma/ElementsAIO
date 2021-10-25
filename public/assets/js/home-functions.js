const fs = require('fs');
const Highcharts = require('highcharts');

var keyLoad = ""
fs.readFile('./public/assets/data/key.json', (err, data) => {
    if (err) throw err;
    var keyLoad = JSON.parse(data);
    if (keyLoad.key == null){
      console.log('Error');
      ipc.send('redirect1');
    } else {
        document.getElementsByClassName("username").forEach(element => {
            element.innerHTML = (keyLoad.user + keyLoad.descrimator);
        });
        document.getElementsByClassName("avatar").forEach(element => {
            element.setAttribute("src", keyLoad.image); 
        });
    }
});

JanCount = 0
FebCount = 0
MarCount = 0
AprCount = 0
MayCount = 0
JuneCount = 0
JulyCount = 0
AugCount = 0
SeptCount = 0
OctCount = 0
NovCount = 0
DecCount = 0

fs.readFile('./public/assets/data/success.json', (err, data) => {
    if (err) throw err;
    successLoad = JSON.parse(data);
    spendingTotal = 0
    successLoad.success.forEach(entry => {
        spendingTotal += entry.price
        if (entry.TimeDate.split("|")[1].split('/')[0] == "1"){
            month = "Jan"
            JanCount += 1
        } else if (entry.TimeDate.split("|")[1].split('/')[0] == "2"){
            month = "Feb"
            FebCount += 1
        } else if (entry.TimeDate.split("|")[1].split('/')[0] == "3"){
            month = "Mar"
            MarCount += 1
        } else if (entry.TimeDate.split("|")[1].split('/')[0] == "4"){
            month = "Apr"
            AprCount += 1
        } else if (entry.TimeDate.split("|")[1].split('/')[0] == "5"){
            month = "May"
            MayCount += 1
        } else if (entry.TimeDate.split("|")[1].split('/')[0] == "6"){
            month = "June"
            JuneCount += 1
            console.log("g")
        } else if (entry.TimeDate.split("|")[1].split('/')[0] == "7"){
            month = "July"
            JulyCount += 1
        } else if (entry.TimeDate.split("|")[1].split('/')[0] == "8"){
            month = "Aug"
            AugCount += 1
        } else if (entry.TimeDate.split("|")[1].split('/')[0] == "9"){
            month = "Sept"
            SeptCount += 1
        } else if (entry.TimeDate.split("|")[1].split('/')[0] == "10"){
            month = "Oct"
            OctCount += 1
        } else if (entry.TimeDate.split("|")[1].split('/')[0] == "11"){
            month = "Nov"
            NovCount += 1
        } else if (entry.TimeDate.split("|")[1].split('/')[0] == "12"){
            month = "Dec"
            DecCount += 1
        }
        var item = `
        <div class="checkout-bx-single">
            <div class="checkout-left">
                <div class="checkout-thumb">
                    <img src="${entry.ProductImage}" alt="">
                </div>
                <div class="checkout-meddle-txt">
                    <h4>${entry.ProductName}</h4>
                    <p>${entry.Store} - ${entry.TimeDate.split("|")[0]}</p>
                </div>
            </div>
            <div class="checkout-right-txt">
                <div class="ck-right wbr">
                    <h4>$${entry.price}</h4>
                    <p>${entry.Profile}</p>
                </div>
                <div class="ck-right">
                    <h4>${month}</h4>
                    <p>${entry.TimeDate.split("|")[1].split('/')[1]}th</p>
                </div>
            </div>
        </div>
        `
        document.getElementById('past-checkouts').insertAdjacentHTML('beforeend',item)
    });
    document.getElementById("success-total").innerHTML = successLoad.success.length
    document.getElementById("decline-total").innerHTML = successLoad.declines
    document.getElementById("total-spending").innerHTML = `$${spendingTotal}`
    Highcharts.chart('spending-chart', {
        title: {
            enabled: true,
            text:"Checkouts"
        },
        chart: {
            type: 'areaspline',
            margin: [20, 10, 20, 40]
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
            tickLength: 0,
            labels: {
                style: {
                    color: '#000000'
                }
            }
    
        },
        yAxis: {
            labels: {
                style: {
                    color: '#000000'
                }
            }
        },
        tooltip: {
            useHTML: true,
            style: {
                color: '#CBCBCB',
                fontWeight: 'bold',
                padding: 0
            },
            backgroundColor: null,
            borderWidth: 0,
            shadow: false,
            formatter: function () {
                return (
                    '<div style="border-radius: 6px; background-color: #111433; padding: 0px 11px 0px 11px; text-align:center;"><span style="font-weight:bold; font-size:16px;">' +
                    this.y +
                    '</span><br>' +
                    this.x +
                    '</div>'
                )
            },
        },
        series: [{
            data: [JanCount, FebCount, MarCount, AprCount, MayCount, JuneCount, JulyCount, AugCount, SeptCount, OctCount, NovCount, DecCount],
            name: 'Checkouts',
            type: 'areaspline',
            color: '#000000',
            fillColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1,
                },
                stops: [
                    [0, 'rgb(64, 64, 64)'],
                    [1, 'rgb(128, 128, 128)'],
                ],
            },
        }],
        legend: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            series: {
                pointPlacement: 'on',
                marker: {
                    enabled: false
                }
            },
            area: {
                marker: {
                    radius: 2,
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1,
                    },
                },
                threshold: null
            },
        },
    
    });
});




import { LinearGradient } from 'echarts/lib/util/graphic'

let chart1 = {

  tooltip: {
    trigger: 'axis'
  },
  legend: {
    orient: 'vertical',
    data: ['简易程序案件数']
  },
  grid: {
    left: '3%',
    right: '3%',
    top: '25%',
    bottom: '5%',
    containLabel: true
  },
  color: ['#a4d8cc', '#25f3e6'],
  toolbox: {
    show: false,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },

  calculable: true,
  xAxis: [
    {
      type: 'category',

      axisTick: { show: false },

      boundaryGap: false,
      axisLabel: {
        textStyle: {
          color: '#ccc',
          fontSize: '12'
        },
        lineStyle: {
          color: '#2c3459',
        },
        interval: 'auto',
        rotate: 50,
        formatter: function(params) {
          let newParamsName = "";// 最终拼接成的字符串
          let paramsNameNumber = params.length;// 实际标签的个数
          let provideNumber = 4;// 每行能显示的字的个数
          let rowNumber = Math.ceil(paramsNameNumber / provideNumber);// 换行的话，需要显示几行，向上取整
          /**
           * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
           */
          // 条件等同于rowNumber>1
          if(paramsNameNumber > provideNumber) {
            /** 循环每一行,p表示行 */
            let tempStr = params.substring(0, 4);
            newParamsName = tempStr + "...";// 最终拼成的字符串
          } else {
            // 将旧标签的值赋给新标签
            newParamsName = params;
          }
          //将最终的字符串返回
          return newParamsName
        }

      },
      data: ['0时', '1时', '2时', '3时', '4时', '5时', '6时', '7时', '8时', '9时', '10时', '11时', '12时', '13时', '14时', '15时', '16时', '17时'
        , '18时', '19时', '20时', '21时', '22时', '23时']
    }
  ],
  yAxis: {

    type: 'value',
    axisLabel: {
      textStyle: {
        color: '#ccc',
        fontSize: '12',
      }
    },
    axisLine: {
      lineStyle: {
        color: 'rgba(160,160,160,0.3)',
      }
    },
    splitLine: {
      lineStyle: {
        color: 'rgba(160,160,160,0.3)',
      }
    },

  },
  series: [
    {
      // name:'简易程序案件数',
      type: 'line',
      areaStyle: {

        normal: {
          type: 'default',
          color: new LinearGradient(0, 0, 0, 0.8, [{
            offset: 0,
            color: '#25f3e6'
          }, {
            offset: 1,
            color: '#0089ff'
          }], false)
        }
      },
      smooth: true,
      itemStyle: {
        normal: { areaStyle: { type: 'default' } }
      },
      data: [710, 312, 321, 754, 500, 830, 710, 521, 504, 660, 530, 410, 710, 312, 321, 754, 500, 830, 710, 521, 504, 660, 530, 410]
    }
  ]
};

let valdata = [702, 406];
let myColor = ['#1089E7', '#F57474', '#56D0E3', '#F8B448', '#8B78F6'];
let chart2 = {
  // title: {
  //   text: '设备使用频率',
  //   x: 'center',
  //   textStyle: {
  //     color: '#FFF'
  //   },
  //   left: '6%',
  //   top: '10%'
  // },
  //图标位置
  grid: {
    top: '15%',
    left: '20%',
    right: '10%',
    bottom: '5%',
  },
  xAxis: {
    show: false
  },
  yAxis: [{
    show: true,
    data: ['温度', '湿度'],
    inverse: true,
    axisLine: {
      show: false
    },
    splitLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      color: '#fff',
      formatter: (value, index) => {
        return [

          `{lg|${index + 1}}  ` + '{title|' + value + '} '
        ].join('\n')
      },
      rich: {
        lg: {
          backgroundColor: '#339911',
          color: '#fff',
          borderRadius: 15,
          // padding: 5,
          align: 'center',
          width: 15,
          height: 15
        },
      }
    },
  }, {
    show: true,
    data: [27, 30],
    axisLabel: {
      textStyle: {
        fontSize: 12,
        color: '#fff',
      },
    },
    axisLine: {
      show: false
    },
    splitLine: {
      show: false
    },
    axisTick: {
      show: false
    },

  }],
  series: [{
    name: '条',
    type: 'bar',
    yAxisIndex: 0,
    data: [30, 27],
    barWidth: 10,
    itemStyle: {
      normal: {
        barBorderRadius: 20,
        color: function(params) {
          var num = myColor.length;
          return myColor[params.dataIndex % num]
        },
      }
    },
  }, {
    name: '框',
    type: 'bar',
    yAxisIndex: 1,
    barGap: '-100%',
    data: [100, 100],
    barWidth: 15,
    itemStyle: {
      normal: {
        color: 'none',
        borderColor: '#00c1de',
        borderWidth: 3,
        barBorderRadius: 15,
      }
    }
  },]
};

const waterfillColors = {
  '1': new LinearGradient(0, 0, 0, 0.8, [{
    offset: 0,
    color: '#ffbb96'
  }, {
    offset: 1,
    color: '#f5222d'
  }], false),
  '2': new LinearGradient(0, 0, 0, 0.8, [{
    offset: 0,
    color: '#ffe58f'
  }, {
    offset: 1,
    color: '#fa8c16'
  }], false),
  '3': new LinearGradient(0, 0, 0, 0.8, [{
    offset: 0,
    color: '#fffb8f'
  }, {
    offset: 1,
    color: '#faad14'
  }], false),
  '4': new LinearGradient(0, 0, 0, 0.8, [{
    offset: 0,
    color: '#eaff8f'
  }, {
    offset: 1,
    color: '#a0d911'
  }], false),
  '5': new LinearGradient(0, 0, 0, 0.8, [{
    offset: 0,
    color: '#87e8de'
  }, {
    offset: 1,
    color: '#52c41a'
  }], false),
  '6': new LinearGradient(0, 0, 0, 0.8, [{
    offset: 0,
    color: '#91d5ff'
  }, {
    offset: 1,
    color: '#2f54eb'
  }], false),
};

const l1_liquidfill = (name) => ({
  series: [{
    center: ['50%', '50%'],
    radius: '70%',
    type: 'liquidFill',
    data: [{
      name: name,
      value: 0.2,
      direction: 'left',
      itemStyle: {
        color: waterfillColors['5']
      }
    }],
    itemStyle: {
      shadowBlur: 0
    },
    //let myColor = ['#1089E7', '#F57474', '#56D0E3', '#F8B448', '#8B78F6'];
    backgroundStyle: {
      borderWidth: 2,
      borderColor: '#a4d8cc',
      color: 'rgba(0,0,0,0)'  //transparent
    },
    shape: "circle",
    outline: {
      show: false,
    },
    // outline: {
    //   show: true,
    //   borderDistance: 0,
    //   itemStyle: {
    //     borderWidth: 2,
    //     // shadowBlur: 20,
    //     // shadowColor: 'rgba(255, 0, 0, 1)'
    //   }
    // },
    label: {
      show: true,
      color: '#fff',
      insideColor: '#fff',
      fontSize: 18,
      // {a} refers to series name, {b} to data name, and {c} to data value.
      formatter: '{b}',
      align: 'center',
      baseline: 'middle',
      position: 'inside'
    },
  }],
});

const l2_pie = {
  tooltip: {
    trigger: 'item',
    formatter: "{a} <br/>{b} : {c}ppm"
  },
  legend: {
    x: 'center',
    y: '15%',
    data: ['SO2', 'HF', 'H2S', 'CO', '微水', '粉尘'],
    icon: 'circle',
    textStyle: {
      color: '#fff',
    }
  },
  calculable: true,
  series: [{
    name: '',
    type: 'pie',
    //起始角度，支持范围[0, 360]
    startAngle: 0,
    //饼图的半径，数组的第一项是内半径，第二项是外半径
    radius: [41, 80.75],
    //支持设置成百分比，设置成百分比时第一项是相对于容器宽度，第二项是相对于容器高度
    center: ['50%', '40%'],
    //是否展示成南丁格尔图，通过半径区分数据大小。可选择两种模式：
    // 'radius' 面积展现数据的百分比，半径展现数据的大小。
    //  'area' 所有扇区面积相同，仅通过半径展现数据大小
    roseType: 'area',
    //是否启用防止标签重叠策略，默认开启，圆环图这个例子中需要强制所有标签放在中心位置，可以将该值设为 false。
    avoidLabelOverlap: false,
    label: {
      normal: {
        show: true,
        formatter: '{c}ppm'
      },
      emphasis: {
        show: true
      }
    },
    labelLine: {
      normal: {
        show: true,
        length2: 1,
      },
      emphasis: {
        show: true
      }
    },
    data: [{
      value: 1300.58,
      name: 'SO2',
      itemStyle: {
        normal: {
          color: '#4777f5'
        }
      }
    },
      {
        value: 1400.58,
        name: 'HF',
        itemStyle: {
          normal: {
            color: '#44aff0'
          }
        }
      },
      {
        value: 1500.58,
        name: 'H2S',
        itemStyle: {
          normal: {
            color: '#45dbf7'
          }
        }
      },
      {
        value: 1500.58,
        name: 'CO',
        itemStyle: {
          normal: {
            color: '#f6d54a'
          }
        }
      },
      {
        value: 1600.58,
        name: '微水',
        itemStyle: {
          normal: {
            color: '#f69846'
          }
        }
      },
      {
        value: 1800,
        name: '粉尘',
        itemStyle: {
          normal: {
            color: '#ff4343'
          }
        }
      },
      {
        value: 0,
        name: "",
        itemStyle: {
          normal: {
            color: 'transparent'
          }
        },
        label: {
          show: false
        },
        labelLine: {
          show: false
        }
      },
      {
        value: 0,
        name: "",
        itemStyle: {
          normal: {
            color: 'transparent'
          }
        },
        label: {
          show: false
        },
        labelLine: {
          show: false
        }
      },
      {
        value: 0,
        name: "",
        itemStyle: {
          normal: {
            color: 'transparent'
          }
        },
        label: {
          show: false
        },
        labelLine: {
          show: false
        }
      },
      {
        value: 0,
        name: "",
        itemStyle: {
          normal: {
            color: 'transparent'
          }
        },
        label: {
          show: false
        },
        labelLine: {
          show: false
        }
      },
      {
        value: 0,
        name: "",
        itemStyle: {
          normal: {
            color: 'transparent'
          }
        },
        label: {
          show: false
        },
        labelLine: {
          show: false
        }
      },
      {
        value: 0,
        name: "",
        itemStyle: {
          normal: {
            color: 'transparent'
          }
        },
        label: {
          show: false
        },
        labelLine: {
          show: false
        }
      },
    ]
  }]
};


export { chart1, chart2, l1_liquidfill, l2_pie };

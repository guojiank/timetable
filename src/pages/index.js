// import styles from './index.css';
import layout_styles from './layout.css';
import { Table } from 'antd';
import { getWeekOfYear, getArray } from '../util/week';
import 'antd/dist/antd.css';
import React, { Component } from 'react';
import dataSource from '../data/2019_the_first_term';
import { Radio, Button } from 'antd';
import { Select } from 'antd';
const Option = Select.Option;

const weeks = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

class Index extends Component {
  // 减8 是因为这个学期是从2019年的第8周开始的
  state = { data: [], week: getWeekOfYear() - 8 };

  filter = 'name';
  options = getArray();

  update = () => {
    let data = [];
    let { week } = this.state;
    for (let i = 1; i <= 11; i++) {
      let class_obj = {};
      class_obj['key'] = i;
      weeks.forEach(w => {
        let obj = dataSource
          .filter(e => {
            if (e.weeks.filter !== undefined) {
              if (e.weeks.filter === 'double') {
                return e.weeks.begin <= week && e.weeks.end >= week && week % 2 === 0;
              }
            } else {
              return e.weeks.begin <= week && e.weeks.end >= week;
            }
          })
          .filter(e => e.day === w)
          .filter(e => e.classes.indexOf(i) !== -1);

        let class_name = obj.length > 0 ? obj[0][this.filter] : '';
        class_obj[w] = class_name;
      });
      data.push(class_obj);
    }
    this.setState({ data: data });
  };

  componentWillMount() {
    this.update();
  }

  handChange = v => {
    if (v === undefined) return;
    this.setState({ week: v });
    this.update();
  };

  handleBackDay = () => {
    let today = getWeekOfYear() - 8;
    this.handChange(today);
  };

  render() {
    const columns = [
      {
        title: '时间段',
        dataIndex: 'timeSlot',
        render: (text, row, index) => {
          let i = index + 1;
          if (i <= 5) {
            if (i == 1) {
              return {
                children: '上午',
                props: { rowSpan: 5 },
              };
            } else {
              return {
                children: '上午',
                props: { rowSpan: 0 },
              };
            }
          } else if (i > 5 && i <= 9) {
            if (i == 6) {
              return {
                children: '下午',
                props: { rowSpan: 4 },
              };
            } else {
              return {
                children: '下午',
                props: { rowSpan: 0 },
              };
            }
          } else {
            if (i == 10) {
              return {
                children: '晚上',
                props: { rowSpan: 2 },
              };
            } else {
              return {
                children: '晚上',
                props: { rowSpan: 0 },
              };
            }
          }
        },
      },
      {
        title: '节次',
        dataIndex: 'classes',
        render: (text, row, index) => {
          return <div>{index + 1}</div>;
        },
      },
      {
        title: '周一',
        dataIndex: 'monday',
      },
      {
        title: '周二',
        dataIndex: 'tuesday',
      },
      {
        title: '周三',
        dataIndex: 'wednesday',
      },
      {
        title: '周四',
        dataIndex: 'thursday',
      },
      {
        title: '周五',
        dataIndex: 'friday',
      },
    ];

    console.info(this.filter);
    return (
      <div>
        <h1 className={layout_styles.title}>2019年上学期第{this.state.week}周 课程表</h1>
        <br />
        <br />
        <div>
          <Radio.Group
            onChange={e => {
              this.filter = e.target.value;
              this.update();
            }}
            defaultValue="name"
          >
            <Radio.Button value="name">课程名称</Radio.Button>
            <Radio.Button value="address">教室地址</Radio.Button>
            <Radio.Button value="teacher">老师名称</Radio.Button>
          </Radio.Group>

          <Select
            defaultValue="第1周"
            value={this.state.week}
            style={{ width: 120 }}
            onChange={this.handChange}
          >
            {this.options.map(e => (
              <Option key={e} value={e}>
                第{e}周
              </Option>
            ))}
          </Select>
          <Button onClick={this.handleBackDay}>回到本周</Button>
        </div>
        <br />
        <Table
          pagination={{ pageSize: 11 }}
          columns={columns}
          dataSource={this.state.data}
          bordered
        />
      </div>
    );
  }
}

export default Index;

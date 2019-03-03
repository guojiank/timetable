import styles from './layout.css';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import React, { Component } from 'react';
import { Radio, Button, Select } from 'antd';
import { connect } from 'dva';
const Option = Select.Option;

const mapStateToProps = state => {
  let currentState = state['timetable'];
  return {
    ...currentState,
  };
};

@connect(mapStateToProps)
class Index extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'timetable/initData',
    });
  }

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

    const { dispatch } = this.props;
    return (
      <div>
        <h1 className={styles.title}>2019年上学期第{this.props.currentWeek}周 课程表</h1>
        <br />
        <br />
        <div>
          <Radio.Group
            onChange={e => {
              dispatch({ type: 'timetable/changeFilter', payload: e.target.value });
            }}
            defaultValue="name"
          >
            <Radio.Button value="name">课程名称</Radio.Button>
            <Radio.Button value="address">教室地址</Radio.Button>
            <Radio.Button value="teacher">老师名称</Radio.Button>
          </Radio.Group>

          <Select
            defaultValue="第1周"
            value={this.props.currentWeek}
            style={{ width: 120 }}
            onChange={value => {
              dispatch({
                type: 'timetable/changeCurrentWeek',
                payload: value,
              });
            }}
          >
            {this.props.selectOptions.map(e => (
              <Option key={e} value={e}>
                第{e}周
              </Option>
            ))}
          </Select>

          <Button
            onClick={() => {
              dispatch({
                type: 'timetable/backToCurrentWeek',
              });
            }}
          >
            回到本周
          </Button>
        </div>
        <br />
        <Table
          pagination={{ pageSize: 11 }}
          columns={columns}
          dataSource={this.props.data}
          bordered
        />
      </div>
    );
  }
}

export default Index;

import { getWeekOfYear } from '../util/tool';
import dataSource from '../data/2019_the_first_term';

export default {
  namespace: 'timetable',

  state: {
    data: [],
    currentWeek: getWeekOfYear() - 8, // 2019学期是从第8周开始
    days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    filter: 'name',
    selectOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
  },

  reducers: {
    test(state, _) {
      console.info('hello');
      return state;
    },

    changeCurrentWeek(state, { payload: value }) {
      const { days, filter } = state;
      const currentWeek = value;
      const data = [];
      for (let i = 1; i <= 11; i++) {
        let classObj = {};
        classObj['key'] = i;
        days.forEach(w => {
          let obj = dataSource
            .filter(e => {
              if (e.weeks.filter === undefined) {
                return e.weeks.begin <= currentWeek && e.weeks.end >= currentWeek;
              } else {
                if (e.weeks.filter === 'double') {
                  let result =
                    e.weeks.begin <= currentWeek &&
                    e.weeks.end >= currentWeek &&
                    currentWeek % 2 == 0;
                  return result;
                }
              }
            })
            .filter(e => e.day === w)
            .filter(e => e.classes.indexOf(i) !== -1);

          let class_name = obj.length > 0 ? obj[0][filter] : '';
          classObj[w] = class_name;
        });
        data.push(classObj);
      }

      return {
        ...state,
        data,
        currentWeek: value,
      };
    },
    backToCurrentWeek(state, _) {
      const { days, filter } = state;
      const currentWeek = getWeekOfYear() - 8;
      const data = [];
      for (let i = 1; i <= 11; i++) {
        let classObj = {};
        classObj['key'] = i;
        days.forEach(w => {
          let obj = dataSource
            .filter(e => {
              if (e.weeks.filter === undefined) {
                return e.weeks.begin <= currentWeek && e.weeks.end >= currentWeek;
              } else {
                if (e.weeks.filter === 'double') {
                  let result =
                    e.weeks.begin <= currentWeek &&
                    e.weeks.end >= currentWeek &&
                    currentWeek % 2 == 0;
                  return result;
                }
              }
            })
            .filter(e => e.day === w)
            .filter(e => e.classes.indexOf(i) !== -1);

          let class_name = obj.length > 0 ? obj[0][filter] : '';
          classObj[w] = class_name;
        });
        data.push(classObj);
      }

      return {
        ...state,
        data,
        currentWeek,
      };
    },
    changeFilter(state, { payload: value }) {
      const { days, currentWeek } = state;
      const filter = value;
      const data = [];
      for (let i = 1; i <= 11; i++) {
        let classObj = {};
        classObj['key'] = i;
        days.forEach(w => {
          let obj = dataSource
            .filter(e => {
              if (e.weeks.filter === undefined) {
                return e.weeks.begin <= currentWeek && e.weeks.end >= currentWeek;
              } else {
                if (e.weeks.filter === 'double') {
                  let result =
                    e.weeks.begin <= currentWeek &&
                    e.weeks.end >= currentWeek &&
                    currentWeek % 2 == 0;
                  return result;
                }
              }
            })
            .filter(e => e.day === w)
            .filter(e => e.classes.indexOf(i) !== -1);

          let class_name = obj.length > 0 ? obj[0][filter] : '';
          classObj[w] = class_name;
        });
        data.push(classObj);
      }

      return {
        ...state,
        data: data,
        filter,
      };
    },
    initData(state, _) {
      const { days, currentWeek, filter } = state;
      const data = [];
      for (let i = 1; i <= 11; i++) {
        let classObj = {};
        classObj['key'] = i;
        days.forEach(w => {
          let obj = dataSource
            .filter(e => {
              if (e.weeks.filter === undefined) {
                return e.weeks.begin <= currentWeek && e.weeks.end >= currentWeek;
              } else {
                if (e.weeks.filter === 'double') {
                  let result =
                    e.weeks.begin <= currentWeek &&
                    e.weeks.end >= currentWeek &&
                    currentWeek % 2 == 0;
                  return result;
                }
              }
            })
            .filter(e => e.day === w)
            .filter(e => e.classes.indexOf(i) !== -1);

          let class_name = obj.length > 0 ? obj[0][filter] : '';
          classObj[w] = class_name;
        });
        data.push(classObj);
      }

      return {
        ...state,
        data: data,
      };
    },
  },
};

import styles from './index.css';

import { getWeekOfYear } from '../util/week';
let week = getWeekOfYear();

function BasicLayout(props) {
  return <div className={styles.normal}>{props.children}</div>;
}

export default BasicLayout;

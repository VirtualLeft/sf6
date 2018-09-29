import React, {PureComponent, Fragment} from 'react';
import styles from "./index.less"
import autoHeight from "../autoHeight";

@autoHeight()
class LineBox extends PureComponent {
  render() {
    const {title, icon, style, height, autoHeight} = this.props;
    let h = height || (style && style.height) || autoHeight;
    return (
      <div style={{...style, height: h}} className={styles.main}>
        <div className={styles.t_line_box}>
          <i className={styles.t_l_line}/>
          <i className={styles.l_t_line}/>
        </div>
        <div className={styles.t_line_box}>
          <i className={styles.t_r_line}/>
          <i className={styles.r_t_line}/>
        </div>
        <div className={styles.t_line_box}>
          <i className={styles.l_b_line}/>
          <i className={styles.b_l_line}/>
        </div>
        <div className={styles.t_line_box}>
          <i className={styles.r_b_line}/>
          <i className={styles.b_r_line}/>
        </div>
        {
          title &&
            <div className={styles.main_title}>
              {/*<img src="./t_1.png" alt=""/>*/}
              {title}
            </div>
        }
        <Fragment>
          {this.props.children}
        </Fragment>
      </div>
    )
  }
}

export default LineBox

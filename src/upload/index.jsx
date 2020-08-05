import React, { Component } from 'react';
import { message } from 'antd';
import XLSX from 'xlsx';
import './index.css';
class UpLoad extends Component {
  state = {
    data: [],
    card_data: [
      {
        id: 1,
        icon: require('../assets/images/1.png'),
        name: '学籍'
      },
      {
        id: 2,
        icon: require('../assets/images/2.png'),
        name: '成绩'
      },
      {
        id: 3,
        icon: require('../assets/images/3.png'),
        name: '学分'
      },
      {
        id: 4,
        icon: require('../assets/images/4.png'),
        name: '开题'
      },
      {
        id: 5,
        icon: require('../assets/images/5.png'),
        name: '期中'
      },
      {
        id: 6,
        icon: require('../assets/images/6.png'),
        name: '答辩'
      },
    ]
  }
  HandleImportFile = (e) => {
    console.log('e', e)
    let { files } = e.target
    // 获取文件名称
    let name = files[0].name
    // 获取文件后缀
    let suffix = name.substr(name.lastIndexOf("."));

    let reader = new FileReader();
    reader.onload = (event) => {
      try {
        // 判断文件类型是否正确
        if (".xls" !== suffix && ".xlsx" !== suffix) {
          message.error("选择Excel格式的文件导入！");
          return false;
        }

        let { result } = event.target
        // 读取文件
        let workbook = XLSX.read(result, { type: 'binary' });
        let data = []
        // 循环文件中的每个表
        for (let sheet in workbook.Sheets) {
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            // 将获取到表中的数据转化为json格式
            data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
          }
        }
        // 获取文件中所有数据的data数组
        this.setState({
          data
        })
        console.log(data)
        this.handleVideoDownload(data)

      } catch (e) {
        message.error('文件类型不正确！');
      }
    }
    reader.readAsBinaryString(files[0]);
  }

  // 处理视频下载
  handleVideoDownload = (data) => {
    let data_list = data;
    data_list.forEach(item => {
      console.log('拿到的每一项', item)
    })
  }
  render() {
    const { card_data } = this.state;
    return (
      <div className="upload">
        <input type="file" onChange={this.HandleImportFile} />
        <div className="card">
          {card_data.map(item => {
            return (
              <div className="card_item" key={item.id}>
                <div className="card_icon">
                  <img src={item.icon} alt="icon" />
                </div>
                <div className="name">{item.name}</div>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}

export default UpLoad;
import React, { useEffect } from 'react'

import {
  connect,
  useSelector,
  useDispatch
} from 'react-redux'

import action from '@/store/actions'

// 使用 connect() + 类组件
class Home extends React.Component {
  componentDidMount() {
    const str = 'ct=24&qqmusic_ver=1298&new_json=1&remoteplace=txt.yqq.song&searchid=61453023483879617&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p=1&n=10&w=%E5%BC%A0%E6%9D%B0&g_tk_new_20200303=921856724&g_tk=921856724&loginUin=448914712&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0'
    const params = {}
    str.split('&').map(ele=>{
      let arr = ele.split('=')
      params[arr[0]] = arr[1]
    })
    params.w = decodeURI(params.w)
    this.props.getList(params)
  }
  render() {
    console.log('test redux props', this.props)
    let { list } = this.props
    return (
      <div>
        <h1>Test Redux</h1>
        <hr/>
        {
          list.map(ele=>(
            <div key={ele.id}>
              <span>{ele.id}</span>
              <span>---</span>
              <span>{ele.name}</span>
            </div>
          ))
        }
      </div>
    )
  }
}

// 语法：connect(fn1, fn2)()

// fn1的作用：是把store中的state映射到当前组件的props上
function mapStateToProps(store) {
  return {
    list: store.music.list
  }
}
// fn2的作用：是把action生成器函数映射到当前组件的props上
function mapDispatchToProps(dispatch) {
  return {
    getList: params=>dispatch(action.musicListAction(params))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)

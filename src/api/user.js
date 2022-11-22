import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/sys/profile',
    method: 'post',
  })
}

export function getHeadInfo(id) {
  return request({
    url: `/sys/user/${id}`
  })
}

// 封装一个获取部门列表的接口
export function deptListAPI () {
    return request({
        url: '/company/department'
    })
}

// 封装一个删除部门的接口
export function delDeptAPI (id) {
  return request({
      url: `/company/department/${id}`,
      method: 'delete'
  })
}


// 封装一个添加部门的接口
export function addDeptAPI (data) {
  return request({
      url: '/company/department',
      method: 'post',
      data
  })
}


// 获取部门负责人
export function getChargeAPI () {
  return request({
      url: '/sys/user/simple'
  })
}


// 封装一个获取部门详情的接口
export function deptDetailAPI (id) {
  return request({
      url: `/company/department/${id}`
  })
}

// 封装一个修改部门的接口
export function editDeptAPI (data) {
  return request({
      url: `/company/department/${data.id}`,
      method: 'put',
      data
  })
}



// 封装一个获取员工列表的请求
// get请求用params，post请求用data
export function empList (params) {

  return request({
      url: '/sys/user',
      params
  })
}

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



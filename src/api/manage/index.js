import request from "@/utils/request";

const RESOURCE_BASE_PATH = "/campus/course";

const RESOURCE_BASE_PATH_chargeItem = "/campus/chargeItem";

const RESOURCE_BASE_PATH_coursePackage = "/campus/coursePackage";

const RESOURCE_BASE_PATH_teacher = "/campus/teacher";
const RESOURCE_BASE_PATH_student = "/campus/student";


const RESOURCE_BASE_PATH_order = "/campus/order";

const RESOURCE_BASE_PATH_courseClass = "/campus/courseClass";
const RESOURCE_BASE_PATH_onlineOrder = "/campus/onlineOrder";
const RESOURCE_BASE_PATH_integralGoods = "/campus/integralGoods";
const RESOURCE_BASE_PATH_integralManage = "/campus/integralManage";
const RESOURCE_BASE_PATH_integralOrder = "/campus/integralOrder";

const BASE = "/campus";

// 互动空间 classArrangeDateSign/lists
export function classArrangeDateSign(data) {
    return request({
        url: `${BASE}/classArrangeDateSign/lists`,
        method: "GET",
        params: data
    });
}
//互动详情 
export function classArrangeDateSign_detail(data) {
    return request({
        url: `${BASE}/classArrangeDateSign/${data}`,
        method: "GET"
    });
}
// 、、回复互动
export function commentClassArrangeDateSign(data) {
    return request({
        url: `${BASE}/classArrangeDateSign/commentClassArrangeDateSign`,
        method: "POST",
        data
    });
}
// 课程变化 manage/pauseRecord
export function pauseRecord(data) {
    return request({
        url: `${BASE}/manage/pauseRecord`,
        method: "GET",
        params: data
    });
}

// courseArrangeList 课程安排
export function courseArrangeList(data) {
    return request({
        url: `${BASE}/courseArrangeList`,
        method: "GET",
        params: data
    });
}

export function importStudent(data) {
    return request({
      url: `${BASE}/importStudent`,
      method: 'post',
      data
    })
  }


//下载学员模板 studentMouldDownload
export function studentMouldDownload(data) {
    return request({
        url: `${BASE}/studentMouldDownload`,
        method: "GET",
        params: data
    });
}

//请假记录 
export function leaveLists(data) {
    return request({
        url: `${BASE}/leaveLists`,
        method: "GET",
        params: data
    });
}
// 请假
export function addLeave(data) {
    return request({
        url: `${BASE}/addLeave`,
        method: "POST",
        data
    });
}
//请假详情
export function leaveInfo(data) {
    return request({
        url: `${BASE}/leaveInfo`,
        method: "GET",
        params: data
    });
}
//请假获取课程 getCourse
export function getCourse(data) {
    return request({
        url: `${BASE}/getCourse`,
        method: "POST",
        data
    });
}
// auditLeave审核
export function auditLeave(data) {
    return request({
        url: `${BASE}/auditLeave`,
        method: "POST",
        data
    });
}
//兑换记录 
export function integralOrder_list(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_integralOrder}/lists`,
        method: "GET",
        params: data
    });
}
//兑换 领取状态
export function integralOrder(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_integralOrder}/${data}`,
        method: "POST"
    });
}
//商品列表
export function integralGoods_list(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_integralGoods}/lists`,
        method: "GET",
        params: data
    });
}
//商品列表
export function integralGoods_detail(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_integralGoods}/${data}`,
        method: "GET"
    });
}


// 添加商品
export function integralGoods_add(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_integralGoods}`,
        method: "POST",
         data
    });
}
// 编辑商品
export function integralGoods_put(data,id) {
    return request({
        url: `${RESOURCE_BASE_PATH_integralGoods}/${id}`,
        method: "PUT",
         data
    });
}
// 删除商品
export function integralGoods_del(id) {
    return request({
        url: `${RESOURCE_BASE_PATH_integralGoods}/${id}`,
        method: "DELETE",
    });
}
//积分记录 integralManage/list
export function integralManage(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_integralManage}/list`,
        method: "GET",
        params:data
    });
}
//manageStudentIntegral 修改积分
export function manageStudentIntegral(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_integralManage}/manageStudentIntegral`,
        method: "POST",
        data
    });
}

//线上报课列表
export function online_order_list(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_onlineOrder}/list`,
        method: "GET",
        params: data
    });
}
//新增线上报课
export function online_order_add(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_onlineOrder}/post`,
        method: "POST",
        data
    });
}
//线上报课详情
export function online_order_get(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_onlineOrder}/get`,
        method: "GET",
        params: data
    });
}
// put 编辑
export function online_order_put(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_onlineOrder}/put`,
        method: "POST",
        data
    });
}

export function orderList(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_order}/orderList`,
        method: "GET",
        params: data
    });
}
export function orderDetail(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_order}/orderDetail`,
        method: "GET",
        params: data
    });
}

//报名 选择列表
// 、、课程
export function orderingCourse(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_order}/orderingCourse`,
        method: "GET",
        params: data
    });
}
// 套餐
export function orderingPackages(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_order}/orderingPackages`,
        method: "GET",
        params: data
    });
}
// 收费项
export function orderingCharges(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_order}/orderingCharges`,
        method: "GET",
        params: data
    });
}

// order/addStudent 报名添加學員
export function addStudent_sign(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_order}/addStudent`,
        method: "POST",
        data
    });
}
// 课程下拉
export function class_list(data) {
    return request({
        url: `${RESOURCE_BASE_PATH}/selectList`,
        method: "GET",
        params: data
    });
}

export function list(data) {
    return request({
        url: `${RESOURCE_BASE_PATH}/lists`,
        method: "GET",
        params: data
    });
}
// 新建课程
export function add(data) {
    return request({
        url: `${RESOURCE_BASE_PATH}`,
        method: "POST",
        data
    });
}

// 编辑课程
export function edit(id, data) {
    return request({
        url: `${RESOURCE_BASE_PATH}/${id}`,
        method: "PUT",
        data
    });
}

// 删除课程
export function del_class(id, data) {
    return request({
        url: `${RESOURCE_BASE_PATH}/${id}`,
        method: "DELETE",
        data
    });
}

export function chargeItem_list(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_chargeItem}/lists`,
        method: "GET",
        params: data
    });
}
// 新建s收费项
export function chargeItem_add(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_chargeItem}`,
        method: "POST",
        data
    });
}

// 编辑收费项
export function chargeItem_edit(id, data) {
    return request({
        url: `${RESOURCE_BASE_PATH_chargeItem}/${id}`,
        method: "PUT",
        data
    });
}

// 删除收费项
export function chargeItem_del(id, data) {
    return request({
        url: `${RESOURCE_BASE_PATH_chargeItem}/${id}`,
        method: "DELETE",
        data
    });
}
//收费套餐列表
export function coursePackage_list(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_coursePackage}/lists`,
        method: "GET",
        params: data
    });
}
// 新建收费套餐
export function coursePackage_add(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_coursePackage}`,
        method: "POST",
        data
    });
}

// 编辑收费套餐
export function coursePackage_edit(id, data) {
    return request({
        url: `${RESOURCE_BASE_PATH_coursePackage}/${id}`,
        method: "PUT",
        data
    });
}

// 删除收费套餐
export function coursePackage_del(id, data) {
    return request({
        url: `${RESOURCE_BASE_PATH_coursePackage}/${id}`,
        method: "DELETE",
        data
    });
}


//收费套餐子课程
export function coursePackage_child(id) {
    return request({
        url: `${RESOURCE_BASE_PATH_coursePackage}/${id}`,
        method: "GET"
    });
}

// selectList教师下拉框
export function teacher_selectList(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_teacher}/selectList`,
        method: "GET",
        params: data
    });
}
//上课记录
export function teacher_list_record(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_teacher}/record`,
        method: "GET",
        params: data
    });
}
//授权班级 
export function teacher_list_class(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_teacher}/class`,
        method: "GET",
        params: data
    });
}

//教师列表
export function teacher_list(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_teacher}/lists`,
        method: "GET",
        params: data
    });
}
//修改密码
export function changePassword(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_teacher}/changePassword`,
        method: "POST",
        data
    });
}
// 新建教师
export function add_teacher(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_teacher}`,
        method: "POST",
        data
    });
}
// 编辑教师
export function edit_teacher(id, data) {
    return request({
        url: `${RESOURCE_BASE_PATH_teacher}/${id}`,
        method: "PUT",
        data
    });
}

// 删除教师
export function del_teacher(id) {
    return request({
        url: `${RESOURCE_BASE_PATH_teacher}/${id}`,
        method: "DELETE"
    });
}
//教师详情
export function teacher_detail(id) {
    return request({
        url: `${RESOURCE_BASE_PATH_teacher}/${id}`,
        method: "GET"
    });
}


//课程下拉 select/lists
export function select_lists(data) {
    return request({
        url: `${RESOURCE_BASE_PATH}/organization/select/lists`,
        method: "GET"
    });
}
//校区下拉 select/lists
export function select_lists_school(data) {
    return request({
        url: `${RESOURCE_BASE_PATH}/campus/select/lists`,
        method: "GET",
        params: data || {}
    });
}

//获取配置信息 organization/getSetting

export function getSetting(data) {
    return request({
        url: `${RESOURCE_BASE_PATH}/organization/getSetting`,
        method: "GET",
        params: data
    });
}

// 配置信息
export function putSetting(data) {
    return request({
        url: `${RESOURCE_BASE_PATH}/organization/putSetting`,
        method: "POST",
        data
    });
}


// 课程配置列表 appendSettingList
export function appendSettingList(data) {
    return request({
        url: `${RESOURCE_BASE_PATH}/organization/appendSettingList`,
        method: "GET",
        params: data
    });
}

//课程详情 
export function o_detail(o_id) {
    return request({
        url: `${RESOURCE_BASE_PATH}/organization/${o_id}`,
        method: "GET"
    });
}

// 编辑课程配置
export function appendSetting(o_id, data) {
    return request({
        url: `${RESOURCE_BASE_PATH}/organization/appendSetting/${o_id}`,
        method: "POST",
        data
    });
}

//校区管理员列表 campus/campusManageList
export function campusManageList(data) {
    return request({
        url: `${RESOURCE_BASE_PATH}/campus/campusManageList`,
        method: "GET",
        params: data
    });
}

// campus/makeBindCampus 绑定校区管理员
export function makeBindCampus(data) {
    return request({
        url: `${RESOURCE_BASE_PATH}/campus/makeBindCampus`,
        method: "POST",
        data
    });
}
// getCampusSelectByUser //用户选择校区
export function getCampusSelectByUser(data) {
    return request({
        url: `${RESOURCE_BASE_PATH}/campus/getCampusSelectByUser`,
        method: "GET",
        params: data
    });
}




//班级列表
export function grade_list(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_courseClass}/lists`,
        method: "GET",
        params: data
    });
}

// 新建班级
export function add_grade(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_courseClass}`,
        method: "POST",
        data
    });
}
// 编辑班级
export function edit_grade(id, data) {
    return request({
        url: `${RESOURCE_BASE_PATH_courseClass}/${id}`,
        method: "PUT",
        data
    });
}

// 删除班级
export function del_grade(id) {
    return request({
        url: `${RESOURCE_BASE_PATH_courseClass}/${id}`,
        method: "DELETE"
    });
}
// shutdown 结业
export function shutdown(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_courseClass}/shutdown`,
        method: "POST",
        data
    });
}
// pause 停课
export function pause(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_courseClass}/pause`,
        method: "POST",
        data
    });
}
//班级详情
export function grade_detail(id) {
    return request({
        url: `${RESOURCE_BASE_PATH_courseClass}/${id}`,
        method: "GET"
    });
}

//班级教师列表
export function grade_teacher_list(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_courseClass}/teacherList`,
        method: "GET",
        params: data
    });
}
// 添加班级老师
export function add_grade_teacher(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_courseClass}/addTeacher`,
        method: "POST",
        data
    });
}
// removeTeacher
export function del_grade_teacher(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_courseClass}/removeTeacher`,
        method: "POST",
        data
    });
}

//班级学生列表
export function studentList(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_courseClass}/studentList`,
        method: "GET",
        params: data
    });
}
// 添加班级学生
export function addStudent(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_courseClass}/addStudent`,
        method: "POST",
        data
    });
}
// removeTeacher 移出班级学生
export function removeStudent(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_courseClass}/removeStudent`,
        method: "POST",
        data
    });
}
//排课时间段

export function arrangeTimes(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_courseClass}/arrangeTimes`,
        method: "GET",
        params: data
    });
}

// 添加
export function addArrange(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_courseClass}/addArrange`,
        method: "POST",
        data
    });
}

//编辑
export function putArrange(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_courseClass}/putArrange`,
        method: "POST",
        data
    });
}
// 删除
export function delArrange(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_courseClass}/delArrange`,
        method: "POST",
        data
    });
}
//日历排课

export function arrangeSignDayList(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_courseClass}/arrangeSignDayList`,
        method: "GET",
        params: data
    });
}

// 删除日历
export function delArrangeSignDay(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_courseClass}/delArrangeSignDay`,
        method: "POST",
        data
    });
}
// 添加日历排课
export function arrangeSignDay(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_courseClass}/arrangeSignDay`,
        method: "POST",
        data
    });
}
// 编辑日历排课
export function putArrangeSignDay(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_courseClass}/putArrangeSignDay`,
        method: "POST",
        data
    });
}
// arrange/period/lists 规则排课
export function period_list(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_courseClass}/arrange/period/lists`,
        method: "GET",
        params: data
    });
}
// 添加规则排课
export function add_period(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_courseClass}/arrange/period/add`,
        method: "POST",
        data
    });
}
// 编辑规则排课
export function put_period(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_courseClass}/arrange/period/put`,
        method: "POST",
        data
    });
}
// 编辑规则排课老师
export function teacher_put(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_courseClass}/arrange/period/teacher/put`,
        method: "POST",
        data
    });
}
// 删除规则排课
export function delete_period(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_courseClass}/arrange/period/delete`,
        method: "POST",
        data
    });
}

//点名记录 arrange/getWeekArrange
export function getWeekArrange(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_courseClass}/arrange/getWeekArrange`,
        method: "GET",
        params: data
    });
}

//弹窗详情arrange/signRecord
export function signRecord(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_courseClass}/arrange/signRecord`,
        method: "GET",
        params: data
    });
}
//点名
export function sign(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_courseClass}/arrange/sign`,
        method: "POST",
        data
    });
}

//编辑点名  putArrangeInfo
export function putArrangeInfo(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_courseClass}/arrange/putArrangeInfo`,
        method: "POST",
        data
    });
}
// delArrangeDate 删除
export function delArrangeDate(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_courseClass}/arrange/delArrangeDate`,
        method: "POST",
        data
    });
}
//调课
export function moveArrangeSignDay(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_courseClass}/arrange/moveArrangeSignDay`,
        method: "POST",
        data
    });
}
// courseClass/selected 班级
export function selected_course(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_courseClass}/selected`,
        method: "GET",
        params: data
    });
}
//学员列表
export function student_list(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_student}/lists`,
        method: "GET",
        params: data
    });
}

// 新建学员
export function add_student(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_student}`,
        method: "POST",
        data
    });
}
// 编辑学员
export function edit_student(id, data) {
    return request({
        url: `${RESOURCE_BASE_PATH_student}/${id}`,
        method: "PUT",
        data
    });
}

// 删除学员
export function del_student(data) {
    return request({
        url: `${BASE}/deleteStudent`,
        method: "POST",
        data
    });
}
//学员详情
export function student_detail(id) {
    return request({
        url: `${RESOURCE_BASE_PATH_student}/${id}`,
        method: "GET"
    });
}
//下拉学员 selected
export function student_selected() {
    return request({
        url: `${RESOURCE_BASE_PATH_student}/selected`,
        method: "GET"
    });
}
//报名
export function signup(data) {
    return request({
        url: `${RESOURCE_BASE_PATH_student}/signup`,
        method: "POST",
        data
    });
}

//消息通知列表 
export function notification(data) {
    return request({
        url: '/campus/notification/lists',
        method: "GET",
        data
    });
}
//删除 /campus/notification/:id
export function delnotification(id) {
    return request({
        url: `/campus/notification/${id}`,
        method: "DELETE",
    });
}
//添加消息通知 /campus/notification
export function getnotification(data) {
    return request({
        url: `/campus/notification`,
        method: "POST",
        data
    });
}
//编辑消息通知 /campus/notification/:id
export function edinotification(id, data) {
    return request({
        url: `/campus/notification/${id}`,
        method: "PUT",
        data
    });
}
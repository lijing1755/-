import request from "@/utils/request";

const RESOURCE_BASE_PATH = "/campus/course";

const RESOURCE_BASE_PATH_chargeItem = "/campus/chargeItem";

const RESOURCE_BASE_PATH_coursePackage = "/campus/coursePackage";

const RESOURCE_BASE_PATH_teacher = "/campus/teacher";
const RESOURCE_BASE_PATH_student = "/campus/student";


const RESOURCE_BASE_PATH_courseClass = "/campus/courseClass";

//报读班级记录 /campus/student/classRecord
export function classRecord(params) {
    return request({
        url: `${RESOURCE_BASE_PATH_student}/classRecord`,
        method: "GET",
        params
    });
}
//上课记录  /campus/student/signUpRecord
export function signUpRecord(params) {
    return request({
        url: `${RESOURCE_BASE_PATH_student}/signUpRecord`,
        method: "GET",
        params
    });
}
//报名记录 /campus/student/orderRecord
export function orderRecord(params) {
    return request({
        url: `${RESOURCE_BASE_PATH_student}/orderRecord`,
        method: "GET",
        params
    });
}
///campus/manage/signRecord
export function signRecord(params) {
    return request({
        url: '/campus/manage/signRecord',
        method: "GET",
        params
    });
}
///campus/manage/leaveRecord
export function leaveRecord(params) {
    return request({
        url: '/campus/manage/leaveRecord',
        method: "GET",
        params
    });
}
//学员列表 /campus/student/listsForSys
export function listsForSys(params) {
    return request({
        url: '/campus/student/listsForSys',
        method: "GET",
        params
    });
}
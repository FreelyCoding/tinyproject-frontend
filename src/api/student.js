import { getRequest, postRequest } from '@/api/request';

const apiRoute = {
    queryAllStudent: '/student/all',
    addClass: '/student/add',
    delClass: '/student/del',
    getStudentProfile: '/student/profile',
    updateStudent: '/student/update',
    queryStudentCourse: '/student/query',
    queryStudentSelectable: '/student/selectable',
};

export async function queryAllStudent(data) {
    return getRequest(apiRoute.queryAllStudent, data);
}

export async function getStudentProfile(data) {
    return getRequest(apiRoute.getStudentProfile, data);
}

export async function queryStudentCourse(data) {
    return getRequest(apiRoute.queryStudentCourse, data);
}

export async function updateStudent(data) {
    return postRequest(apiRoute.updateStudent, data);
}

export async function addClass(data) {
    return postRequest(apiRoute.addClass, data);
}

export async function delClass(data) {
    return postRequest(apiRoute.delClass, data);
}

export async function queryStudentSelectable(data) {
    return getRequest(apiRoute.queryStudentSelectable, data);
}


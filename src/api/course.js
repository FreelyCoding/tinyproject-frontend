import { getRequest, postRequest } from '@/api/request';

const apiRoute = {
    queryAllCourse: '/course/all',
    getCourseProfile: '/course/profile',
    updateCourse: '/course/update',
    queryCourseStudent: '/course/query'
};

export async function queryAllCourse(data) {
    return getRequest(apiRoute.queryAllCourse, data);
}

export async function getCourseProfile(data) {
    return getRequest(apiRoute.getCourseProfile, data);
}

export async function queryCourseStudent(data) {
    return getRequest(apiRoute.queryCourseStudent, data);
}

export async function updateCourse(data) {
    return postRequest(apiRoute.updateCourse, data);
}

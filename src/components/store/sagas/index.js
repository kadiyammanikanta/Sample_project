import { put, takeLatest, all } from 'redux-saga/effects';

const api='http://localhost:8000/';
function* checkLogin(action) {
  const userName= action.value.username;
  const pwd = action.value.password;
  const URL = `${api}login?username=${userName}&password=${pwd}`;
    const json = yield fetch(URL)
      .then(response => response.json());
      if(json.statusCode === 200){
        yield put({ type: "USER_DETAIL_RECEIVED", json: json.data || [{ error: json.message }] });
      }else{

      }
  }
function* getUserList(){
  const URL = `${api}getUserList`;
  const json = yield fetch(URL)
  .then(response => response.json());
  if(json.statusCode === 200){
    yield put({ type: "USER_LIST_RECEIVED", json: json.data || [{ error: json.message }] });
  }else{

  }

}
function* postUser(action){
  const request= {
    name: action.value.name,
    password:action.value.password,
    email:action.value.email,
    role:action.value.role.toString()
  }
  const URL = `${api}saveUser`;
  const postMethod = {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  }
  try{
    const json = yield fetch(URL,postMethod)
    .then(response => response.json());
    if(json.statusCode === 200){
      yield put({ type: "GET_USERLIST" });
    }
  }catch(e){
    console.log('postUser',e)
  }
   

}
function* putUser(action){
  const request= action.value;
  const URL = `${api}updateUser`;
  const putMethod = {
    method: "PUT",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  }
  try{
    const json = yield fetch(URL,putMethod)
    .then(response => response.json());
    if(json.statusCode === 200){
      yield put({ type: "GET_USERLIST" });
    }
  }catch(e){
    console.log('postUser',e)
  }
   
}
function* userDelete(action){
  const id= action.value.id;
  const URL = `${api}deleteUser?userId=${id}`;
  const deleteMethod = {
    method: 'DELETE', // Method itself
    headers: {
     'Content-type': 'application/json; charset=UTF-8' 
    },
   }
  const json = yield fetch(URL,deleteMethod)
  .then(response => response.json());
  if(json.statusCode === 200){
    yield put({ type: "GET_USERLIST" });
  }else{

  }
  

}
function* getRoles(){
  const URL = `${api}getRoleListDropDown`;
  const json = yield fetch(URL)
  .then(response => response.json());
  if(json.statusCode === 200){
    yield put({ type: "ROLES_DROPDOWN_RECEIVED", json: json.data || [{ error: json.message }] });
  }else{

  }
  
}
function* getRoleList(){
  const URL = `${api}getRoleList`;
  const json = yield fetch(URL)
  .then(response => response.json());
  if(json.statusCode === 200){
    yield put({ type: "ROLES_LIST_RECEIVED", json: json.data || [{ error: json.message }] });
  }else{

  }
  
}
function* postRole(action){
  const request= {
    name: action.value.name,
    pageid:action.value.pageid.toString()
  }
  const URL = `${api}saveRole`;
  const postMethod = {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  }
  try{
    const json = yield fetch(URL,postMethod)
    .then(response => response.json());
    if(json.statusCode === 200){
      yield put({ type: "GET_ROLE" });
    }
  }catch(e){
    console.log('postUser',e)
  }
}
function* getPageList(){
  const URL = `${api}getPageList`;
  const json = yield fetch(URL)
  .then(response => response.json());
  if(json.statusCode === 200){
    yield put({ type: "PAGE_LIST_RECEIVED", json: json.data || [{ error: json.message }] });
  }else{

  }

}
function* putRole(action){
  const request= action.value;
  const URL = `${api}updateRole`;
  const putMethod = {
    method: "PUT",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  }
  try{
    const json = yield fetch(URL,putMethod)
    .then(response => response.json());
    if(json.statusCode === 200){
      yield put({ type: "GET_ROLE" });
    }
  }catch(e){
    console.log('postUser',e)
  }
   
}
function* deleteRole(action){
  const id= action.value.id;
  const URL = `${api}deleteRole?roleId=${id}`;
  const deleteMethod = {
    method: 'DELETE', // Method itself
    headers: {
     'Content-type': 'application/json; charset=UTF-8' 
    },
   }
  const json = yield fetch(URL,deleteMethod)
  .then(response => response.json());
  if(json.statusCode === 200){
    yield put({ type: "GET_ROLE" });
  }else{

  }
  
}

  
function* actionWatcher() {
    yield takeLatest('CHECK_USER_LOGIN', checkLogin)
    yield takeLatest('GET_USERLIST',getUserList)
    yield takeLatest('POST_USER',postUser)
    yield takeLatest('DROP_USER',userDelete)
    yield takeLatest('GET_USERLIST',getRoles)
    yield takeLatest('UPDATE_USER',putUser)
    yield takeLatest('GET_ROLE',getRoleList)
    yield takeLatest('GET_ROLE',getPageList)
    yield takeLatest('POST_ROLE',postRole)
    yield takeLatest('PUT_ROLE',putRole)
    yield takeLatest('DELETE_ROLE',deleteRole)
  }
  
  export default function* rootSaga() {
    yield all([
      actionWatcher(),
    ]);
  }
  
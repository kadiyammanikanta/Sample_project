export const checkLogin = (action) => ({
    type: 'CHECK_USER_LOGIN',
    value:action
  });

  export const setRoute = (action) => ({
    type: 'SET_ROUTE',
    value:action
  });
  export const getUsersList = (action) => ({
    type: 'GET_USERLIST',
    value:action
  });
  export const saveUser = (action) => ({
    type: 'POST_USER',
    value:action
  });
  export const dropUser = (action) => ({
    type: 'DROP_USER',
    value:action
  });
  export const updateUser = (action) => ({
    type: 'UPDATE_USER',
    value:action
  });
  export const RoleList = (action) => ({
    type: 'GET_ROLE',
    value:action
  });
  export const saveRole =(action) => ({
    type: 'POST_ROLE',
    value:action
  })
  export const updateRole =(action) =>({
    type: 'PUT_ROLE',
    value:action
  })
  export const delecteRole = (action) => ({
    type: 'DELETE_ROLE',
    value:action
  }) 
  export const logOut = (action) => ({
    type: 'LOGOUT',
    value:action
  })
  export const showAddModal = (action) => ({
    type: 'SHOW_ADD_MODAL',
    value:action
  })
  export const closeAddModal = (action) => ({
    type: 'CLOSE_ADD_MODAL',
    value:action
  })
  export const ShowUpadetModel =(action) =>({
    type: 'USER_UPDATE_MODEL',
    value:action
  })
  export const closeUpdateModal =(action) =>({
    type: 'CLOSE_UPDATE_MODEL',
    value:action
  })
  export const setSession =(action) =>({
    type: 'USER_DETAIL_RECEIVED',
    json:action
  })
  export const setpageName =(action) =>({
    type: 'SET_ROTE_NAME',
    json:action
  })

   
  
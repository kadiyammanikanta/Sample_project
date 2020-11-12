import { initialState } from './initialState';

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHECK_USER_LOGIN':
            return { ...state, loading: true };
        case 'USER_DETAIL_RECEIVED':
            return { ...state, activeUser: action.json, loading: false };
        case 'SET_ROUTE':
            return { ...state, currentScreen: action.value};
        case 'GET_USERLIST':
            return{...state, loading:true};
        case 'USER_LIST_RECEIVED':
            return {...state, userList:action.json, loading:false}; 
        case 'ROLES_DROPDOWN_RECEIVED':
            return {...state, roleList:action.json, loading:false}; 
        case 'POST_USER':
            return {...state, loading:true,visibleAddUserModal:false};
        case 'DROP_USER' :
            return {...state, loading:true}; 
        case 'UPDATE_USER':
            return {...state, loading:true,visibleUpdateUserModal:false}; 
        case 'GET_ROLE' :
            return {...state, loading:true};
        case 'ROLES_LIST_RECEIVED':
            return {...state, roleLists:action.json, loading:false};  
        case 'POST_ROLE':
            return {...state, loading:true,visiableAddRoleModal:true};   
        case 'PAGE_LIST_RECEIVED' :
            return {...state, pageList:action.json, loading:false};
        case 'PUT_ROLE' :
            return {...state, loading:false,visiableUpdateRoleModal:false};    
        case 'DELETE_ROLE':
            return {...state, loading:true};   
        case 'LOGOUT' :
            return {...state,activeUser:''};      
        case 'SHOW_ADD_MODAL':
            return{...state,visibleAddUserModal:true};
        case 'CLOSE_ADD_MODAL':
            return{...state,visibleAddUserModal:false};    
        case 'USER_UPDATE_MODEL':
            return{...state,visibleUpdateUserModal:true};
        case 'CLOSE_UPDATE_MODEL':
            return{...state,visibleUpdateUserModal:false}; 
        case 'SET_ROTE_NAME':       
            return{...state}
        default:
            return state;
    }
};

export default reducer;

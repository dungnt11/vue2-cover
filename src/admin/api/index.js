import request from "../request";

export default {
    login: (data)=> {
        return request.post('api/admin/login',data)
    },

    getUsersList: ()=> {
        return request.get('api/admin/user/list')
    },

    changeUesrAcess: (id, data)=> {
        return request.put('api/admin/user/access/' + id, data)
    },

    createLink(data){
        return request.post('api/link/create', data)
    },

    updateLink(id, data){
        return request.put('api/link/' + id, data)
    },

    deleteLink(id){
        return request.delete('api/link/' + id)
    },

    getLinksList(){
        return request.get('api/link/lists')
    },

    //
    createComment(data){
        return request.post('api/comment/create', data)
    },

    updateComment(id, data){
        return request.put('api/comment/' + id, data)
    },

    deleteCommemt(id){
        return request.delete('api/comment/' + id)
    },

    getCommentsList(){
        return request.get('api/comment/lists')
    },

    //user
    createFakeUser(data){
        return request.post('api/fake-users/create', data)
    },

    deleteFakeUser(id){
        return request.delete('api/fake-users/' + id)
    },

    getFakeUsersList(){
        return request.get('api/fake-users/lists')
    },


    //chat

    createChat(data){
        return request.post('api/fake-chat/create', data)
    },

    deleteChat(id){
        return request.delete('api/fake-chat/' + id)
    },

    getChatList(){
        return request.get('api/fake-chat/lists')
    },

    getChatConfig(){
        return request.get('api/fake-chat/config')
    },

    setChatConfig(data){
        return request.post('api/fake-chat/config', data)
    },
}

import {fetchUsers} from "@/utils/admin.util.js";

export const adminModule = {
    state: {
        usersData: []
    },
    getters: {
        dataManip: state => {
            return state.usersData.map(u => ({ ...u, containers: u.containers.length}))
        }
    },
    mutations: {
        commitUsers(state, payload){
            state.usersData = payload.users;
        }
    },
    actions: {
        async populateUsers({ commit }) {
            const users = await fetchUsers();
            commit({
                type: 'commitUsers',
                users: users
            })
        }
    }
}

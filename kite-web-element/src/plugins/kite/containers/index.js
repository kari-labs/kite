import Vue from 'vue'
import Containers from './containers'

Vue.use(Containers, {
    api_url: 'https://localhost:8080/'
})

export default new Containers()
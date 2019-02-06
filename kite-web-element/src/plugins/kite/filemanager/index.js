import Vue from 'vue'
import FileManager from './filemanager'

Vue.use(FileManager, {
    api_url: 'https://localhost:8080/'
})

export default new FileManager()
import axios from 'axios'

export default axios.create({
  baseURL: 'https://react-quiz-2bdb3-default-rtdb.firebaseio.com/'
})
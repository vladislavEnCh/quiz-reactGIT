import React, {Component} from 'react'
import classes from './QuizList.css'
import {NavLink} from 'react-router-dom'
import Loader from '../../components/UI/Loader/Loader'
import axios from '../../axios/axios-quiz'
import { connect } from 'react-redux'

 class QuizList extends Component {

  state = {
    quizes: [],
    loading: true
  }

  renderQuizes() {
    return this.state.quizes.map(quiz => {
      return (
        <li
          key={quiz.id}
        >
          <NavLink to={'/quiz/' + quiz.id}>
            {quiz.name}
          </NavLink>
        </li>
      )
    })
  }

  async componentDidMount() {
    try {
      const response = await axios.get('/quizes.json')

      const quizes = []

      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Тест №${index + 1}`
        })
      })

      this.setState({
        quizes, loading: false
      })
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Quiz List</h1>

          {
            this.state.loading
              ? <Loader />
              : <ul className={classes.compList}>
                  { this.renderQuizes() }
                </ul>
          }

        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{

    quizes: state.quiz.quizes,
    loading: state.quiz.loading
  }
}

function mapDispatchToProps(dispatch){
  return{
    
  }
}
export default connect()(QuizList)
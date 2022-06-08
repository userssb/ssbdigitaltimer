// Write your code here
import {Component} from 'react'

import './index.css'

const initialState = {
  isTimerRunning: false,
  timerLimitInMinutes: 25,
  timerElapsedInSeconds: 0,
}

class DigitalTimer extends Component {
  state = initialState

  getElapsedSecondsInTimeFormat = () => {
    const {
      timerElapsedInSeconds,
      timerLimitInMinutes,
      isTimerRunning,
    } = this.state
    const totalRemainingSeconds =
      timerLimitInMinutes * 60 - timerElapsedInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMins = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSecs = seconds > 9 ? seconds : `0${seconds}`
    return `${stringifiedMins}:${stringifiedSecs}`
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  incrementTimeElapsedInSeconds = () => {
    const {timerLimitInMinutes, timerElapsedInSeconds} = this.state
    const isTimerCompleted = timerElapsedInSeconds === timerLimitInMinutes * 60
    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timerElapsedInSeconds: prevState.timerElapsedInSeconds + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {
      isTimerRunning,
      timerLimitInMinutes,
      timerElapsedInSeconds,
    } = this.state
    const isTimerCompleted = timerElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timerElapsedInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  onDecreaseTimerLimitInMinutes = () => {
    const {timerLimitInMinutes} = this.state

    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  onIncreaseTimerLimitInMinutes = () =>
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))

  render() {
    const {
      isTimerRunning,
      timerLimitInMinutes,
      timerElapsedInSeconds,
    } = this.state

    const playPauseIconUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const playPauseIconAltText = isTimerRunning ? 'pause icon' : 'play icon'
    const isButtonDisabled = timerElapsedInSeconds > 0

    return (
      <div className="bg-cont">
        <div className="app-cont">
          <h1>Digital Timer</h1>
          <div className="main-cont">
            <div className="img-cont">
              <div className="time-elapsed-cont">
                <h1 className="timer">
                  {this.getElapsedSecondsInTimeFormat()}
                </h1>
                <p className="txt-pause-run">
                  {isTimerRunning ? 'Running' : 'Paused'}
                </p>
              </div>
            </div>
            <div className="controls-cont">
              <div className="icons-cont">
                <div className="play-pause-cont">
                  <button
                    className="btn-icon"
                    onClick={this.onStartOrPauseTimer}
                  >
                    <img
                      src={playPauseIconUrl}
                      alt={playPauseIconAltText}
                      className="icon"
                    />
                  </button>
                  <p className="start-pause-text">
                    {isTimerRunning ? 'Pause' : 'Start'}
                  </p>
                </div>
                <div className="reset-cont">
                  <button className="btn-icon" onClick={this.onResetTimer}>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                      alt="reset icon"
                      className="icon"
                    />
                  </button>
                  <p className="reset-text">Reset</p>
                </div>
              </div>
              <div className="text-cont">
                <p>Set Timer Limit</p>
              </div>
              <div className="buttons-cont">
                <button
                  className="btn-pm"
                  disabled={isButtonDisabled}
                  onClick={this.onDecreaseTimerLimitInMinutes}
                  type="button"
                >
                  -
                </button>
                <p className="inc-dec-text">{timerLimitInMinutes}</p>
                <button
                  className="btn-pm"
                  disabled={isButtonDisabled}
                  onClick={this.onIncreaseTimerLimitInMinutes}
                  type="button"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer

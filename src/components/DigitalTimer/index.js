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
                  <button className="btn-icon" type="button">
                    <img
                      src={playPauseIconUrl}
                      alt={playPauseIconAltText}
                      className="icon"
                    />
                    <p className="start-pause-text">
                      {isTimerRunning ? 'Pause' : 'Start'}
                    </p>
                  </button>
                </div>
                <div className="reset-cont">
                  <button className="btn-icon" type="button">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                      alt="reset icon"
                      className="icon"
                    />
                    <p className="reset-text">Reset</p>
                  </button>
                </div>
              </div>
              <div className="text-cont">
                <p>Set Timer Limit</p>
              </div>
              <div className="buttons-cont">
                <button className="btn-pm">-</button>
                <p className="inc-dec-text">{timerLimitInMinutes}</p>
                <button className="btn-pm">+</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer

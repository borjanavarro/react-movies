import React, { Component } from 'react'
import { Slider, Rail, Handles, Tracks } from 'react-compound-slider'
import { SliderRail, KeyboardHandle, Track } from './components' // example render components - source below

const sliderStyle = {
  position: 'relative',
  width: '100%',
}

const today = new Date();

const domain = [today.getFullYear() - 100, today.getFullYear()]

class RangeSlider extends Component {
  // state = {
  //   values: defaultValues.slice(),
  //   update: defaultValues.slice(),
  // }

  // onUpdate = update => {
  //   this.setState({ update })
  // }

  // onChange = values => {
  //   this.setState({ values });
  // }

  render() {
    // const {
    //   state: { values, update },
    // } = this

    return (
      <div style={{ height: 20, width: '100%' }}>
        {/* <ValueViewer values={values} update={update} /> */}
        <Slider
          mode={3}
          step={1}
          domain={domain}
          rootStyle={sliderStyle}
          onUpdate={this.onUpdate}
          // onChange={this.onChange}
          onChange={ values => this.props.onChangeCallback(values) }
          values={[this.props.minYear, this.props.maxYear]}
        >
          <Rail>
            {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
          </Rail>
          <Handles>
            {({ handles, getHandleProps }) => (
              <div className="slider-handles">
                {handles.map(handle => (
                  <KeyboardHandle
                    key={handle.id}
                    handle={handle}
                    domain={domain}
                    getHandleProps={getHandleProps}
                  />
                ))}
              </div>
            )}
          </Handles>
          <Tracks left={false} right={false}>
            {({ tracks, getTrackProps }) => (
              <div className="slider-tracks">
                {tracks.map(({ id, source, target }) => (
                  <Track
                    key={id}
                    source={source}
                    target={target}
                    getTrackProps={getTrackProps}
                  />
                ))}
              </div>
            )}
          </Tracks>
          {/* <Ticks count={10}>
            {({ ticks }) => (
              <div className="slider-ticks">
                {ticks.map(tick => (
                  <Tick key={tick.id} tick={tick} count={ticks.length} />
                ))}
              </div>
            )}
          </Ticks> */}
        </Slider>
      </div>
    )
  }
}

export default RangeSlider;
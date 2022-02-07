const Settings = (props) => {
    return (
        <div>
            <h2>{props.label}</h2>
            <div>
                <input name="slider" type="range" min="0" max="60" value={props.value} id="slider" onChange={(e) => props.handleSliderChange(e)} />
                <label htmlFor="slider">{props.value} minutes</label>
            </div>
            <div onChange={(e) => props.handleTransportChange(e)}>
                <input type="radio" name="transport" id="cycle" value="cycling"/>
                <label htmlFor="cycle">Cycle</label>
                <input type="radio" name="transport" id="walk" value="walking"/>
                <label htmlFor="walk">Walk</label>
            </div>
        </div>
    )
}

export default Settings;
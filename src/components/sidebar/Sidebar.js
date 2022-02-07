import Settings from './Settings';

const Sidebar = (props) => {
    return (
        <div id="sidebar">
            <h1>Settings</h1>
            <Settings 
                label="Uni"
                handleSliderChange={(e) => props.handleUniMinutesChange(e)} 
                value={props.uniMinutes} 
                handleTransportChange={(e) => props.handleUniTransportChange(e)}
            />
        </div>
    )
}

export default Sidebar;
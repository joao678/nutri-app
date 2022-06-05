import './TabPanel.css';

const TabPanel = function ({ children, name, setActiveTab, className, hidden }) {
    const tabs = children.filter((child) => child.type.name !== 'TabPanelButton'),
        tabButtons = children.filter((child) => child.type.name === 'TabPanelButton').map((child, index) => {
            return (
                <div key={index} onChange={(e) => setActiveTab(index)}>
                    <input type="radio" value={index} id={`${name}_${index}`} autoComplete="off" defaultChecked={child.props.active} name={name}></input>
                    <label htmlFor={`${name}_${index}`}>{child.props.children}</label>
                </div>
            )
        });

    return (
        <div className={`tabpanel-container ${className}`} hidden={hidden}>
            <div className="tabpanel-buttons-container">{tabButtons}</div>
            <div className="tabpanel-tabs">{tabs}</div>
        </div>
    );
};

export default TabPanel;
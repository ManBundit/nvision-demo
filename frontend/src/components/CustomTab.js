import styles from 'styles/components/custom-tab.module.scss'
import PropTypes from 'prop-types';

export default function CustomTab({ tabs, activeTab, onTabChange }) {
  const handleTabChange = (value) => {
    onTabChange(value)
  }
  return (
    <div className={styles.tabs}>
      {tabs.map((tab) => 
        <div 
          key={tab.name}
          className={`${styles.item} ${activeTab === tab.value && styles.active}`}
          onClick={() => handleTabChange(tab.value)}
        >
          {tab.name}
        </div>
      )}      
    </div>
  )
}

CustomTab.propType = {
  tabs: PropTypes.array,
  activeTab: PropTypes.string || PropTypes.number,
  onTabChange: PropTypes.func
}

CustomTab.defaultProps = {
  tabs: [
    {
      name: 'tab1',
      value: 1,
    },
    {
      name: 'tab2',
      value: 2,
    }
  ],
  activeTab: 1,
  onTabChange: (value) => {console.log(value)},
}
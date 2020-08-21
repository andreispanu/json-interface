import React, { useContext, useState } from 'react';
import { DashboardContext } from '../context/Context';
import PropTypes from 'prop-types';
// Date Fns
import { format } from 'date-fns';
// Material UI elements
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
// Icons
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MessageIcon from '@material-ui/icons/Message';
import SearchIcon from '@material-ui/icons/Search';
import BugReportIcon from '@material-ui/icons/BugReport';
import BuildIcon from '@material-ui/icons/Build';
import DevicesIcon from '@material-ui/icons/Devices';
import SecurityIcon from '@material-ui/icons/Security';
import WarningIcon from '@material-ui/icons/Warning';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  paper: {
    padding: theme.spacing(4),
  },
  header: {
    backgroundColor: theme.palette.grey[300],
    color: theme.palette.common.black,
    marginTop: theme.spacing(4)
  },
  headerItem: {
    display: 'flex',
    flexDirection: 'row',
    padding: theme.spacing(1),
    alignItems: 'center'
  },
  headerIcon: {
    padding: theme.spacing(1),
    color: theme.palette.primary.main
  },
  headerTitle: {
    textTransform: 'uppercase'
  },
  divider: {
    height: theme.spacing(5),
    backgroundColor: theme.palette.grey[100]
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  scanners: {
    backgroundColor: theme.palette.grey[100],
  },
  item: {
    backgroundColor: theme.palette.grey[100],
    padding: `${theme.spacing()}px ${theme.spacing(2)}px `
  },
  vulnerabilitiesItem: {
    backgroundColor: theme.palette.grey[100]
  },
  high: {
    color: theme.palette.error.dark,
    paddingLeft: theme.spacing(1)
  },
  medium: {
    color: theme.palette.warning.dark,
    paddingLeft: theme.spacing(1)
  },
  low: {
    color: theme.palette.success.dark,
    paddingLeft: theme.spacing(1)
  },
  info: {
    color: theme.palette.info.dark,
    paddingLeft: theme.spacing(1)
  },
  fontWeightBold: {
    fontWeight: theme.typography.fontWeightBold
  }
}));

// Generate Id for keys
function generateId() {
  return Math.floor((Math.random() * 1000000000) + 1);
}

function TabPanel(props) {
  const { children, value, index, } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      key={generateId()}
    >
      {value === index && (
        <React.Fragment key={generateId()}>{children}</React.Fragment>
      )}
    </div>
  );
}

const Dashboard = () => {
  const classes = useStyles();
  const data = useContext(DashboardContext);
  const infoIcons = {
    highRiskIcon: <WarningIcon />,
    mediumRiskIcon: <WarningIcon />,
    lowRiskIcon: <WarningIcon />,
    infoRiskIcon: <InfoIcon />
  }
  const breakers = ['description', 'solution', 'references'];

  const [showId, setShowId] = useState(false);

  const toggle = () => {
    setShowId(!showId)
  }

  // Tabs
  const [value, setValue] = React.useState(1);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Capitalise and add space to strings
  function capitalizeFirstLetter(string) {
    return (string.charAt(0).toUpperCase() + string.slice(1)).replace(/([A-Z])/g, ' $1').trim();
  }

  // Generate a list item with a custom icon and custom header
  function listItemsGenerator(itemName, itemIcon) {
    return (
      <div className={classes.header} key={generateId()} >
        <div className={classes.headerItem}>
          <span className={classes.headerIcon}>{itemIcon}</span>
          <div className={classes.headerTitle}>{itemName}</div>
        </div>
      </div>
    )
  }

  function displayVulnerabilityIcon(risk) {

    // Example use of Destructuring
    const { highRiskIcon } = infoIcons;
    const { mediumRiskIcon } = infoIcons;
    const { lowRiskIcon } = infoIcons;
    const { infoRiskIcon } = infoIcons;

    switch (risk) {
      case 'high':
        return <span className={classes.high}>{highRiskIcon}</span>
      case 'medium':
        return <span className={classes.medium}>{mediumRiskIcon}</span>
      case 'low':
        return <span className={classes.low}>{lowRiskIcon}</span>
      case 'information':
        return <span className={classes.info}>{infoRiskIcon}</span>
      default:
        return null
    }
  }


  // User Information Data Loop
  const userDataLoop = () => {
    if (data.user !== undefined) {

      let source = data.user;
      let personalDetails = [listItemsGenerator('User Details', <AccountCircleIcon />)];
      let notifications = [listItemsGenerator('Notifications', <MessageIcon />)];

      for (const [key, value] of Object.entries(source)) {
        if (key === 'notifications') {

          Object.values(source.notifications).map(i => {
            for (const [key, value] of Object.entries(i)) {
              if (key === 'read') {
                notifications.push(
                  <div className={classes.messageItem} key={generateId()}>
                    <div className={classes.item}><span className={classes.fontWeightBold}>{capitalizeFirstLetter(key)}</span>: {value.toString()}</div>
                  </div>
                )
              } else if (key === 'id') {
                showId && (
                  notifications.push(
                    <div className={classes.messageItem} key={generateId()}>
                      <div className={classes.item} ><span className={classes.fontWeightBold}>{capitalizeFirstLetter(key)}</span>: {value.toString()}</div>
                    </div>
                  )
                )
              } else if (key === 'date') {
                notifications.push(
                  <div className={classes.dateItem} key={generateId()}>
                    <div className={classes.item}><span className={classes.fontWeightBold}>{capitalizeFirstLetter(key)}</span>: {format(new Date(value), 'MM/dd/yyyy')}</div>
                  </div>
                )
                notifications.push(<Divider className={classes.divider} key={generateId()} />)
              } else {
                notifications.push(
                  <div className={classes.dateItem} key={generateId()}>
                    <div className={classes.item}><span className={classes.fontWeightBold}>{capitalizeFirstLetter(key)}</span>: {value}</div>
                  </div>
                )
              }
            }
          })
        } else {
          personalDetails.push(
            <div className={classes.personalDetailsItem} key={generateId()}>
              <div className={classes.item}><span className={classes.fontWeightBold}>{capitalizeFirstLetter(key)}</span>: {value}</div>
            </div>
          )
        }
      }
      return [personalDetails, notifications];
    }
  }

  // Scan Data Loop
  const resultsLoop = () => {
    if (data.scan !== undefined) {
      let source = data.scan;
      let scanOverview = [listItemsGenerator('Scan Overview', <SearchIcon />)];
      let scanners = [listItemsGenerator('Used Scanners', <BuildIcon />)];
      let severityCounts = [listItemsGenerator('Severity of Items', <BugReportIcon />)];
      let assets = [listItemsGenerator('Assets', <DevicesIcon />)];
      let vulnerabilities = [listItemsGenerator('Vulnerabilities', <SecurityIcon />)];

      for (const [key, value] of Object.entries(source)) {
        // Example of use for Switch
        switch (key) {
          case 'scanners':
            value.map(scanner => {
              return scanners.push(
                <div className={classes.scannersItem} key={generateId()}>
                  <div className={classes.item}><span className={classes.fontWeightBold}>{scanner}</span></div>
                </div>
              )
            })
            break;
          case 'severityCounts':
            for (const [item, val] of Object.entries(value)) {
              severityCounts.push(
                <div className={classes.severityItem} key={generateId()}>
                  <div className={classes.item}><span className={classes.fontWeightBold}>{capitalizeFirstLetter(item)}</span>: {val}</div>
                </div>
              )
            }
            break;
          case 'assets':
            value.map(asset => {
              for (const [key, value] of Object.entries(asset)) {
                if (key === 'created') {
                  assets.push(
                    <div className={classes.assetsItem} key={generateId()}>
                      <div className={classes.item}><span className={classes.fontWeightBold}>{capitalizeFirstLetter(key)}</span>: {format(new Date(value), 'MM/dd/yyyy')}</div>
                    </div>
                  )
                } else if (key === 'id') {
                  showId && (
                    assets.push(
                      <div className={classes.assetsItem} key={generateId()}>
                        <div className={classes.item}><span className={classes.fontWeightBold}>{capitalizeFirstLetter(key)}</span>: {format(new Date(value), 'MM/dd/yyyy')}</div>
                      </div>
                    )
                  )
                } else {
                  assets.push(
                    <div className={classes.assetsItem} key={generateId()}>
                      <div className={classes.item}><span className={classes.fontWeightBold}>{capitalizeFirstLetter(key)}</span>: {value}</div>
                    </div>
                  )
                }

              }
              assets.push(<Divider className={classes.divider} key={generateId()} />)
            })
            break;
          case 'vulnerabilities':
            value.map(asset => {
              for (const [key, value] of Object.entries(asset)) {
                if (key === 'affectedAssets') {
                  value.map(affectedAssets => {
                    return (
                      vulnerabilities.push(
                        <div className={classes.vulnerabilitiesItem} key={generateId()}>
                          <div className={classes.item}><span className={classes.fontWeightBold}>Affected Asset</span>: {affectedAssets}</div>
                        </div>
                      )
                    )
                  })
                  vulnerabilities.push(<div className={classes.divider} key={generateId()} />)
                } else if (key === 'id') {
                  showId && (
                    vulnerabilities.push(
                      <div className={classes.vulnerabilitiesItem} key={generateId()}>
                        <div className={classes.item}><span className={classes.fontWeightBold}>{capitalizeFirstLetter(key)}</span>: {value}</div>
                      </div>
                    )
                  )
                } else {
                  vulnerabilities.push(
                    <div className={classes.vulnerabilitiesItem} key={generateId()}>
                      <div className={classes.item} >
                        <span className={classes.fontWeightBold}>{capitalizeFirstLetter(key)}</span>:
                        {/* Example use of includes */}
                        {breakers.includes(key) && <br />}  {value} {displayVulnerabilityIcon(value)}
                      </div>
                    </div>
                  )
                }
              }
            })
            break;
          default:
            // Usage example for ternary and pipe opperator with Date FNS
            (key === 'dateStarted' || key === 'datCompleted') ?
              scanOverview.push(
                <div className={classes.scanOverviewItem} key={generateId()}>
                  <div className={classes.item} ><span className={classes.fontWeightBold}>{capitalizeFirstLetter(key)}</span>: {format(new Date(value), 'MM/dd/yyyy')}</div>
                </div>
              )
              :
              scanOverview.push(
                <div className={classes.scanOverviewItem} key={generateId()}>
                  <div className={classes.item}><span className={classes.fontWeightBold}>{capitalizeFirstLetter(key)}</span>: {value}</div>
                </div>
              )
        }
      }
      return [scanOverview, scanners, severityCounts, assets, vulnerabilities]
    }
  }

  return (
    <div className="dashboard-container">
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>

          <div className={classes.leftContainer}>
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs">
              <Tab label="User Data" />
              <Tab label="Scan Data" />
            </Tabs>
          </div>
          <div className={classes.rightContainer}>
            <FormControlLabel
              control={
                <Switch
                  checked={showId}
                  onChange={toggle}
                  name="ShowId"
                />
              }
              label="Display Ids"
            />
          </div>
        </AppBar>
        <TabPanel value={value} index={0}>
          <Paper className={classes.paper}>
            {userDataLoop()}
          </Paper>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Paper className={classes.paper}>
            {resultsLoop()}
          </Paper>
        </TabPanel>
      </div>
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};



export default Dashboard;



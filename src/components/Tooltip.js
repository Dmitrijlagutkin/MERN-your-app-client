import Tooltip from '@material-ui/core/Tooltip';


const SimpleTooltips = ({children, title, placement, arrow=false}) => {

  return (
    <div>
      <Tooltip title={title} 
        placement={placement} 
        arrow={arrow}>
          {children}
      </Tooltip>
    </div>
  );
}

export default SimpleTooltips
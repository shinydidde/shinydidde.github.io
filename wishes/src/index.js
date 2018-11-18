import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import sizeMe from 'react-sizeme';
import Confetti from 'react-confetti';
import './index.css';
import '../node_modules/materialize-css/dist/css/materialize.min.css';
import '../node_modules/materialize-css/dist/js/materialize.min.js';
import './App.css';
import LandingPage from './components/landing_page';
import registerServiceWorker from './registerServiceWorker';

const DimensionedExample = sizeMe({
    monitorHeight: true,
    monitorWidth: true,
  })(class Example extends React.PureComponent {
    static propTypes = {
      size: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number,
        numberOfPieces: 800
      }),
    }
    render() {
      return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          <Confetti {...this.props.size} />
          <LandingPage/>
        </div>
      )
    }
  })

ReactDOM.render(<DimensionedExample />, document.getElementById('root'));
registerServiceWorker(); 

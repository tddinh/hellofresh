import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import Spinner from '../../utilities/spinner/Spinner';
import classnames from 'classnames';
import './Modal.scss';

export default class CustomModal extends Component {
  componentWillMount() {
    document.querySelector('body').setAttribute('style', 'overflow: hidden');
    Modal.setAppElement('#root');
  }

  componentWillUnmount() {
    document.querySelector('body').setAttribute('style', 'overflow: auto');
  }

  render() {
    const {
      opened,
      contentStyle
    } = this.props;

    const headerClass = classnames("modal-header", { 'modal-header--hidden': !this.props.title && !this.props.showHeader });

    const footerClass = classnames("modal-footer", { 'modal-footer--hidden': !this.props.showFooter && !this.props.onRequestSave && !this.props.onRequestClose });

    const saveButtonClass = classnames('button', 'button-neutral', {
      'modal-footer--hidden': !this.props.onRequestSave
    });

    const closeButtonClass = classnames('button', 'button-neutral', {
      'modal-footer--hidden': !this.props.onRequestClose
    });

    return (
      <Modal
        closeOnEsc={true}
        isOpen={opened}
        overlayClassName="backdrop"
        className="modal modal-medium fade-in-open modal-backdrop--open"
      >
          <section className="modal-container">
            <header className={headerClass}>
              <h3 className="">{this.props.title}</h3>
            </header>
            <div className="modal-content" style={contentStyle}>
              {this.props.children}
            </div>
            <footer className={footerClass}>
              <button className={closeButtonClass} type="button" onClick={this.props.onRequestClose}>Close</button>
              <button className={saveButtonClass} type="button" onClick={this.props.onRequestSave}>Save</button>
            </footer>
          </section>
      </Modal>
    );
  }

}

CustomModal.defaultPropTypes = {
  opened: false,
  contentStyle: {},
  containerStyle: {},
  footerStyle: {}
};

CustomModal.propTypes = {
  children: PropTypes.object.isRequired,
  opened: PropTypes.bool,
  contentStyle: PropTypes.object,
  containerStyle: PropTypes.object,
  footerStyle: PropTypes.object,
  onRequestClose: PropTypes.func,
  onRequestSave: PropTypes.func,
  title: PropTypes.string,
  showHeader: PropTypes.bool,
  showFooter: PropTypes.bool
};

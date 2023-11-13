import styles from './index.module.scss';
import PropTypes from 'prop-types';

export const ConfirmationModal = ({ text, confirm, cancel, onConfirm, onCancel }) => {

    return (
        <div className={styles.backdrop}>
          <div className={styles.mymodal}>
            <h3>{text}</h3>
            <div className={styles.btns}>
              <button className={`btn ${styles.cancel}`} onClick={onCancel}>
                {cancel}
              </button>
              <button className={`btn ${styles.confirm}`} onClick={onConfirm}>
                {confirm}
              </button>
            </div>
          </div>
        </div>
      );
}


ConfirmationModal.propTypes = {
    text: PropTypes.text,
    confirm: PropTypes.text,
    cancel: PropTypes.text,
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func
}
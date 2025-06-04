import styles from './AddedButton.module.scss';

interface AddedButtonProps {
  title: string,
  className: 'string'
}

function AddedButton({title, className}: AddedButtonProps ) {
  return (
    <button
      className={styles[`added-button ${className? className: ''}`]}
    >
      {title}
    </button>
  );
}

export default AddedButton;

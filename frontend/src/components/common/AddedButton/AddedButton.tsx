import styles from './AddedButton.module.scss';

interface AddedButtonProps {
  title: string;
}

function AddedButton({title}: AddedButtonProps ) {
  return (
    <button
      className={styles['added-button']}
    >
      {title}
    </button>
  );
}

export default AddedButton;

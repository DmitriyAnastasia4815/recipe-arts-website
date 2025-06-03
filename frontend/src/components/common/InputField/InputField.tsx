import styles from './InputField.module.scss';

interface InputFieldProps {
  title: string;
}

function inputField({ title }: InputFieldProps) {
  return (
    <>
      <input type="text" placeholder={title} className={styles.root} />
    </>
  );
}

export default inputField;

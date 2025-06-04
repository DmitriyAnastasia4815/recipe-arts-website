import styles from "./TransparentButton.module.scss"

interface TransparentButtonProps{
    title: string
}

function TransparentButton({title} : TransparentButtonProps) {
    return (
        <button className={styles.root}>{title}</button>
    )
}

export default TransparentButton;
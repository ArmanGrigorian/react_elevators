import styles from "./buttons.module.scss";


const Buttons = ({ elevators, handleCall }: ButtonsProps) => {
	return (
		<div className={styles.buttons}>
			{Array(20)
				.fill(null)
				.map((_, idx) => (
					<button
						key={idx}
						className={styles.button}
						type="button"
						onClick={() => handleCall(idx + 1, elevators.a, elevators.b, elevators.c)}>
						{idx + 1}
					</button>
				))}
		</div>
	);
};

export default Buttons;

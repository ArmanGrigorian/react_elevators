import { motion } from "framer-motion";
import styles from "./elevatorBank.module.scss";

const ElevatorBank = ({ gate, handleIsInUse }: ElevatorBankProps) => {
	return (
		<div className={styles.levels}>
			{gate?.data.map((level) => (
				<div key={level.id} className={styles.level}>
					{level.isActive && (
						<motion.div
							style={level.isInUse ? { backgroundColor: "yellow", color: "black" } : { backgroundColor: "green", color: "white" }}
							onLayoutAnimationComplete={() => handleIsInUse(gate.name, level.id)}
							transition={{ duration: 1, ease: "easeInOut" }}
							layoutId={gate.name}
							className={styles.active}>
							{level.id}
						</motion.div>
					)}
				</div>
			))}
		</div>
	);
};

export default ElevatorBank;

import { useState } from "react";
import { levelsData } from "../../_DATA";
import { findClosest, setActiveLevel } from "../../utils";
import Buttons from "../buttons/Buttons";
import ElevatorBank from "../elevatorBank/ElevatorBank";
import styles from "./building.module.scss";

const INITIAL_LEVELS = {
	a: setActiveLevel(levelsData, 1, "a"),
	b: setActiveLevel(levelsData, 10, "b"),
	c: setActiveLevel(levelsData, 20, "c"),
};

const Building = () => {
	const [elevators, setElevators] = useState<Record<string, LevelsDataType>>(INITIAL_LEVELS);

	const mySetter: MySetterType = {
		a: (update) => setElevators((prev) => ({ ...prev, a: update(prev.a) })),
		b: (update) => setElevators((prev) => ({ ...prev, b: update(prev.b) })),
		c: (update) => setElevators((prev) => ({ ...prev, c: update(prev.c) })),
	};

	function handleCall(level: number, ...gates: LevelsDataType[]) {
		const closest = findClosest(level, ...gates);

		if (!closest) {
			console.warn("No closest gate found");
			return;
		}
		const { gate, id } = closest;

		if (id === level) {
			console.log(`Elevator ${gate} is already at level ${level}`);
			return;
		}

		mySetter[closest.gate]((prevGates) => ({
			...prevGates,
			data: prevGates.data.map((gate) => ({
				...gate,
				isActive: gate.id === level,
				isInUse: gate.id === level,
			})),
		}));
	}

	function handleIsInUse(name: string, id: number) {
		mySetter[name]((prevGates) => ({
			...prevGates,
			data: prevGates.data.map((gate) => ({
				...gate,
				isInUse: gate.id === id ? false : gate.isInUse,
			})),
		}));
	}

	return (
		<div className={styles.building}>
			{Object.keys(elevators).map((key) => (
				<ElevatorBank key={key} gate={elevators[key]} handleIsInUse={handleIsInUse} />
			))}
			<Buttons elevators={elevators} handleCall={handleCall} />
		</div>
	);
};

export default Building;

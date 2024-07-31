import { useState } from "react";
import { levelsData } from "../../_DATA";
import { setActiveLevel } from "../../utils";
import Buttons from "../buttons/Buttons";
import ElevatorBank from "../elevatorBank/ElevatorBank";
import styles from "./building.module.scss";

const Building = () => {
	const [elevators, setElevators] = useState<Record<string, LevelsDataType>>({
		a: setActiveLevel(levelsData, 1, "a"),
		b: setActiveLevel(levelsData, 10, "b"),
		c: setActiveLevel(levelsData, 20, "c"),
	});

	const mySetter: MySetterType = {
		a: (update) => setElevators((prev) => ({ ...prev, a: update(prev.a) })),
		b: (update) => setElevators((prev) => ({ ...prev, b: update(prev.b) })),
		c: (update) => setElevators((prev) => ({ ...prev, c: update(prev.c) })),
	};

	function findClosest(level: number, ...gates: LevelsDataType[]): ElevatorType | undefined {
		const result = gates
			.flatMap((gate) =>
				gate.data
					.filter((val) => val.isActive && !val.isInUse)
					.map((val) => ({
						id: val.id,
						distance: Math.abs(level - val.id),
						gate: gate.name,
					})),
			)
			.sort((a, b) => a.distance - b.distance)[0];

		return result;
	}

	function handleCall(level: number, ...gates: LevelsDataType[]) {
		const closest = findClosest(level, ...gates);

		if (!closest) {
			console.error("No closest elevator found");
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
			<ElevatorBank gate={elevators.a} handleIsInUse={handleIsInUse} />
			<ElevatorBank gate={elevators.b} handleIsInUse={handleIsInUse} />
			<ElevatorBank gate={elevators.c} handleIsInUse={handleIsInUse} />
			<Buttons elevators={elevators} handleCall={handleCall} />
		</div>
	);
};

export default Building;

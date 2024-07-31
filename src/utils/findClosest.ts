export function findClosest(level: number, ...gates: LevelsDataType[]): ElevatorType | undefined {
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

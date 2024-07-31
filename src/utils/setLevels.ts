export function setActiveLevel(
	levels: LevelsDataType,
	id: number,
	identifier: string,
): LevelsDataType {
	return {
		name: identifier,
		data: levels.data.map((level) => (level.id === id ? { ...level, isActive: true } : level)),
	};
}

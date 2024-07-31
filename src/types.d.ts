type LevelType = {
	id: number;
	isActive: boolean;
	isInUse: boolean;
};

type LevelsType = LevelType[];

type LevelsDataType = {
	name: string;
	data: LevelsType;
};

type MySetterType = {
	[key: string]: (update: (prevGates: LevelsDataType) => LevelsDataType) => void;
};

interface ElevatorType {
	id: number;
	distance: number;
	gate: string;
}

type GateType = {
	name: string;
	data: LevelsType;
};

interface ElevatorBankProps {
	gate: GateType;
	handleIsInUse: (name: string, id: number) => void;
}

interface ButtonsProps {
	elevators: Record<string, LevelsDataType>;
	handleCall: (level: number, ...gates: LevelsDataType[]) => void;
}

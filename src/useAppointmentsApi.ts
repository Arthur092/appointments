import { useCallback, useMemo } from "react";

export interface Appointment {
	name: string;
	startTime: number;
	endTime: number;
}

const database: Appointment[] = [
	{
		name: "John Smith",
		startTime: Date.now() + 1000 * 60 * 60 * 24,
		endTime: Date.now() + 1000 * 60 * 60 * 25,
	},
	{
		name: "Jane Doe",
		startTime: Date.now() + 1000 * 60 * 60 * 48,
		endTime: Date.now() + 1000 * 60 * 60 * 49,
	},
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const maybeThrowError = () =>
	new Promise<void>((resolve, reject) =>
		[resolve, () => reject("Oh no, APIs are so unpredictable!")][
			Math.random() > 0.3 ? 0 : 1
		]()
	);

/**
 * Represents a mock API client, which works off of an in-memory database.
 * This file should not be modified!
 */
export function useAppointmentsApi() {
	const get = useCallback(async () => {
		await delay(3000);
		await maybeThrowError();
		return {
			success: true,
			appointments: database,
		};
	}, []);
	const post = useCallback(async (input: Appointment) => {
		await delay(3000);
		await maybeThrowError();
		database.push(input);

		return {
			success: true,
		};
	}, []);

	return useMemo(
		() => ({
			get,
			post,
		}),
		[get, post]
	);
}

import React, { useEffect, useRef, useState } from 'react';
import { Appointment, useAppointmentsApi } from '../../useAppointmentsApi';
import styles from "./AppointmentForm.module.css";

interface AppointmentsFormProps {
	loading: boolean;
	appointments: Appointment[],
	setAppointments: (appointment: Appointment[]) => void
}

type Errors = Record<string, string | null>;


export default function AppointmentsForm({ appointments, loading, setAppointments }: AppointmentsFormProps) {
	const API = useAppointmentsApi();

	const [name, setName] = useState('');
	const [startTime, setStartTime] = useState<string>('');
	const [endTime, setEndTime] = useState<string>('');

	const [errors, setErrors] = useState<Errors>({});
	const [isErrors, setIsErrors] = useState(false);
	const [errorText, setErrorText] = useState<string | null>(null);

	const [loadingPost, setLoadingPost] = useState(false);
	const [success, setSuccess] = useState(false);

	const successTimer = useRef<any>(null)

	useEffect(() => {
		if (Object.values(errors).some(val => val)){
			setIsErrors(true)
		} else {
			setIsErrors(false)
		}
	},[errors])

	const onSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		setErrorText(null);
		setSuccess(false);
		if(successTimer.current){
			clearTimeout(successTimer.current);
		}
		if(!validateForm()){
			return;
		}
		setLoadingPost(true)
		try {
			await API.post({
				name,
				startTime: new Date (startTime).getTime(),
				endTime: new Date(endTime).getTime(),
			});
			setSuccess(true);
			setLoadingPost(false)
			successTimer.current = setTimeout(() => {
				setSuccess(false);
			},3000);
			setAppointments([
				...appointments,
				{
					name,
					startTime: new Date (startTime).getTime(),
					endTime: new Date(endTime).getTime(),
				}
			]);
			setName('');
			setStartTime('');
			setEndTime('');
		} catch (error) {
			setLoadingPost(false)
			if(typeof error === 'string') setErrorText(error);
		}
	};

	const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
		setErrors({
			...errors,
			name: null
		})
		setName(event.target.value)
		if(!event.target.value){
			setErrors({
				...errors,
				name: 'Name is required'
			})
		}
	}

	const onChangeStartTime = (event: React.ChangeEvent<HTMLInputElement>) => {
		setErrors({
			...errors,
			startTime: null
		})
		setStartTime(event.target.value)
		if(!event.target.value){
			setErrors({
				...errors,
				startTime: 'Start time is required'
			})
		}
		validateTimesOrder(event.target.value, 'startTime');
		validateAppointments(event.target.value, 'startTime');
	}

	const onChangeEndTime = (event: React.ChangeEvent<HTMLInputElement>) => {
		setErrors({
			...errors,
			endTime: null
		})
		setEndTime(event.target.value)
		if(!event.target.value){
			setErrors({
				...errors,
				endTime: 'End time is required'
			})
		}
		validateTimesOrder(event.target.value,'endTime');
		validateAppointments(event.target.value, 'endTime');
	}

	const validateAppointments = (inputValue: string, input: string) => {
		const valueDate = new Date(inputValue);
		appointments.forEach((appoitment) => {
			const appStartDate = new Date(appoitment.startTime);
			const appEndDate = new Date(appoitment.endTime);
			if(valueDate >= appStartDate && valueDate <= appEndDate){
				setErrors({
					...errors,
					[input]: `There is a conflict with ${input} regarding existing appointments`
				})
			}
		})
	}

	const validateTimesOrder =  (inputValue: string, input: string) => {
		const valueDate = new Date(inputValue);
		if(input === 'startTime'){
			if(new Date(valueDate) && endTime){
				if(new Date(endTime).getTime() < valueDate.getTime()){
					setErrors({
						...errors,
						startTime: `startTime should't be greater than endTime` ,
					})
				}
				return;
			}
		} else {
			if(startTime && valueDate){
				if(valueDate.getTime() < new Date(startTime).getTime()){
					setErrors({
						...errors,
						endTime: `endTime should't be less than startTime` ,
					})
				}
				return;
			}
		}
	}

	const validateForm = () => {
		const currentErrors: Errors = {}
		if(!name){
			currentErrors.name = 'Name is required'
		}
		if(!startTime){
			currentErrors.startTime = 'Start time is required'
		}
		if(!endTime){
			currentErrors.endTime = 'End time is required'
		}
		setErrors({
			...errors,
			...currentErrors
		})
		if(Object.values(currentErrors).some(err => err)){
			return false
		}
		return true
	};

    return <React.Fragment>
			{errorText && (
				<div className={styles.error} aria-live="polite">
					<p>{errorText}</p>
				</div>
			)}
			<form className={styles.form} onSubmit={onSubmit}>
				<h2 className={styles.formTitle}>Create an appointment</h2>
				<label className={styles.label}>
					<span className={styles.labelText}>Your name</span>
					<input
						className={styles.input}
						type="text"
						placeholder="John Smith"
						value={name}
						onChange={onChangeName}
						disabled={loading || loadingPost}
					/>
				</label>
				<label className={styles.label}>
					<span className={styles.labelText}>Start Time</span>
					<input
						className={styles.input}
						type="datetime-local"
						onChange={onChangeStartTime}
						value={startTime}
						disabled={loading || loadingPost}
					/>
				</label>
				<label className={styles.label}>
					<span className={styles.labelText}>End Time</span>
					<input
						className={styles.input}
						type="datetime-local"
						value={endTime}
						onChange={onChangeEndTime}
						disabled={loading || loadingPost}
					/>
				</label>
				<button disabled={loading || loadingPost || isErrors} type="submit" className={styles.button}>
					Submit Request
				</button>
				{loadingPost && <span className={styles.loader}></span>}
			</form>
			{success && (
					<div className={styles.success} aria-live="polite">
						<p>Appointment added successfully!</p>
					</div>
				)}
			{isErrors &&
				<ul className={styles.error}>
					{Object.values(errors).reduce((list: JSX.Element[], error) => {
						if (error){
							list.push(<li key={error}>{error}</li>)
						}
						return list
					}, [])}
				</ul>
			}
        </React.Fragment>;
}
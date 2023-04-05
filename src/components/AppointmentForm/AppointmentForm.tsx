import React, { useEffect, useRef, useState } from 'react';
import { useAppointmentsApi } from '../../useAppointmentsApi';
import styles from "./AppointmentForm.module.css";

interface AppointmentsFormProps {
	loading: boolean;
	loadingPost: boolean;
	setLoadingPost: (value: boolean) => void;
}

type Errors = Record<string, string | null>;

export default function AppointmentsForm({ loading, setLoadingPost, loadingPost }: AppointmentsFormProps) {
	const API = useAppointmentsApi();
	const [name, setName] = useState('');
	const [startTime, setStartTime] = useState<Date | undefined>(undefined);
	const [endTime, setEndTime] = useState<Date | undefined>(undefined);
	const [errors, setErrors] = useState<Errors>({});
	const [isErrors, setIsErrors] = useState(false);

	const successTimer = useRef<any>(null)
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		if (Object.values(errors).some(val => val)){
			setIsErrors(true)
		} else {
			setIsErrors(false)
		}
	},[errors])

	const [errorText, setErrorText] = useState<string | null>(null);

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
				startTime: startTime!.getTime(),
				endTime: endTime!.getTime(),
			});
			setSuccess(true);
			setLoadingPost(false)
			successTimer.current = setTimeout(() => {
				setSuccess(false);
			},3000);
			setName('');
			setStartTime(undefined);
			setEndTime(undefined);
		} catch (error) {
			setLoadingPost(false)
			if(typeof error === 'string') setErrorText(error);
		}
	};

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

	const onChangeStartTime = (event: React.ChangeEvent<HTMLInputElement>) => {
		setErrors({
			...errors,
			startTime: null
		})
		setStartTime(new Date(event.target.value))
		if(!event.target.value){
			setErrors({
				...errors,
				startTime: 'Start time is required'
			})
		}
	}

	const onChangeEndTime = (event: React.ChangeEvent<HTMLInputElement>) => {
		setErrors({
			...errors,
			endTime: null
		})
		setEndTime(new Date(event.target.value))
		if(!event.target.value){
			setErrors({
				...errors,
				endTime: 'End time is required'
			})
		}
	}

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
						disabled={loading || loadingPost}
					/>
				</label>
				<label className={styles.label}>
					<span className={styles.labelText}>End Time</span>
					<input
						className={styles.input}
						type="datetime-local"
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
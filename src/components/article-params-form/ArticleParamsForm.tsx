import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useRef, useState, useEffect } from 'react';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import clsx from 'clsx';
import { Separator } from 'src/ui/separator';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	formState: ArticleStateType;
	setFormState: React.Dispatch<React.SetStateAction<ArticleStateType>>;
	onSubmit: () => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	formState,
	setFormState,
	onSubmit,
	onReset,
}: ArticleParamsFormProps) => {
	const formRef = useRef<HTMLDivElement | null>(null);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const handleChange =
		<K extends keyof ArticleStateType>(key: K) =>
		(value: ArticleStateType[K]) => {
			setFormState((prev) => ({ ...prev, [key]: value }));
		};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSubmit();
	};

	const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onReset();
	};

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				isOpen &&
				formRef.current &&
				!formRef.current.contains(e.target as Node)
			) {
				setIsOpen(false);
			}
		};

		const handleEscapeKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleEscapeKey);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleEscapeKey);
		};
	}, [isOpen]);

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					setIsOpen(!isOpen);
				}}
			/>
			<aside
				ref={formRef}
				className={clsx({
					[styles.container]: true,
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					onReset={handleReset}
					onSubmit={handleSubmit}>
					<Text
						as='h2'
						size={31}
						weight={800}
						uppercase={true}
						align={'center'}>
						Задайте параметры
					</Text>
					<div style={{ height: 50 }} />
					<Select
						title={'Шрифт'}
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={handleChange('fontFamilyOption')}
					/>
					<div style={{ height: 50 }} />
					<RadioGroup
						name={'fontSize'}
						title={'Размер шрифта'}
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={handleChange('fontSizeOption')}
					/>
					<div style={{ height: 50 }} />
					<Select
						title={'Цвет шрифта'}
						options={fontColors}
						selected={formState.fontColor}
						onChange={handleChange('fontColor')}
					/>
					<div style={{ height: 50 }} />
					<Separator />
					<div style={{ height: 50 }} />
					<Select
						title={'Цвет фона'}
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={handleChange('backgroundColor')}
					/>
					<div style={{ height: 50 }} />
					<Select
						title={'Ширина контента'}
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={handleChange('contentWidth')}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};

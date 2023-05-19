import React, { useEffect, useState } from 'react';
import { ListRenderItemInfo, StyleSheet } from 'react-native';
import { List, Text } from '@ui-kitten/components';
import { TrainingCard } from './extra/event-card.component';
import { Training } from './extra/data';
import { IEvent, ServiceApi } from '../../services/api';

const trainings: Training[] = [
	Training.chestEasy(),
	Training.workoutEasy(),
	Training.personalizedEasy(),
];

export const EventsListScreen = ({ navigation }: any): React.ReactElement => {
	const [{ data, count }, setEvents] = useState({
		data: [],
		count: 0,
	});

	const getEvents = async () => {
		const res: any = await ServiceApi.getEvents({
			include: [
				{
					relation: 'banner',
				},
			],
		});
		setEvents(res);
	};

	useEffect(() => {
		getEvents();
	}, []);

	const renderHeader = (): React.ReactElement => (
		<React.Fragment>
			<Text style={styles.headerTitle} appearance="hint">
				MOST POPULAR
			</Text>
			{/* <List
				contentContainerStyle={styles.horizontalList}
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				data={displayTrainings.reverse()}
				renderItem={renderHorizontalTrainingItem}
			/> */}
		</React.Fragment>
	);

	const renderHorizontalTrainingItem = (
		info: ListRenderItemInfo<IEvent>
	): React.ReactElement => (
		<TrainingCard
			style={styles.horizontalItem}
			training={info.item}
			navigation={navigation}
		/>
	);

	const renderVerticalTrainingItem = (
		info: ListRenderItemInfo<IEvent>
	): React.ReactElement => (
		<TrainingCard
			style={styles.verticalItem}
			training={info.item}
			navigation={navigation}
		/>
	);

	return (
		<List
			contentContainerStyle={styles.list}
			data={data}
			renderItem={renderVerticalTrainingItem}
			ListHeaderComponent={renderHeader}
		/>
	);
};

const styles = StyleSheet.create({
	list: {
		paddingVertical: 24,
	},
	headerTitle: {
		marginHorizontal: 16,
	},
	horizontalList: {
		marginVertical: 16,
		paddingHorizontal: 8,
	},
	verticalItem: {
		marginVertical: 8,
		marginHorizontal: 16,
	},
	horizontalItem: {
		width: 256,
		marginHorizontal: 8,
	},
});

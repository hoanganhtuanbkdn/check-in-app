import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import {
	Button,
	Card,
	CardElement,
	CardProps,
	Text,
} from '@ui-kitten/components';
import { ImageOverlay } from './image-overlay.component';
import { ClockIcon } from './icons';
import { Training } from './data';
import { IEvent } from '../../../services/api';

export interface TrainingCardProps extends Omit<CardProps, 'children'> {
	training: IEvent;
	navigation: any;
}

export type TrainingCardElement = React.ReactElement<TrainingCardProps>;

export const TrainingCard = (props: TrainingCardProps): CardElement => {
	const { style, training, navigation, ...cardProps } = props;
	const onEventDetail = (): void => {
		navigation && navigation.navigate('ListFeature');
	};
	return (
		<Card {...cardProps} style={[styles.container, style]}>
			<ImageOverlay
				style={styles.image}
				source={
					{ uri: training.banner?.url } ||
					require('../assets/image-training-1.jpg')
				}
			>
				<TouchableOpacity
					onPress={onEventDetail}
					style={{
						flex: 1,
						paddingVertical: 24,
						paddingHorizontal: 16,
					}}
				>
					<Text style={styles.level} category="s1" status="control">
						{training.organizer}
					</Text>
					<Text style={styles.title} category="h2" status="control">
						{training.name}
					</Text>
					{/* <Button style={styles.durationButton} size="tiny">
					View
				</Button> */}
				</TouchableOpacity>
			</ImageOverlay>
		</Card>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 200,
	},
	image: {
		...StyleSheet.absoluteFillObject,
		height: 200,
	},
	level: {
		zIndex: 1,
	},
	title: {
		zIndex: 1,
	},
	durationButton: {
		position: 'absolute',
		left: 16,
		bottom: 16,
		borderRadius: 16,
		paddingHorizontal: 0,
	},
});

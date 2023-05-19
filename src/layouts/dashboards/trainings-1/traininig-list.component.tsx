import React, { useEffect, useState } from 'react';
import { ListRenderItemInfo, StyleSheet } from 'react-native';
import { List, Text } from '@ui-kitten/components';
import { TrainingCard } from './extra/training-card.component';
import { Training } from './extra/data';
import { ServiceApi } from '../../../services/api';

const trainings: Training[] = [
  Training.chestEasy(),
  Training.workoutEasy(),
  Training.personalizedEasy(),
];


export const TrainingsListScreen = (): React.ReactElement => {

 
  const displayTrainings: Training[] = trainings;

  const renderHeader = (): React.ReactElement => (
    <React.Fragment>
      <Text
        style={styles.headerTitle}
        appearance='hint'>
        MOST POPULAR
      </Text>
      <List
        contentContainerStyle={styles.horizontalList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={displayTrainings.reverse()}
        renderItem={renderHorizontalTrainingItem}
      />
    </React.Fragment>
  );

  const renderHorizontalTrainingItem = (info: ListRenderItemInfo<Training>): React.ReactElement => (
    <TrainingCard
      style={styles.horizontalItem}
      training={info.item}
    />
  );

  const renderVerticalTrainingItem = (info: ListRenderItemInfo<Training>): React.ReactElement => (
    <TrainingCard
      style={styles.verticalItem}
      training={info.item}
    />
  );

  return (
    <List
      contentContainerStyle={styles.list}
      data={displayTrainings}
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

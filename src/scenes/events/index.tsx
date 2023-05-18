import React from 'react'
import { TrainingsListScreen } from '../../layouts/dashboards/trainings-1/traininig-list.component'


export const ListEventScreen = (props: any): React.ReactElement => {
    console.log({props});
    return (
    <TrainingsListScreen {...props} />
  )};
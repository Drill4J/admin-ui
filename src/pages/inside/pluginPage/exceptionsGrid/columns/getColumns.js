import { defineMessages } from 'react-intl';
import { ActionsColumn } from './actionsColumn';
import { EventColumn } from './eventColumn';
import { TimeColumn } from './timeColumn';
import { TypeColumn } from './typeColumn';
import { UrlColumn } from './urlColumn';

const messages = defineMessages({
  timeColumnTitle: {
    id: 'StackTracesGrid.timeColumnTitle',
    defaultMessage: 'Time',
  },
  eventColumnTitle: {
    id: 'StackTracesGrid.eventColumnTitle',
    defaultMessage: 'Event',
  },
  urlColumnTitle: {
    id: 'StackTracesGrid.urlColumnTitle',
    defaultMessage: 'URL',
  },
  typeColumnTitle: {
    id: 'StackTracesGrid.typeColumnTitle',
    defaultMessage: 'Type',
  },
  actionsColumnTitle: {
    id: 'StackTracesGrid.actionsColumnTitle',
    defaultMessage: 'Actions',
  },
});

export const getColumns = (formatMessage) => [
  {
    id: 'time',
    width: '7%',
    title: formatMessage(messages.timeColumnTitle),
    component: TimeColumn,
  },
  {
    id: 'event',
    width: '50%',
    title: formatMessage(messages.eventColumnTitle),
    component: EventColumn,
  },
  {
    id: 'url',
    width: '10%',
    title: formatMessage(messages.urlColumnTitle),
    component: UrlColumn,
  },
  {
    id: 'type',
    width: '10%',
    title: formatMessage(messages.typeColumnTitle),
    component: TypeColumn,
  },
  {
    id: 'actions',
    width: '20%',
    title: formatMessage(messages.actionsColumnTitle),
    component: ActionsColumn,
  },
];
